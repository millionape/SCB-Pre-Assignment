const router = require('express').Router();
const passport = require('passport');
const booksController = require('../controllers/bookController');
/** /books router */
router.get('/', booksController.getBooks);

module.exports = router;