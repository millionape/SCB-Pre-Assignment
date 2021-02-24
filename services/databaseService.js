let User = require("../models/user");
let Order = require("../models/order");
let jwt = require('jsonwebtoken');
const constant = require('../const/constant')


exports.createNewUser = async function (userData) {
    // create user data 
    let newUser = new User(userData);
    try {
        let saveResult = await newUser.save();
        console.log('saveResult : ', saveResult);
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
};

exports.getUser = async function (userId, projection = "-__v -password", orderedBooks) {
    try {
        var userInfo = await User.findOne({
            _id: userId
        }, projection).exec();
        userInfo.books = orderedBooks;
        return userInfo;
    } catch (error) {
        console.log(error)
        return null;
    }
};

exports.findUserAndComaprePassword = async function (req, res) {
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
                    let token = jwt.sign(user.toJSON(), constant.jwt_secret, {
                        expiresIn: '60m'
                    });
                    // return the token in response header
                    res.setHeader('token', token)
                    res.status(200).json()
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

exports.deletUser = async function (userId) {
    try {
        const deleteResult = await User.remove({
            _id: userId
        }).exec();
        return deleteResult;
    } catch (error) {
        console.log(error)
        return null;
    }
};

exports.storeOrder = async function (orderForm) {
    let newOrder = new Order(orderForm);
    try {
        let saveResult = await newOrder.save();
        console.log('saveResult : ', saveResult);
        return true;
    } catch (error) {
        console.log(error)
        return false;
    }
};

exports.getOrders = async function (userId) {
    try {
        let orders = await Order.find({orderedBy: userId}).exec();
        if(orders){
            var books = [];
            for(let order of orders){
                for(let book of order.books){
                    books.push(book.id);
                }
            }
            return books;
        }else{
            return false;
        }
    } catch (error) {
        console.log(error)
        return false;
    }
};