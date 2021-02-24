const axios = require('axios');

exports.getAllBooks = async function () {
    return new Promise((resolve, reject) => {
        axios.get('https://scb-test-book-publisher.herokuapp.com/books/').then(function (response) {
            resolve(response.data);
        }).catch(function (err) {
            reject(err)
        })
    });
}

exports.getRecomendedBooks = async function () {
    return new Promise((resolve, reject) => {
        axios.get('https://scb-test-book-publisher.herokuapp.com/books/recommendation').then(function (response) {
            resolve(response.data);
        }).catch(function (err) {
            reject(err)
        })
    });
}