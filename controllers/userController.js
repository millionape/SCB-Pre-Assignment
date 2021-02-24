var exports = module.exports = {};

// import bcrypt for doing hashing stuff 
var bcrypt = require("bcrypt");

// import database services
let db = require("../services/databaseService");
const jwt_service = require('../services/jwtServices');
var util = require("../services/utils")
var publisherService = require("../services/bookPublisherServices");

exports.signup = function (req, res) {
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        if (err) {
            res.json({
                success: false,
                msg: 'Something went wrong with hashing function'
            })
        }
        req.body.password = hash;
        db.createNewUser(req.body).then(function (createRes) {
            if (createRes) {
                return res.json();
            } else {
                return res.status(500).json({
                    success: false,
                    msg: 'Username already exists.'
                });
            }
        })
    });
};

exports.getUserInfo = async function (req, res) {
    let token = util.getTokenFromHeader(req);
    jwt_service.jwtExtract(token).then(async function (decodedData) {
        let orderedBooks = await db.getOrders(decodedData._id);
        db.getUser(decodedData._id, "name surname date_of_birth -_id", orderedBooks).then(function (result) {
            res.status(200).json(result);
        }).catch(function (err) {
            res.status(500).json({
                error: "Internal Server Error"
            })
        })
    }).catch(function (err) {
        console.log(err);
        return res.status(500).send({
            auth: false,
            message: 'Failed to authenticate token.'
        });
    });
}

exports.deleteCurrentUser = async function (req, res) {
    let token = util.getTokenFromHeader(req);
    jwt_service.jwtExtract(token).then(function (decodedData) {
        db.deletUser(decodedData._id).then(function (result) {
            if (result.deletedCount > 0) {
                res.status(200).json();
            } else {
                res.status({
                    error: "can not find user information"
                })
            }

        }).catch(function (err) {
            res.status(500).json({
                error: "Internal Server Error"
            })
        })
    }).catch(function (err) {
        console.log(err);
        return res.status(500).send({
            auth: false,
            message: 'Failed to authenticate token.'
        });
    });
}

exports.makingOrders = async function (req, res) {
    let token = util.getTokenFromHeader(req);
    jwt_service.jwtExtract(token).then(async function (decodedData) {
        try {
            let books = await publisherService.getAllBooks();
            let orderForm = util.generateOrderForm(books, req.body.orders, decodedData._id);
            let storeResult = await db.storeOrder(orderForm);
            if (storeResult) {
                res.status(200).json({
                    price: orderForm.totalPrice
                });
            } else {
                res.status(500).json({
                    error: "Internal Server Error"
                });
            }
        } catch (error) {
            console.log("error -> ", error);
            res.status(500).json({
                error: "Internal Server Error"
            });
        }
    }).catch(function (err) {
        console.log(err);
        return res.status(500).send({
            auth: false,
            message: 'Failed to authenticate token.'
        });
    });
}

exports.getUserOrders = async function (req, res) {
    let token = util.getTokenFromHeader(req);
    jwt_service.jwtExtract(token).then(function (decodedData) {
        db.getUser(decodedData._id, "name surname date_of_birth books -_id").then(function (result) {
            res.status(200).json(result);
        }).catch(function (err) {
            res.status(500).json({
                error: "Internal Server Error"
            })
        })
    }).catch(function (err) {
        console.log(err);
        return res.status(500).send({
            auth: false,
            message: 'Failed to authenticate token.'
        });
    });
}