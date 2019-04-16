"use strict";

var path = require('path');

var React = require('react');

var _require = require('redux'),
    createStore = _require.createStore;

var _require2 = require('react-dom/server'),
    renderToString = _require2.renderToString;

var cors = require('cors');

var compression = require('compression');

var bodyParser = require('body-parser');

var express = require('express');

var fetch = require('isomorphic-fetch');

var loginRouter = require('./routers/login');

var gqlRouter = require('./routers/graphql');

var rootReducer = require('./reducers').default;

var ServeRoot = require('./serverRoot').default;

var _require3 = require('./action/index'),
    receiveProducts = _require3.receiveProducts;

var PORT = process.env.PORT || 80;
var app = express();
var whitelist = ['http://localhost', 'https://happpyshop.herokuapp.com', 'http://localhost:8888', 'http://ec2-13-115-59-15.ap-northeast-1.compute.amazonaws.com'];
var corsOptions = {
  origin: function origin(_origin, callback) {
    if (whitelist.indexOf(_origin) !== -1 || !_origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};
app.use(cors(corsOptions)); // app.use(cors());

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
})); // routers

app.use('/login', loginRouter);
app.use('/graphql', gqlRouter());

var getAllProductsAPI = function getAllProductsAPI() {
  var productInfoFragment = "fragment productInfo on Product{\n    id\n    title\n    price\n    gender\n    inventory\n  }";
  var query = "\n    query {\n      products{\n        ...productInfo\n      }\n    }\n    ".concat(productInfoFragment, "\n  ");
  return fetch('http://localhost/graphql/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: "same-origin",
    body: JSON.stringify({
      query: query
    })
  }).then(function (r) {
    return r.json();
  }).then(function (_ref) {
    var data = _ref.data;
    return data;
  });
};

function handleRender(req, res) {
  var store = createStore(rootReducer);
  var dispatch = store.dispatch;
  console.log('req url', req.url);
  getAllProductsAPI().then(function (response) {
    dispatch(receiveProducts(response.products));
    var context = {}; // Render the component to a string

    var html = renderToString(React.createElement(ServeRoot, {
      store: store,
      location: req.url,
      context: context
    }));
    var preloadedState = store.getState();

    if (context.url) {
      return res.redirect(301, context.url);
    }

    res.send(renderFullPage(html, preloadedState)); // res.sendFile(path.resolve(__dirname, './index.html'));
  }).catch(function (error) {
    res.send('some Error in [handleRender]', error);
  });
}

function renderFullPage(html, preloadedState) {
  var htmlStr = "\n    <!doctype html>\n    <html>\n      <head>\n        <meta charset=\"UTF-8\">\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n        <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\n        <link rel=\"icon\" href=\"favicon.ico\" type=\"image/x-icon\"/>\n        <link href=\"https://fonts.googleapis.com/css?family=Abril+Fatface\" rel=\"stylesheet\">\n        <link rel=\"stylesheet\" href=\"https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css\">\n        <link href=\"https://fonts.googleapis.com/icon?family=Material+Icons\" rel=\"stylesheet\">\n        <script crossorigin src=\"https://unpkg.com/react@16/umd/react.development.js\"></script>\n        <script crossorigin src=\"https://unpkg.com/react-dom@16/umd/react-dom.development.js\"></script>\n        <title>Happy Shop</title>\n        <link href=\"app.css\" rel=\"stylesheet\">\n      </head>\n      <body>\n        <div id=\"root\">".concat(html, "</div>\n        <script>\n          // WARNING: See the following for security issues around embedding JSON in HTML:\n          // http://redux.js.org/recipes/ServerRendering.html#security-considerations\n          window.__PRELOADED_STATE__ = ").concat(JSON.stringify(preloadedState).replace(/</g, "\\u003c"), "\n        </script>\n        <script type=\"text/javascript\" src=\"app.bundle.js\"></script>\n      </body>\n    </html>\n    ");
  return htmlStr;
}

if (process.env.NODE_ENV === 'production') {
  app.get('/app.css', function (req, res) {
    res.sendFile(path.resolve(__dirname, './app.css'));
  });
  app.get('/app.bundle.js', function (req, res) {
    res.sendFile(path.resolve(__dirname, './app.bundle.js'));
  });
} else {
  var webpack = require('webpack');

  var middleware = require('webpack-dev-middleware');

  var webpackConfig = require('../webpack.dev.js');

  var compiler = webpack(webpackConfig);
  app.use(middleware(compiler, {
    publicPath: '/',
    index: false
  }));
}

app.get('/*', handleRender);
app.listen(PORT, function () {
  console.log("server is start on port: ".concat(PORT));
});