var express = require('express');
var router = express.Router();
var UserModel = require('../models').User;
var BookModel = require('../models').Book;
var ListModel = require('../models').List;
var DetailModel = require('../models').Detail;
var MESSAGE = require('./config').MESSAGE;
var KEY = require('./config').KEY;

function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var strHours = date.getHours();
    var strMinutes = date.getMinutes();
    var strSeconds = date.getSeconds();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    if (strHours >= 0 && strHours <= 9) {
        strHours = "0" + strHours;
    }
    if (strMinutes >= 0 && strMinutes <= 9) {
        strMinutes = "0" + strMinutes;
    }
    if (strSeconds >= 0 && strSeconds <= 9) {
        strSeconds = "0" + strSeconds;
    }
    var currentDate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + 'T' + strHours + seperator2 + strMinutes
        + seperator2 + strSeconds + '.000Z';
    return currentDate;
}

/* lists/create_list */
router.post('/create_list', function (req, res, next) {

    var timestamp = new Date().getTime();

    if (req.body.list_content == undefined || req.body.list_content == ''
        || req.body.timestamp == undefined || req.body.timestamp == ''
        || req.body.token == undefined || req.body.token == ''
        || req.body.uid == undefined || req.body.uid == ''
        || req.body.list_name == undefined || req.body.list_name == '') {
        res.json({status: 1, msg: MESSAGE.PARAMETER_ERROR});
        return;
    }

    console.log('POST: lists/create_list');
    console.log('TIME: ' + getNowFormatDate());
    console.log('list_content: ' + req.body.list_content);
    console.log('timestamp: ' + req.body.timestamp);
	console.log('token: ' + req.body.token);
    console.log('uid: ' + req.body.uid);
    console.log('list_name: ' + req.body.list_name);

    var list = {
    	list_name: req.body.list_name,
    	list_content: req.body.list_content
    }

    UserModel.findOne({
    	where: {
    		id: req.body.uid
    	}
    }).then(function (user) {
    	user.createList(list);
    	return res.json({status: 0, msg: MESSAGE.SUCCESS});
    })

    return;
});

/* lists/show_list */
router.post('/show_list', function (req, res, next) {

    var timestamp = new Date().getTime();

    if (req.body.timestamp == undefined || req.body.timestamp == ''
        || req.body.token == undefined || req.body.token == ''
        || req.body.uid == undefined || req.body.uid == '') {
        res.json({status: 1, msg: MESSAGE.PARAMETER_ERROR});
        return;
    }

    console.log('POST: lists/show_list');
    console.log('TIME: ' + getNowFormatDate());
    console.log('timestamp: ' + req.body.timestamp);
    console.log('token: ' + req.body.token);
    console.log('uid: ' + req.body.uid);

    var lists = [];

    ListModel.findAll({
        include: [UserModel],
        where: {
            userId: req.body.uid
        }
    }).then(function (result) {
        result.forEach(function (list) {
            var data = {};
            data.list_id = list.id;
            data.list_content = list.list_content;
            data.list_name = list.list_name;

            lists.push(data);    
        });
        return res.json({status: 0, msg: MESSAGE.SUCCESS, data: lists});
    })

    return;
});

/* lists/show_detail */
router.post('/show_detail', function (req, res, next) {

    var timestamp = new Date().getTime();

    if (req.body.timestamp == undefined || req.body.timestamp == ''
        || req.body.token == undefined || req.body.token == ''
        || req.body.uid == undefined || req.body.uid == ''
        || req.body.list_id == undefined || req.body.list_id == '') {
        res.json({status: 1, msg: MESSAGE.PARAMETER_ERROR});
        return;
    }

    console.log('POST: lists/show_detail');
    console.log('TIME: ' + getNowFormatDate());
    console.log('timestamp: ' + req.body.timestamp);
    console.log('token: ' + req.body.token);
    console.log('uid: ' + req.body.uid);
    console.log('list_id: ' + req.body.list_id);


    var lists = [];

    ListModel.findAll({
        include: [UserModel],
        where: {
            userId: req.body.uid
        }
    }).then(function (result) {
        result.forEach(function (list) {
            var data = {};
            data.list_id = list.id;
            data.list_content = list.list_content;
            data.list_name = list.list_name;

            lists.push(data);    
        });
        return res.json({status: 0, msg: MESSAGE.SUCCESS, data: lists});
    })

    return;
});


module.exports = router;
