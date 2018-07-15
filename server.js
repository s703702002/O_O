const cors = require('cors');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const members = require('./api/member.json');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { schema, rootValue } = require('./api/GraphQLSchema');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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


app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const memberId = verification(username, password);
  res.send(JSON.stringify(memberId));
});

app.use('/', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true,
}));


app.listen(3000);
