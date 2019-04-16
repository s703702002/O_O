"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _action = require("../action");

var _PushButton = _interopRequireDefault(require("../components/PushButton"));

var CartItem = function CartItem(_ref) {
  var order = _ref.order,
      dispatch = _ref.dispatch;
  return _react.default.createElement("div", {
    className: "cart_item"
  }, _react.default.createElement(_reactRouterDom.Link, {
    to: "/".concat(order.product.id)
  }, _react.default.createElement("h6", {
    className: "product_title"
  }, "".concat(order.product.title, "\uFF0C"), _react.default.createElement("span", {
    className: "text-danger"
  }, "$".concat(order.product.price)))), _react.default.createElement("span", {
    className: "text-muted"
  }, " x ".concat(order.count, "\u4EF6")), _react.default.createElement("small", {
    role: "button",
    tabIndex: "-1",
    className: "ml-2 remove text-danger",
    onClick: function onClick() {
      dispatch((0, _action.removeShoppingCardItem)(order.product.id));
    }
  }, "\u79FB\u9664"));
};

var CartContent = function CartContent(_ref2) {
  var shoppingCart = _ref2.shoppingCart,
      dispatch = _ref2.dispatch;
  return _react.default.createElement(_react.default.Fragment, null, shoppingCart.map(function (order) {
    return _react.default.createElement(CartItem, {
      order: order,
      dispatch: dispatch,
      key: order.product.id
    });
  }), _react.default.createElement("div", {
    className: "goCheckout"
  }, _react.default.createElement(_PushButton.default, {
    className: "font-weight-bold btn btn-success",
    path: "/checkout",
    text: "\u7ACB\u523B\u7D50\u5E33"
  })));
};

var Product = function Product(_ref3) {
  var shoppingCart = _ref3.shoppingCart,
      dispatch = _ref3.dispatch;
  return _react.default.createElement("div", null, _react.default.createElement("h4", null, "\u6211\u7684\u8CFC\u7269\u8ECA"), !shoppingCart.length ? _react.default.createElement("div", {
    className: "empty_cart"
  }, _react.default.createElement("i", {
    className: "material-icons"
  }, "add_shopping_cart"), _react.default.createElement("p", null, "\u5C1A\u7121\u5546\u54C1")) : _react.default.createElement(CartContent, {
    shoppingCart: shoppingCart,
    dispatch: dispatch
  }));
};

var SoppingCart = function SoppingCart(_ref4) {
  var status = _ref4.status,
      shoppingCart = _ref4.shoppingCart,
      dispatch = _ref4.dispatch;
  return _react.default.createElement("div", {
    className: "shopping_cart mr-3"
  }, _react.default.createElement("i", {
    className: "material-icons md-24"
  }, "shopping_cart"), _react.default.createElement("div", {
    className: "cart_content box-shadow"
  }, status === 'logined' ? _react.default.createElement(Product, {
    shoppingCart: shoppingCart,
    dispatch: dispatch
  }) : '請先登入!'), status === 'logined' && shoppingCart.length > 0 ? _react.default.createElement("span", {
    className: "count"
  }, shoppingCart.length) : null);
};

var mapStateToProps = function mapStateToProps(state) {
  var shoppingCart = state.shoppingCart,
      status = state.login.status;
  return {
    status: status,
    shoppingCart: shoppingCart
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps)(SoppingCart);

exports.default = _default;