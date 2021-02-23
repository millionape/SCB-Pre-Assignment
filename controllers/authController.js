var exports = module.exports = {};

let jwt = require('jsonwebtoken');
var bcrypt = require("bcrypt");

// Call User model
let User = require("../models/user");

// import database services
let db = require("../services/databaseService");

exports.signup = function (req, res) {
    bcrypt.hash(req.body.password, 10,async function (err, hash) {
        let createRes = await db.createNewUser(req.body)
        console.log("create res: ",createRes);
        if (createRes) {
            res.json({
                success: true,
                msg: 'Successful created new user.'
            });
        } else {
            return res.json({
                success: false,
                msg: 'Username already exists.'
            });
        }
    });
};

exports.signin = function (req, res) {

    User.findOne({
        username: req.body.username
    }, function (err, user) {
        if (err) throw err;
        if (!user) {
            res.status(401).send({
                success: false,
                msg: 'Authentication failed. User not found.'
            });
        } else {
            // check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    let token = jwt.sign(user.toJSON(), "your_jwt_secret", {
                        expiresIn: '5m'
                    });
                    // return the information including token as JSON
                    res.json({
                        user: user,
                        success: true,
                        token: token
                    });
                } else {
                    res.status(401).send({
                        success: false,
                        msg: 'Authentication failed. Wrong password.'
                    });
                }
            });
        }
    });
};

exports.signout = function (req, res) {
    req.logout();
    res.json({
        success: true,
        msg: 'Sign out successfully.'
    });
}