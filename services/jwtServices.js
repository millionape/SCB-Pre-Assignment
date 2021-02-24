var jwt = require('jsonwebtoken');
var constant = require('../const/constant');


exports.jwtExtract = function(token){
    return new Promise((resolve, reject) => {
        jwt.verify(token, constant.jwt_secret, function(err, decoded) {
            if(err){
                reject(err);
            }else{
                resolve(decoded);
            }
        });
    })
}