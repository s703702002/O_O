"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = watchRequsetProducts;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _effects = require("redux-saga/effects");

var _api = require("../api");

var _action = require("../action");

var _marked =
/*#__PURE__*/
_regenerator.default.mark(productsFlow),
    _marked2 =
/*#__PURE__*/
_regenerator.default.mark(watchRequsetProducts);

function productsFlow() {
  var response;
  return _regenerator.default.wrap(function productsFlow$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return (0, _effects.call)(_api.getAllProductsAPI);

        case 3:
          response = _context.sent;
          _context.next = 6;
          return (0, _effects.put)((0, _action.receiveProducts)(response.products));

        case 6:
          _context.next = 12;
          break;

        case 8:
          _context.prev = 8;
          _context.t0 = _context["catch"](0);
          _context.next = 12;
          return (0, _effects.put)((0, _action.getProductsError)(_context.t0));

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[0, 8]]);
}

function watchRequsetProducts() {
  return _regenerator.default.wrap(function watchRequsetProducts$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return (0, _effects.takeLatest)('GET_PRODUCTS_REQUEST', productsFlow);

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2);
}