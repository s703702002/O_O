const path = require('path');
const React = require('react');
const { createStore } = require('redux');
const { renderToString } = require('react-dom/server');
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const loginRouter = require('./routers/login');
const gqlRouter = require('./routers/graphql');
// const rootReducer = require('./reducers').default;
// const Root = require('./components/root').default;

const PORT = process.env.PORT || 9000;
const app = express();
const whitelist = ['http://localhost:9000', 'https://happpyshop.herokuapp.com', 'http://localhost:8888'];
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.resolve(__dirname, './build')));

// routers
app.use('/login', loginRouter);
app.use('/graphql', gqlRouter());

function handleRender(req, res) {
  // const store = createStore(rootReducer);
  // Render the component to a string
  // const html = renderToString(<Root store={store} />);
}
function renderFullPage(html, preloadedState) {

}

app.get('*', (req, res) => {
  handleRender(req, res);
  res.sendFile(path.resolve(__dirname, './build/index.html'));
});

app.listen(PORT);
