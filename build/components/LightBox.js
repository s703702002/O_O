"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var LightBox =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(LightBox, _Component);

  function LightBox() {
    (0, _classCallCheck2.default)(this, LightBox);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(LightBox).apply(this, arguments));
  }

  (0, _createClass2.default)(LightBox, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          message = _this$props.message,
          removeLightBox = _this$props.removeLightBox;
      return _react.default.createElement("div", {
        className: (0, _classnames.default)('modal light_box', className),
        tabIndex: "-1",
        role: "dialog"
      }, _react.default.createElement("div", {
        className: "modal-dialog modal-dialog-centered",
        role: "document"
      }, _react.default.createElement("div", {
        className: "modal-content"
      }, _react.default.createElement("div", {
        className: "modal-body"
      }, _react.default.createElement("i", {
        className: "material-icons text-warning"
      }, "error_outline"), _react.default.createElement("p", {
        className: "text-warning font-weight-bold message"
      }, message), _react.default.createElement("button", {
        className: "btn btn-outline-info",
        onClick: removeLightBox
      }, "\u77E5\u9053\u4E86")))), _react.default.createElement("div", {
        className: "mask",
        role: "document",
        onClick: removeLightBox
      }));
    }
  }]);
  return LightBox;
}(_react.Component);

(0, _defineProperty2.default)(LightBox, "propTypes", {
  className: _propTypes.default.string,
  message: _propTypes.default.string.isRequired
});
(0, _defineProperty2.default)(LightBox, "defaultProps", {
  className: null
});
var _default = LightBox;
exports.default = _default;