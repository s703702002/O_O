"use strict";

var express = require('express');

var crypto = require('crypto');

var router = express.Router();

var members = require('../api/member.json'); // 加密算法


function passwordEncode(password) {
  var hash = crypto.createHash('sha256');
  var encodePassword = hash.update(password).digest('hex');
  return encodePassword;
} // 驗證是否有這個會員及密碼


function verification(username, password) {
  var memberId = null;
  members.some(function (member) {
    if (member.name === username && member.password === passwordEncode(password)) {
      memberId = member.id;
      return true;
    }

    return false;
  });
  return memberId;
}

router.post('/', function (req, res) {
  var _req$body = req.body,
      username = _req$body.username,
      password = _req$body.password;
  var memberId = verification(username, password);
  res.send(JSON.stringify(memberId));
});
module.exports = router;