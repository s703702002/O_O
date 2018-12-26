const path = require('path');
const React = require('react');
const { createStore } = require('redux');
const { renderToString } = require('react-dom/server');
const cors = require('cors');
const compression = require('compression');
const bodyParser = require('body-parser');
const express = require('express');
const loginRouter = require('./src/routers/login');
const gqlRouter = require('./src/routers/graphql');
// const rootReducer = require('./src/reducers').default;
// const Root = require('./src/serverRoot').default;

const PORT = process.env.PORT || 80;
const app = express();
const whitelist = [
  'http://localhost',
  'https://happpyshop.herokuapp.com',
  'http://localhost:8888',
  'http://ec2-13-115-59-15.ap-northeast-1.compute.amazonaws.com',
];
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
// app.use(cors());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, './build')));

// routers
app.use('/login', loginRouter);
app.use('/graphql', gqlRouter());

function handleRender(req, res) {
  const store = createStore(rootReducer);
  // Render the component to a string
  const html = renderToString(<Root store={store} />);
}
function renderFullPage(html, preloadedState) {
  const htmlStr = `
    <!doctype html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="icon" href="favicon.ico" type="image/x-icon"/>
        <link href="https://fonts.googleapis.com/css?family=Abril+Fatface" rel="stylesheet">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css">
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
        <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
        <title>Happy Shop</title>
        <link href="app.css" rel="stylesheet"></head>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script type="text/javascript" src="app.bundle.js"></script>
      </body>
    </html>
    `;
  return htmlStr;
}

app.get('*', (req, res) => {
  handleRender(req, res);
  res.sendFile(path.resolve(__dirname, './build/index.html'));
});

app.listen(PORT);
