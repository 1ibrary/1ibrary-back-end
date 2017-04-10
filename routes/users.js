var express = require('express');
var router = express.Router();
var UserModel = require('../models').User;
var FollowerModel = require('../models').Follower;
var FollowingModel = require('../models').Following;
var sha1 = require('sha1');
var md5 = require('md5');

var KEY = 'airing';

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

/* user login */
router.post('/login', function (req, res, next) {

    var timestamp = new Date().getTime();

    if (req.body.username == undefined || req.body.username == ''
        || req.body.password == undefined || req.body.password == '') {
        res.json({status: 1});
        return;
    }

    console.log('POST: users/login');
    console.log('TIME: ' + getNowFormatDate());
    console.log('username: ' + req.body.username);
    console.log('password: ' + req.body.password);

    var user = {
        username: req.body.username,
        password: sha1(req.body.password)
    };
    UserModel.findOne({
        where: {
            username: user.username
        }
    }).then(function (user) {
        if (!user) {
            return res.json({status: 1002});
        }
        if (user.password !== req.body.password) {
            return res.json({status: 1003});
        }
        var token = md5(user.id + timestamp + KEY);
        var userData = {
            uid: user.id,
            username: user.username,
            token: token,
            birthday: user.birthday,
            career: user.career,
            face_url: user.face_url,
            follower: user.follower,
            following: user.following,
            hometown: user.hometown,
            location: user.location,
            phonenumber: user.phonenumber,
            school: user.school,
            sex: user.sex,
            signature: user.signature,
            tags: user.tags,
            created_at: user.createdAt,
            updated_at: timestamp
        };
        res.json({status: 0, timestamp: timestamp, data: userData});
    });
});


module.exports = router;
