"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouter = require("react-router");

var PushButton = function PushButton(_ref) {
  var className = _ref.className,
      path = _ref.path,
      text = _ref.text,
      history = _ref.history;
  return _react.default.createElement("button", {
    className: className,
    onClick: function onClick() {
      history.push(path);
    }
  }, text);
};

var _default = (0, _reactRouter.withRouter)(PushButton);

exports.default = _default;