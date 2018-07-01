import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import Root from './components/Root';
import rootSaga from './rootSaga';


const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  createLogger(),
  sagaMiddleware,
];

const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares),
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root'),
);
