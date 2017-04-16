var express = require('express');
var router = express.Router();
var UserModel = require('../models').User;
var sha1 = require('sha1');
var md5 = require('md5');
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

/* users/login */
router.post('/login', function (req, res, next) {

    var timestamp = new Date().getTime();

    if (req.body.user_account == undefined || req.body.user_account == ''
        || req.body.user_password == undefined || req.body.user_password == '') {
        res.json({status: 1, msg: MESSAGE.PARAMETER_ERROR});
        return;
    }

    console.log('POST: users/login');
    console.log('TIME: ' + getNowFormatDate());
    console.log('user_account: ' + req.body.user_account);
    console.log('user_password: ' + req.body.user_password);

    var user = {
        user_account: req.body.user_account,
        user_password: sha1(req.body.user_password)
    };
    UserModel.findOne({
        where: {
            user_account: user.user_account
        }
    }).then(function (user) {
        if (!user) {
            return res.json({status: 1002, msg: MESSAGE.USER_NOT_EXIST});
        }
        if (user.user_password !== req.body.user_password) {
            return res.json({status: 1003, msg: MESSAGE.PASSWORD_ERROR});
        }
        var token = md5(user.id + timestamp + KEY);
        var userData = {
            uid: user.id,
            user_name: user.user_name,
            token: token,
            created_at: user.createdAt,
            updated_at: timestamp
        };
        res.json({status: 0, timestamp: timestamp, data: userData, msg: MESSAGE.SUCCESS});
    });
});

module.exports = router;
