"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Header = require("../containers/Header");

var _CustomerInfoContainer = _interopRequireDefault(require("../containers/CustomerInfoContainer"));

var CustomerInfoPage = function CustomerInfoPage() {
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_Header.SimpleHeader, null), _react.default.createElement(_CustomerInfoContainer.default, null));
};

var _default = CustomerInfoPage;
exports.default = _default;