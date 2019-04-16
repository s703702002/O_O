"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authorize = authorize;
exports.loginFlow = loginFlow;
exports.default = watchRequestLogin;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _effects = require("redux-saga/effects");

var _utilis = require("../utilis");

var _api = require("../api");

var _action = require("../action");

var _marked =
/*#__PURE__*/
_regenerator.default.mark(authorize),
    _marked2 =
/*#__PURE__*/
_regenerator.default.mark(loginFlow),
    _marked3 =
/*#__PURE__*/
_regenerator.default.mark(watchRequestLogin);

function authorize(_ref) {
  var username, password, response, successResponse, errorMessage;
  return _regenerator.default.wrap(function authorize$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          username = _ref.username, password = _ref.password;
          _context.prev = 1;
          _context.next = 4;
          return (0, _effects.call)(_api.loginAPI, {
            username: username,
            password: password
          });

        case 4:
          response = _context.sent;
          _context.next = 7;
          return (0, _effects.put)((0, _action.loginSuccess)(response.user));

        case 7:
          successResponse = _context.sent;
          // 如果登入成功 把response存在localStorage 方便下次可以直接取用
          localStorage.setItem('loginStatus', JSON.stringify(successResponse));
          _context.next = 11;
          return (0, _effects.call)(_utilis.delay, 1000);

        case 11:
          _context.next = 13;
          return (0, _effects.put)(_action.closeLoginBox);

        case 13:
          _context.next = 20;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](1);
          errorMessage = _context.t0.toString();
          _context.next = 20;
          return (0, _effects.put)((0, _action.loginError)(errorMessage));

        case 20:
          _context.prev = 20;
          return _context.finish(20);

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[1, 15, 20, 22]]);
}

function loginFlow(action) {
  var task;
  return _regenerator.default.wrap(function loginFlow$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _effects.fork)(authorize, {
            username: action.username,
            password: action.password
          });

        case 2:
          task = _context2.sent;
          _context2.next = 5;
          return (0, _effects.take)('LOGIN_CANCEL');

        case 5:
          _context2.next = 7;
          return (0, _effects.cancel)(task);

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2);
}

function watchRequestLogin() {
  return _regenerator.default.wrap(function watchRequestLogin$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return (0, _effects.takeEvery)('LOGIN_REQUEST', loginFlow);

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  }, _marked3);
}