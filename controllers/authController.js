var exports = module.exports = {};
// Call User model
let User = require("../models/user");

// import database services
const db = require("../services/databaseService")

exports.signin = function (req, res) {
    db.findUserAndComaprePassword(req,res);
};

exports.signout = function (req, res) {
    req.logout();
    res.json({
        success: true,
        msg: 'Sign out successfully.'
    });
}