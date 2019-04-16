"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Header = require("../containers/Header");

var _CheckoutContainer = _interopRequireDefault(require("../containers/CheckoutContainer"));

var CheckoutPage = function CheckoutPage() {
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_Header.SimpleHeader, null), _react.default.createElement(_CheckoutContainer.default, null));
};

var _default = CheckoutPage;
exports.default = _default;