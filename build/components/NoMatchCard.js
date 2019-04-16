"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var NoMatchCard = function NoMatchCard() {
  return _react.default.createElement("div", {
    className: "col no_match"
  }, _react.default.createElement("h2", {
    className: "no_match_txt"
  }, "\u641C\u5C0B\u4E0D\u5230\u7522\u54C1\uFF0C\u8ACB\u91CD\u65B0\u641C\u5C0B"), _react.default.createElement("i", {
    className: "material-icons"
  }, "sentiment_very_dissatisfied"));
};

var _default = NoMatchCard;
exports.default = _default;