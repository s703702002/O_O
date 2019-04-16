"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var NotFound = function NotFound() {
  return _react.default.createElement("div", {
    className: "container not_found text-danger"
  }, _react.default.createElement("h1", null, "\u5F88\u62B1\u6B49\uFF0C\u67E5\u7121\u6B64\u9801\u9762"), _react.default.createElement("div", null, _react.default.createElement("i", {
    className: "material-icons text-danger"
  }, "report")), _react.default.createElement(_reactRouterDom.Link, {
    to: "/"
  }, _react.default.createElement("button", {
    className: "goIndex"
  }, "\u56DE\u9996\u9801")));
};

var _default = NotFound;
exports.default = _default;