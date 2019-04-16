"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _Root = _interopRequireDefault(require("./pages/Root"));

var _configureStore = _interopRequireDefault(require("./configureStore"));

// const preloadedState = () => {
//   // Grab the state from a global variable injected into the server-generated HTML
//   const serverPreloadState = window.__PRELOADED_STATE__;
//   const loginStatus = JSON.parse(localStorage.getItem('loginStatus'));
//   if (!loginStatus) return {};
//   const { response } = loginStatus;
//   return {
//     ...serverPreloadState,
//     login: {
//       status: 'logined',
//       username: response.name,
//     },
//     shoppingCart: response.shoppings,
//   };
// };
var preloadedState = window.__PRELOADED_STATE__;
var store = (0, _configureStore.default)(preloadedState); // Allow the passed state to be garbage-collected

delete window.__PRELOADED_STATE__;

_reactDom.default.hydrate(_react.default.createElement(_Root.default, {
  store: store
}), document.getElementById('root'));