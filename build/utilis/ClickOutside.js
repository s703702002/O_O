"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var ClickOutside =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ClickOutside, _Component);

  function ClickOutside(props) {
    var _this;

    (0, _classCallCheck2.default)(this, ClickOutside);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ClickOutside).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handle", function (e) {
      if (_this.isClickInSide) {
        _this.isClickInSide = false;
        return;
      }

      if (e.type === 'touchend') _this.isTouch = true;
      if (e.type === 'click' && _this.isTouch) return;
      var onClickOutside = _this.props.onClickOutside;
      if (_this.isUnMounted === false) onClickOutside(e);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleClick", function () {
      _this.isClickInSide = true;
    });
    _this.isTouch = false;
    _this.isClickInSide = false;
    _this.isUnMounted = false;
    return _this;
  }

  (0, _createClass2.default)(ClickOutside, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      document.addEventListener('touchend', this.handle, false);
      document.addEventListener('click', this.handle, false);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.isUnMounted = true;
      document.removeEventListener('touchend', this.handle, false);
      document.removeEventListener('click', this.handle, false);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          onClickOutside = _this$props.onClickOutside,
          props = (0, _objectWithoutProperties2.default)(_this$props, ["children", "onClickOutside"]);
      return _react.default.createElement("div", (0, _extends2.default)({}, props, {
        onClick: this.handleClick,
        role: "document"
      }), children);
    }
  }]);
  return ClickOutside;
}(_react.Component);

exports.default = ClickOutside;
(0, _defineProperty2.default)(ClickOutside, "propTypes", {
  onClickOutside: _propTypes.default.func.isRequired
});