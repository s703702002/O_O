"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var products = function products() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    message: null,
    products: []
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'RECEIVE_PRODUCTS':
      return {
        products: action.response,
        message: null
      };

    case 'GET_PRODUCTS_ERROR':
      return {
        products: [],
        message: action.error
      };

    default:
      return state;
  }
};

var _default = products;
exports.default = _default;