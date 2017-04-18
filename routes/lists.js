var express = require('express');
var router = express.Router();
var UserModel = require('../models').User;
var BookModel = require('../models').Book;
var ListModel = require('../models').List;
var DetailModel = require('../models').Detail;
var MESSAGE = require('./config').MESSAGE;
var KEY = require('./config').KEY;

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

module.exports = router;
