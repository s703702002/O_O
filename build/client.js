"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _Root = _interopRequireDefault(require("./pages/Root"));

var _configureStore = _interopRequireDefault(require("./configureStore"));

var preloadedState = function preloadedState() {
  // Grab the state from a global variable injected into the server-generated HTML
  var serverPreloadState = window.__PRELOADED_STATE__;
  var loginStatus = JSON.parse(localStorage.getItem('loginStatus'));
  if (!loginStatus) return {};
  var response = loginStatus.response;
  return (0, _objectSpread2.default)({}, serverPreloadState, {
    login: {
      status: 'logined',
      username: response.name
    },
    shoppingCart: response.shoppings
  });
}; // const preloadedState = window.__PRELOADED_STATE__;


var store = (0, _configureStore.default)(preloadedState()); // Allow the passed state to be garbage-collected
// delete window.__PRELOADED_STATE__;

_reactDom.default.render(_react.default.createElement(_Root.default, {
  store: store
}), document.getElementById('root'));