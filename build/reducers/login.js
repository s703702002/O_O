"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var login = function login() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    status: 'init'
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        status: 'loading',
        username: null,
        message: null
      };

    case 'LOGIN_SUCCESS':
      return {
        status: 'logined',
        username: action.response.name,
        message: null
      };

    case 'LOGIN_ERROR':
      return {
        status: 'loginerr',
        username: null,
        message: action.error
      };

    case 'LOGIN_CANCEL':
      return {
        status: 'init',
        username: null,
        message: null
      };

    case 'LOG_OUT':
      localStorage.removeItem('loginStatus');
      return {
        status: 'init',
        username: null,
        message: null
      };

    default:
      return state;
  }
};

var _default = login;
exports.default = _default;