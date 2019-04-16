"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

// const imgUrl = '/static/img/';
var imgUrl = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16576763d66%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16576763d66%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.8359375%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';

var Card = function Card(_ref) {
  var item = _ref.item,
      col = _ref.col;
  return _react.default.createElement("div", {
    role: "document",
    className: "col-".concat(col, " product_card"),
    onClick: function onClick() {
      window.scrollTo(0, 0);
    }
  }, _react.default.createElement(_reactRouterDom.Link, {
    to: item.id,
    className: "card"
  }, _react.default.createElement("img", {
    className: "card-img-top",
    src: imgUrl,
    alt: item.title
  }), _react.default.createElement("div", {
    className: "card-body"
  }, _react.default.createElement("h5", {
    className: "card-title"
  }, item.title, _react.default.createElement("span", {
    className: "float-right"
  }, item.gender === 1 ? '男裝' : '女裝')), _react.default.createElement("p", {
    className: "card-text"
  }, "\u552E\u50F9: ".concat(item.price, " \u5143")), _react.default.createElement("p", {
    className: "card-text"
  }, _react.default.createElement("small", {
    className: "text-muted"
  }, "\u5EAB\u5B58: ".concat(item.inventory))))));
};

var _default = Card;
exports.default = _default;