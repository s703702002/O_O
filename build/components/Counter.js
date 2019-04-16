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

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var Counter =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Counter, _Component);

  function Counter() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Counter);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Counter)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      count: _this.props.defaultValue
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "minus", function () {
      var count = _this.state.count;
      var _this$props = _this.props,
          min = _this$props.min,
          minClick = _this$props.minClick,
          minusClick = _this$props.minusClick;
      count -= 1;
      if (count < min) return minClick();
      return _this.setState(function () {
        return {
          count: count
        };
      }, minusClick);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "add", function () {
      var count = _this.state.count;
      var _this$props2 = _this.props,
          max = _this$props2.max,
          maxClick = _this$props2.maxClick,
          addClick = _this$props2.addClick;
      count += 1;
      if (count > max) return maxClick();
      return _this.setState(function () {
        return {
          count: count
        };
      }, addClick);
    });
    return _this;
  }

  (0, _createClass2.default)(Counter, [{
    key: "render",
    value: function render() {
      return _react.default.createElement("div", {
        className: "counter"
      }, _react.default.createElement("button", {
        className: "btn btn-light material-icons",
        onClick: this.minus
      }, "remove"), _react.default.createElement("span", {
        className: "count"
      }, this.state.count), _react.default.createElement("button", {
        className: "btn btn-light material-icons",
        onClick: this.add
      }, "add"));
    }
  }]);
  return Counter;
}(_react.Component);

(0, _defineProperty2.default)(Counter, "propTypes", {
  max: _propTypes.default.number,
  min: _propTypes.default.number,
  maxClick: _propTypes.default.func,
  minClick: _propTypes.default.func,
  addClick: _propTypes.default.func,
  minusClick: _propTypes.default.func,
  defaultValue: _propTypes.default.number
});
(0, _defineProperty2.default)(Counter, "defaultProps", {
  max: null,
  min: 0,
  maxClick: function maxClick() {},
  // 超出最大值的click
  minClick: function minClick() {},
  // 超出最小值的click
  addClick: function addClick() {},
  minusClick: function minusClick() {},
  defaultValue: 0
});
var _default = Counter;
exports.default = _default;