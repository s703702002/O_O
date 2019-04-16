const path = require('path');
const React = require('react');
const { createStore } = require('redux');
const { renderToString } = require('react-dom/server');
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const cors = require('cors');
const compression = require('compression');
const bodyParser = require('body-parser');
const express = require('express');
const fetch = require('isomorphic-fetch');
const loginRouter = require('./routers/login');
const gqlRouter = require('./routers/graphql');
const rootReducer = require('./reducers').default;
const ServeRoot = require('./serverRoot').default;
const { receiveProducts } = require('./action/index');

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

// routers
app.use('/login', loginRouter);
app.use('/graphql', gqlRouter());

const getAllProductsAPI = () => {
  const productInfoFragment = `fragment productInfo on Product{
    id
    title
    price
    gender
    inventory
  }`;
  const query = `
    query {
      products{
        ...productInfo
      }
    }
    ${productInfoFragment}
  `;
  return fetch('http://localhost/graphql/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: "same-origin",
    body: JSON.stringify({ query }),
  }).then(r => r.json())
    .then(({ data }) => data);
};

function handleRender(req, res) {
  const store = createStore(rootReducer);
  const { dispatch } = store;
  console.log('req url', req.url);
  getAllProductsAPI()
    .then(response => {
      dispatch(receiveProducts(response.products));

      const context = {};
      // Render the component to a string
      const html = renderToString(
        <ServeRoot
          store={store}
          location={req.url}
          context={context}
        />
      );

      const preloadedState = store.getState();

      if (context.url) {
        return res.redirect(301, context.url);
      }

      res.send(renderFullPage(html, preloadedState));
      // res.sendFile(path.resolve(__dirname, './index.html'));
    })
    .catch(error => {
      res.send('some Error in [handleRender]', error)
    })
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
        <link href="app.css" rel="stylesheet">
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

if (process.env.NODE_ENV === 'production') {
  app.get('/app.css', (req, res) => {
    res.sendFile(path.resolve(__dirname, './app.css'));
  });
  app.get('/app.bundle.js', (req, res) => {
    res.sendFile(path.resolve(__dirname, './app.bundle.js'));
  });
} else {
  const webpackConfig = require('../webpack.dev.js')
  const compiler = webpack(webpackConfig);
  app.use(
    middleware(compiler, {
      publicPath: '/',
      index: false,
    })
  )
}

app.get('/*', handleRender);

app.listen(PORT, () => {
  console.log(`server is start on port: ${PORT}`);
});
