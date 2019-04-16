"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = configureStore;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _redux = require("redux");

var _reduxLogger = require("redux-logger");

var _reduxSaga = _interopRequireDefault(require("redux-saga"));

var _reducers = _interopRequireDefault(require("./reducers"));

var _sagas = _interopRequireDefault(require("./sagas"));

function configureStore(preloadedState) {
  var sagaMiddleware = (0, _reduxSaga.default)();
  var middlewares;

  if (process.env.NODE_ENV !== 'production') {
    middlewares = [(0, _reduxLogger.createLogger)(), sagaMiddleware];
  } else {
    middlewares = [sagaMiddleware];
  }

  var store = (0, _redux.createStore)(_reducers.default, preloadedState, _redux.applyMiddleware.apply(void 0, (0, _toConsumableArray2.default)(middlewares)));
  sagaMiddleware.run(_sagas.default);
  return store;
}