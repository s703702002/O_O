"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _reactRedux = require("react-redux");

var Addfinished = function Addfinished(_ref) {
  var showAddFinished = _ref.showAddFinished;
  return _react.default.createElement("div", {
    className: (0, _classnames.default)('modal add_finished', {
      show: showAddFinished
    }),
    tabIndex: "-1",
    role: "dialog"
  }, _react.default.createElement("div", {
    className: "modal-dialog modal-dialog-centered",
    role: "document"
  }, _react.default.createElement("div", {
    className: "content"
  }, _react.default.createElement("h2", null, "\u5546\u54C1\u5DF2\u6210\u529F\u52A0\u5165\u8CFC\u7269\u8ECA"), _react.default.createElement("i", {
    className: "material-icons"
  }, "check_circle_outline"))), _react.default.createElement("div", {
    className: "mask",
    role: "document"
  }));
};

var mapStateToProps = function mapStateToProps(state) {
  var showAddFinished = state.showAddFinished;
  return {
    showAddFinished: showAddFinished
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps)(Addfinished);

exports.default = _default;