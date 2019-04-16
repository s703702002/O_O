"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var productPage = function productPage() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
    message: null,
    product: {}
  };
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'RECEIVE_PRODUCT':
      return {
        product: action.response,
        message: null
      };

    case 'GET_PRODUCT_ERROR':
      return {
        product: {},
        message: action.error
      };

    default:
      return state;
  }
};

var _default = productPage;
exports.default = _default;