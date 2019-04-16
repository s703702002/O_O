"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var isNewItem = function isNewItem(state, productId) {
  return !state.some(function (item) {
    return item.product.id === productId;
  });
};

var handleAddToCart = function handleAddToCart(state, action) {
  var product = action.product,
      count = action.count;
  var productId = product.id; // 若是不在購物車的產品 就新增一筆資料

  if (isNewItem(state, productId)) {
    return [].concat((0, _toConsumableArray2.default)(state), [{
      product: product,
      count: count
    }]);
  }

  return state.map(function (item) {
    var order = (0, _objectSpread2.default)({}, item);
    if (order.product.id === productId) order.count += count;
    return order;
  });
};

var handleReduceCartItem = function handleReduceCartItem(state, action) {
  var productId = action.productId;
  return state.map(function (item) {
    var order = (0, _objectSpread2.default)({}, item);
    if (order.product.id === productId) order.count -= 1;
    return order;
  });
};

var shoppingsCarts = function shoppingsCarts() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return (0, _toConsumableArray2.default)(action.response.shoppings);

    case 'LOG_OUT':
      return [];

    case 'ADD_TO_CART':
      return handleAddToCart(state, action);

    case 'REMOVE_SHOPPING_CART_ITEM':
      return state.filter(function (item) {
        return item.product.id !== action.productId;
      });

    case 'REDUCE_CART_ITEM':
      return handleReduceCartItem(state, action);

    default:
      return state;
  }
};

var _default = shoppingsCarts;
exports.default = _default;