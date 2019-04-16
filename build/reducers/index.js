"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "login", {
  enumerable: true,
  get: function get() {
    return _login.default;
  }
});
Object.defineProperty(exports, "products", {
  enumerable: true,
  get: function get() {
    return _products.default;
  }
});
Object.defineProperty(exports, "productPage", {
  enumerable: true,
  get: function get() {
    return _product_page.default;
  }
});
Object.defineProperty(exports, "shoppingCart", {
  enumerable: true,
  get: function get() {
    return _shopping_cart.default;
  }
});
exports.default = exports.loginBoxOpen = void 0;

var _redux = require("redux");

var _login = _interopRequireDefault(require("./login"));

var _products = _interopRequireDefault(require("./products"));

var _product_page = _interopRequireDefault(require("./product_page"));

var _shopping_cart = _interopRequireDefault(require("./shopping_cart"));

var loginBoxOpen = function loginBoxOpen() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'OPEN_LOGIN_BOX':
      document.body.classList.add('no-scroll');
      return true;

    case 'CLOSE_LOGIN_BOX':
      document.body.classList.remove('no-scroll');
      return false;

    default:
      return state;
  }
};

exports.loginBoxOpen = loginBoxOpen;

var showAddFinished = function showAddFinished() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'SHOW_ADD_FINISHED':
      return true;

    case 'HIDDEN_ADD_FINISHED':
      return false;

    default:
      return state;
  }
};

var lightBoxMessage = function lightBoxMessage() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'ADD_LIGHT_BOX_MESSAGE':
      return action.message;

    case 'REMOVE_LIGHT_BOX_MESSAGE':
      return '';

    default:
      return state;
  }
};

var AppStore = (0, _redux.combineReducers)({
  login: _login.default,
  loginBoxOpen: loginBoxOpen,
  products: _products.default,
  shoppingCart: _shopping_cart.default,
  productPage: _product_page.default,
  showAddFinished: showAddFinished,
  lightBoxMessage: lightBoxMessage
});
var _default = AppStore;
exports.default = _default;