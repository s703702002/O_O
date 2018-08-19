import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import Root from './components/Root';
import rootSaga from './sagas';


const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  createLogger(),
  sagaMiddleware,
];

const preloadedState = () => {
  const loginStatus = JSON.parse(localStorage.getItem('loginStatus'));
  if (!loginStatus) return {};
  const { response } = loginStatus;
  return {
    login: {
      status: 'logined',
      username: response.name,
    },
    shoppingCart: response.shoppings,
  };
};


const store = createStore(
  rootReducer,
  preloadedState(),
  applyMiddleware(...middlewares),
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root'),
);
