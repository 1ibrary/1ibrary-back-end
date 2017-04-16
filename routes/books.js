var express = require('express');
var router = express.Router();
var UserModel = require('../models').User;
var BookModel = require('../models').Book;
var ListModel = require('../models').List;
var MESSAGE = require('./config').MESSAGE;
var KEY = require('./config').KEY;

/* books/show_books */
router.post('/show_books', function (req, res, next) {

    var timestamp = new Date().getTime();

    if (req.body.page == undefined || req.body.page == ''
        || req.body.timestamp == undefined || req.body.timestamp == ''
        || req.body.token == undefined || req.body.token == ''
        || req.body.uid == undefined || req.body.uid == '') {
        res.json({status: 1, msg: MESSAGE.PARAMETER_ERROR});
        return;
    }

    console.log('POST: books/show_books');
    console.log('TIME: ' + getNowFormatDate());
    console.log('page: ' + req.body.page);
    console.log('timestamp: ' + req.body.timestamp);
	console.log('token: ' + req.body.token);
    console.log('uid: ' + req.body.uid);

    BookModel.findAll({}).then(function (result) {
    	var totalPages = 0;
        var pageSize = 10;
        var num = result.length;
        
        if (num / pageSize > parseInt(num / pageSize)) {
            totalPages = parseInt(num / pageSize) + 1;
        } else {
            totalPages = parseInt(num / pageSize);
        }

        var currentPage = req.body.pages;
        var startRow = (currentPage - 1) * pageSize;
        var endRow = currentPage * pageSize;
        endRow = (endRow > num) ? num : endRow;

        var books = [];
        var i = 0;

        result.forEach(function (book) {
            var bookData = {};
            bookData.book_id = book.id;
            bookData.book_cover = book.book_cover;
            bookData.book_author = book.book_author;
            bookData.book_last_number = book.book_last_number;
            bookData.book_rate = book.book_rate;
            bookData.book_publish = book.book_publish;
            bookData.book_title = book.book_title;

            if (i >= startRow && i <= endRow) {
                books.push(bookData);
            }
            i++;
        });
        res.json({status: 0, data: books, msg: MESSAGE.SUCCESS});
    }).catch(next);

    return;
});

module.exports = router;
