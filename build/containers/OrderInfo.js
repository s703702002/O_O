"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

// 計算總價格
function calcPrice(cart) {
  return cart.reduce(function (acc, cur) {
    var price = cur.product.price,
        count = cur.count;
    return acc + price * count;
  }, 0);
}

var Item = function Item(_ref) {
  var title = _ref.title,
      price = _ref.price;
  return _react.default.createElement("div", {
    className: "item"
  }, _react.default.createElement("span", {
    className: "title"
  }, title), _react.default.createElement("span", null, _react.default.createElement("b", {
    className: "text-danger"
  }, price), "\u5143"));
};

var OrderInfo = function OrderInfo(_ref2) {
  var totalPrice = _ref2.totalPrice,
      discount = _ref2.discount;
  return _react.default.createElement("aside", {
    className: "order_info"
  }, _react.default.createElement("header", {
    className: "order_info_header"
  }, _react.default.createElement("h4", {
    className: "mb-0"
  }, "\u6D88\u8CBB\u660E\u7D30")), _react.default.createElement("section", {
    className: "order_info_body"
  }, _react.default.createElement("section", {
    className: "info_section"
  }, _react.default.createElement(Item, {
    title: "\u5C0F\u8A08",
    price: totalPrice
  }), _react.default.createElement(Item, {
    title: "\u6298\u6263",
    price: discount
  })), _react.default.createElement("section", {
    className: "info_section"
  }, _react.default.createElement(Item, {
    title: "\u7E3D\u8A08",
    price: totalPrice - discount
  }))));
};

var mapStateToProps = function mapStateToProps(state) {
  var shoppingCart = state.shoppingCart;
  var totalPrice = calcPrice(shoppingCart);
  return {
    totalPrice: totalPrice,
    discount: 150
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps)(OrderInfo);

exports.default = _default;