var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
    orderId: {
        type: String,
        unique: true,
        required: true,
    },
    orderedBy: {
        type: String,
    },
    orderedDate: {
        type: String,
    },
    books:{
        type: Array,
    },
    totalPrice:{
        type: Number
    }
});

module.exports = mongoose.model("Order", OrderSchema);