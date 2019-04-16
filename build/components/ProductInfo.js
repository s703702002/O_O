"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var dataImg = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22980%22%20height%3D%22270%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20980%20270%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_1651ec9a4f5%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A49pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_1651ec9a4f5%22%3E%3Crect%20width%3D%22980%22%20height%3D%22270%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%22364.671875%22%20y%3D%22156.9%22%3E980x270%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';

var ProductInfo = function ProductInfo(_ref) {
  var title = _ref.product.title;
  return _react.default.createElement("div", {
    className: "col-8"
  }, _react.default.createElement("h3", null, title), _react.default.createElement("img", {
    className: "mw-100",
    src: dataImg,
    title: title,
    alt: title
  }), _react.default.createElement("p", {
    className: "mt-1"
  }, "\u5546\u54C1\u63CF\u8FF0\u5546\u54C1\u63CF\u8FF0\u5546\u54C1\u63CF\u8FF0\u5546\u54C1\u63CF\u8FF0\u5546\u54C1\u63CF\u8FF0\u5546\u54C1\u63CF\u8FF0 \u5546\u54C1\u63CF\u8FF0\u5546\u54C1\u63CF\u8FF0\u5546\u54C1\u63CF\u8FF0\u5546\u54C1\u63CF\u8FF0\u5546\u54C1\u63CF\u8FF0\u5546\u54C1\u63CF\u8FF0 \u5546\u54C1\u63CF\u8FF0\u5546\u54C1\u63CF\u8FF0\u5546\u54C1\u63CF\u8FF0\u5546\u54C1\u63CF\u8FF0\u5546\u54C1\u63CF\u8FF0\u5546\u54C1\u63CF\u8FF0"));
};

var _default = ProductInfo;
exports.default = _default;