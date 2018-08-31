const path = require('path');
const React = require('react');
const { createStore } = require('redux');
const { Provider } = require('react-redux');
const { renderToString } = require('react-dom/server');
const cors = require('cors');
const crypto = require('crypto');
const bodyParser = require('body-parser');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const members = require('./api/member.json');
const { schema, rootValue } = require('./api/GraphQLSchema');
// const rootReducer = require('./reducers');
// const Root = require('./components/Root');

const PORT = process.env.PORT || 3000;

const app = express();

const whitelist = ['http://10.30.3.75:3000', 'http://10.30.3.75:9000'];
const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, './build')));

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

function handleRender(req, res) {
  console.log('req params', req.params[0]);
}
function renderFullPage(html, preloadedState) {

}

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const memberId = verification(username, password);
  res.send(JSON.stringify(memberId));
});

app.use('/graphql/', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true,
}));

app.get('*', (req, res) => {
  handleRender(req, res);
  res.sendFile(path.resolve(__dirname, './build/index.html'));
});

app.listen(PORT);
