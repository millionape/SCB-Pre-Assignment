let User = require("../models/user");

exports.createNewUser = async function (userData) {
    // create user data 
    let newUser = new User(userData);
    // save the user
    return await newUser.save(function (err) {
        if (err) {
            console.log("error: ", err);
            return false
        }
        return true
    });
};