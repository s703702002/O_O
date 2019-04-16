"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _Header = require("../containers/Header");

var CheckoutFinishPage = function CheckoutFinishPage() {
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_Header.SimpleHeader, null), _react.default.createElement("div", {
    className: "container text-center"
  }, _react.default.createElement("h2", {
    className: "mb-4"
  }, "\u611F\u8B1D\u60A8\u7684\u8A02\u8CFC", _react.default.createElement("i", {
    className: "material-icons"
  }, "sentiment_very_satisfied")), _react.default.createElement(_reactRouterDom.Link, {
    to: "/"
  }, _react.default.createElement("button", {
    className: "goIndex"
  }, "\u56DE\u9996\u9801"))));
};

var _default = CheckoutFinishPage;
exports.default = _default;