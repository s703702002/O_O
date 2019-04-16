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

var _reactRouter = require("react-router");

var _classnames = _interopRequireDefault(require("classnames"));

var _utilis = require("../utilis");

var sortOnChange = function sortOnChange(value, history) {
  (0, _utilis.pushHistory)({
    sort: value
  }, history);
};

var Aside =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Aside, _Component);

  function Aside() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Aside);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Aside)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "minPrice", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "maxPrice", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "filterPrice", function () {
      var history = _this.props.history;
      var obj = {
        minPrice: _this.minPrice.value,
        maxPrice: _this.maxPrice.value
      };
      (0, _utilis.pushHistory)(obj, history);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "genderOnChange", function (e) {
      var history = _this.props.history;
      (0, _utilis.pushHistory)({
        gender: e.target.value
      }, history);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "clearAll", function () {
      _this.minPrice.value = '';
      _this.maxPrice.value = '';

      _this.props.history.push('');
    });
    return _this;
  }

  (0, _createClass2.default)(Aside, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var search = this.props.location.search;
      var history = this.props.history;
      var className = this.props.className;
      var queryObject = search.length > 0 && (0, _utilis.queryToObj)(search);
      return _react.default.createElement("aside", {
        className: (0, _classnames.default)('filter_section', className)
      }, _react.default.createElement("section", {
        className: "order_box"
      }, _react.default.createElement("header", {
        className: "mb-2"
      }, "\u6392\u5E8F"), _react.default.createElement("section", null, _react.default.createElement("button", {
        className: (0, _classnames.default)('btn btn-outline-primary', {
          active: queryObject.sort === 'desc'
        }),
        onClick: function onClick() {
          sortOnChange('desc', history);
        }
      }, "\u50F9\u683C: \u9AD8\u81F3\u4F4E"), _react.default.createElement("button", {
        className: (0, _classnames.default)('btn btn-outline-primary', {
          active: queryObject.sort === 'asc'
        }),
        onClick: function onClick() {
          sortOnChange('asc', history);
        }
      }, "\u50F9\u683C: \u4F4E\u81F3\u9AD8"))), _react.default.createElement("section", {
        className: "filter_box"
      }, _react.default.createElement("header", {
        className: "title mb-2"
      }, "\u6027\u5225"), _react.default.createElement("div", {
        className: "custom-control custom-radio"
      }, _react.default.createElement("input", {
        type: "radio",
        id: "maleRadio",
        name: "gender",
        className: "custom-control-input",
        value: "male",
        checked: queryObject.gender === 'male',
        onChange: this.genderOnChange
      }), _react.default.createElement("label", {
        className: "custom-control-label",
        htmlFor: "maleRadio"
      }, "\u7537\u88DD")), _react.default.createElement("div", {
        className: "custom-control custom-radio"
      }, _react.default.createElement("input", {
        type: "radio",
        id: "femaleRadio",
        name: "gender",
        className: "custom-control-input",
        value: "female",
        checked: queryObject.gender === 'female',
        onChange: this.genderOnChange
      }), _react.default.createElement("label", {
        className: "custom-control-label",
        htmlFor: "femaleRadio"
      }, "\u5973\u88DD"))), _react.default.createElement("section", {
        className: "filter_box"
      }, _react.default.createElement("header", {
        className: "title mb-2"
      }, "\u50F9\u683C\u5340\u9593"), _react.default.createElement("div", {
        className: "form-group"
      }, _react.default.createElement("input", {
        type: "number",
        className: "form-control",
        name: "minPrice",
        min: "0",
        defaultValue: queryObject.minPrice,
        placeholder: "\u6700\u4F4E\u9810\u7B97",
        ref: function ref(e) {
          _this2.minPrice = e;
        }
      })), _react.default.createElement("div", {
        className: "form-group"
      }, _react.default.createElement("input", {
        type: "number",
        className: "form-control",
        name: "maxPrice",
        min: "0",
        defaultValue: queryObject.maxPrice,
        placeholder: "\u6700\u9AD8\u9810\u7B97",
        ref: function ref(e) {
          _this2.maxPrice = e;
        }
      })), _react.default.createElement("button", {
        type: "submit",
        className: "btn btn-outline-primary",
        onClick: this.filterPrice
      }, "\u7BE9\u9078\u50F9\u683C")), _react.default.createElement("section", {
        className: "filter_box"
      }, _react.default.createElement("button", {
        className: "btn btn-outline-danger",
        onClick: this.clearAll
      }, "\u6E05\u9664\u5168\u90E8")));
    }
  }]);
  return Aside;
}(_react.Component);

var _default = (0, _reactRouter.withRouter)(Aside);

exports.default = _default;