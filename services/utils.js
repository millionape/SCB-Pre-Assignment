var crypto = require('crypto');
var moment = require('moment')
exports.getTokenFromHeader = function(req){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    return token;
}

exports.generateOrderForm = function(books, orderedBooks, userId){
    var form = {
        books: [],
        orderId: crypto.randomBytes(16).toString('hex'),
        orderedDate: moment().utc().format(),
        orderedBy: userId,
        totalPrice: 0
    }
    for(let bookId of orderedBooks){
        let bookInfo = books.find(book => book.id === bookId);
        if(!bookInfo){
            return {
                error: `can not find book that match with id: ${bookId}`
            }
        }
        form.books.push(bookInfo);
        form.totalPrice += bookInfo.price;
    }
    return form;
}