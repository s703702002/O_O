"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Header = _interopRequireDefault(require("../containers/Header"));

var _ProductContainer = _interopRequireDefault(require("../containers/ProductContainer"));

var ProductPage = function ProductPage() {
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_Header.default, null), _react.default.createElement(_ProductContainer.default, null));
};

var _default = ProductPage;
exports.default = _default;