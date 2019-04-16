"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rootSaga;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _effects = require("redux-saga/effects");

var _loginSaga = _interopRequireDefault(require("./loginSaga"));

var _productSaga = _interopRequireDefault(require("./productSaga"));

var _productsSaga = _interopRequireDefault(require("./productsSaga"));

var _addToCartSaga = _interopRequireDefault(require("./addToCartSaga"));

var _marked =
/*#__PURE__*/
_regenerator.default.mark(rootSaga);

function rootSaga() {
  return _regenerator.default.wrap(function rootSaga$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _effects.all)([(0, _effects.fork)(_addToCartSaga.default), (0, _effects.fork)(_loginSaga.default), (0, _effects.fork)(_productSaga.default), (0, _effects.fork)(_productsSaga.default)]);

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}