var exports = module.exports = {};

// import publisher services
const publisherService = require("../services/bookPublisherServices")

exports.getBooks = async function (req, res) {
    var allBooks = await publisherService.getAllBooks();
    var recomendedBooks = await publisherService.getRecomendedBooks();
    recomendedBooks = recomendedBooks.map(book => {
        return book.id;
    })
    var result = allBooks.map(item => {
        item.is_recommended = recomendedBooks.includes(item.id);
        return item
    })
    result.sort((a,b) =>  b.is_recommended - a.is_recommended);
    res.status(200).json(result);
}