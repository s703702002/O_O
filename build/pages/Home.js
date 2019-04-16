"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _Header = _interopRequireDefault(require("../containers/Header"));

var _CardContainer = _interopRequireDefault(require("../containers/CardContainer"));

var Home = function Home() {
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_Header.default, null), _react.default.createElement(_CardContainer.default, null));
};

var _default = Home;
exports.default = _default;