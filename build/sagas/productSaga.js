"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.productFlow = productFlow;
exports.default = watchRequsetProduct;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _effects = require("redux-saga/effects");

var _api = require("../api");

var _action = require("../action");

var _marked =
/*#__PURE__*/
_regenerator.default.mark(productFlow),
    _marked2 =
/*#__PURE__*/
_regenerator.default.mark(watchRequsetProduct);

function productFlow(action) {
  var response;
  return _regenerator.default.wrap(function productFlow$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _effects.call)(_api.getProductAPI, {
            productId: action.productId
          });

        case 3:
          response = _context.sent;
          _context.next = 6;
          return (0, _effects.put)((0, _action.receiveProduct)(response.product));

        case 6:
          _context.next = 10;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[0, 8]]);
}

function watchRequsetProduct() {
  return _regenerator.default.wrap(function watchRequsetProduct$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _effects.takeEvery)('GET_PRODUCT_REQUEST', productFlow);

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2);
}