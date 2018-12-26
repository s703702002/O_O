const express = require('express');
const crypto = require('crypto');

const router = express.Router();
const members = require('../api/member.json');

// 加密算法
function passwordEncode(password) {
  const hash = crypto.createHash('sha256');
  const encodePassword = hash.update(password).digest('hex');
  return encodePassword;
}

// 驗證是否有這個會員及密碼
function verification(username, password) {
  let memberId = null;
  members.some((member) => {
    if (member.name === username && member.password === passwordEncode(password)) {
      memberId = member.id;
      return true;
    }
    return false;
  });
  return memberId;
}

router.post('/', (req, res) => {
  const { username, password } = req.body;
  const memberId = verification(username, password);
  res.send(JSON.stringify(memberId));
});

module.exports = router;
