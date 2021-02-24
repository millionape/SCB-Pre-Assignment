var validate = require("validate.js");

const userDataValidate = (req, res, next) => {
    validate.extend(validate.validators.datetime, {
        parse: function (value, options) {
            return +moment.utc(value);
        },
        format: function (value, options) {
            var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
            return moment.utc(value).format(format);
        }
    });
    var constraints = {
        username: {
            presence: true,
            type: "string"
        },
        password: {
            presence: true,
            type: "string"
        },
        name: {
            presence: true,
            type: "string"
        },
        surname: {
            presence: true,
            type: "string"
        },
        date_of_birth: {
            presence: true,
            datetime: true,
        },
    };
    let validateResult = validate(req.body, constraints);
    if(validate(req.body, constraints)){
        res.status(400).json({
            errors: validateResult
        })
    }else{
        return next()
    }
}

const ordersParamsValidate = (req, res, next) => {
    var constraints = {
        orders: {
            presence: true,
            type: "array"
        }
    };
    let validateResult = validate(req.body, constraints);
    if(validate(req.body, constraints)){
        res.status(400).json({
            errors: validateResult
        })
    }else{
        return next()
    }
}

module.exports = {
    userDataValidate,
    ordersParamsValidate,
}