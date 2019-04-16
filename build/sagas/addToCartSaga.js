"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = watchAddToCart;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _effects = require("redux-saga/effects");

var _utilis = require("../utilis");

var _action = require("../action");

var _marked =
/*#__PURE__*/
_regenerator.default.mark(addToCartFlow),
    _marked2 =
/*#__PURE__*/
_regenerator.default.mark(watchAddToCart);

var getLoginStatus = function getLoginStatus(state) {
  return state.login.status;
};

function addToCartFlow(action) {
  var loginStatus, product, count;
  return _regenerator.default.wrap(function addToCartFlow$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _effects.select)(getLoginStatus);

        case 3:
          loginStatus = _context.sent;
          product = action.product, count = action.count; // if haven't login

          if (!(loginStatus === 'init' || loginStatus === 'loginerr')) {
            _context.next = 14;
            break;
          }

          _context.next = 8;
          return (0, _effects.put)((0, _action.addLightBoxMessage)('請先登入'));

        case 8:
          _context.next = 10;
          return (0, _effects.take)('REMOVE_LIGHT_BOX_MESSAGE');

        case 10:
          _context.next = 12;
          return (0, _effects.put)(_action.openLoginBox);

        case 12:
          _context.next = 22;
          break;

        case 14:
          _context.next = 16;
          return (0, _effects.put)((0, _action.addToCart)(product, count));

        case 16:
          _context.next = 18;
          return (0, _effects.put)(_action.showAddFinished);

        case 18:
          _context.next = 20;
          return (0, _effects.call)(_utilis.delay, 2500);

        case 20:
          _context.next = 22;
          return (0, _effects.put)(_action.hiddenAddFinished);

        case 22:
          _context.next = 26;
          break;

        case 24:
          _context.prev = 24;
          _context.t0 = _context["catch"](0);

        case 26:
          _context.prev = 26;
          return _context.finish(26);

        case 28:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[0, 24, 26, 28]]);
}

function watchAddToCart() {
  return _regenerator.default.wrap(function watchAddToCart$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _effects.takeEvery)('ADD_TO_CART_REQUEST', addToCartFlow);

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2);
}