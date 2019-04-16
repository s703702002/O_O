"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread5 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _taiwan = _interopRequireDefault(require("../static/taiwan.json"));

var _utilis = require("../utilis");

function formCheck(id, value) {
  switch (id) {
    case 'name':
    case 'address':
      return /[a-zA-Z\u4e00-\u9fa5]/g.test(value) ? '' : '至少輸入一個中文或英文字';

    case 'cellphone':
      return /^09\d{8}/g.test(value) ? '' : '請輸入正確的手機格式';

    default:
      return '';
  }
}

var FormControl = function FormControl(_ref) {
  var _ref$id = _ref.id,
      id = _ref$id === void 0 ? null : _ref$id,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? 'text' : _ref$type,
      _ref$label = _ref.label,
      label = _ref$label === void 0 ? '標題文字' : _ref$label,
      _ref$placeholder = _ref.placeholder,
      placeholder = _ref$placeholder === void 0 ? '' : _ref$placeholder,
      _ref$onChange = _ref.onChange,
      onChange = _ref$onChange === void 0 ? null : _ref$onChange,
      _ref$onBlur = _ref.onBlur,
      onBlur = _ref$onBlur === void 0 ? null : _ref$onBlur,
      _ref$isInvalid = _ref.isInvalid,
      isInvalid = _ref$isInvalid === void 0 ? '' : _ref$isInvalid,
      _ref$defaultValue = _ref.defaultValue,
      defaultValue = _ref$defaultValue === void 0 ? null : _ref$defaultValue;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("label", {
    htmlFor: id
  }, label), _react.default.createElement("input", {
    className: (0, _classnames.default)('form-control', {
      'is-invalid': isInvalid.length > 0
    }),
    type: type,
    id: id,
    placeholder: placeholder,
    onChange: onChange,
    onBlur: onBlur,
    defaultValue: defaultValue
  }), isInvalid.length > 0 ? _react.default.createElement("div", {
    className: "invalid-feedback"
  }, isInvalid) : null);
};

var FormRow = function FormRow(_ref2) {
  var children = _ref2.children;
  return _react.default.createElement("div", {
    className: "form-row"
  }, children);
};

var FormGroup = function FormGroup(_ref3) {
  var _cx;

  var children = _ref3.children,
      md = _ref3.md,
      xl = _ref3.xl;
  return _react.default.createElement("div", {
    className: (0, _classnames.default)('form-grop', (_cx = {}, (0, _defineProperty2.default)(_cx, "col-md-".concat(md), md > 0), (0, _defineProperty2.default)(_cx, "col-md-".concat(xl), xl > 0), _cx))
  }, children);
};

var Form =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Form, _Component);

  function Form() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Form);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Form)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "state", {
      name: {
        value: '',
        error: ''
      },
      cellphone: {
        value: '',
        error: ''
      },
      address: {
        value: '',
        error: ''
      },
      remark: {
        value: '',
        error: ''
      },
      cityValue: 0,
      regionValue: 0,
      isValid: false
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "valueCheckAll", function () {
      var copy = (0, _utilis.clone)(_this.state);
      var keys = Object.keys(copy);
      var isValid = true;
      keys.forEach(function (id) {
        var value = copy[id].value; // 代表是不需驗證的欄位

        if (typeof value === 'undefined') return;
        copy[id] = {
          value: value,
          error: formCheck(id, value)
        };
        if (copy[id].error.length > 0) isValid = false;
      });

      _this.setState(function () {
        return (0, _objectSpread5.default)({}, copy, {
          isValid: isValid
        });
      });

      return isValid;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "formChange", function (e) {
      var _e$target = e.target,
          id = _e$target.id,
          value = _e$target.value;

      _this.setState(function (prevState) {
        return (0, _objectSpread5.default)({}, prevState, (0, _defineProperty2.default)({}, id, {
          value: value,
          error: ''
        }));
      });
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "valueCheck", function (e) {
      var _e$target2 = e.target,
          id = _e$target2.id,
          value = _e$target2.value;
      var error = formCheck(id, value);

      if (error.length) {
        _this.setState(function (prevState) {
          var _objectSpread3;

          return (0, _objectSpread5.default)({}, prevState, (_objectSpread3 = {}, (0, _defineProperty2.default)(_objectSpread3, id, {
            value: value,
            error: error
          }), (0, _defineProperty2.default)(_objectSpread3, "isValid", false), _objectSpread3));
        });
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "selectChange", function (e) {
      var _e$target3 = e.target,
          id = _e$target3.id,
          value = _e$target3.value;

      _this.setState(function (prevState) {
        return (0, _objectSpread5.default)({}, prevState, (0, _defineProperty2.default)({
          regionValue: 0
        }, id, value));
      });
    });
    return _this;
  }

  (0, _createClass2.default)(Form, [{
    key: "getValid",
    value: function getValid() {
      return this.valueCheckAll();
    }
  }, {
    key: "render",
    value: function render() {
      var className = this.props.className;
      var _this$state = this.state,
          name = _this$state.name,
          cellphone = _this$state.cellphone,
          address = _this$state.address,
          remark = _this$state.remark,
          cityValue = _this$state.cityValue,
          regionValue = _this$state.regionValue;
      var region = _taiwan.default.region[cityValue]; // 鄉鎮地區

      return _react.default.createElement("form", {
        className: className
      }, _react.default.createElement(Form.Row, null, _react.default.createElement(Form.Group, {
        md: 6
      }, _react.default.createElement(Form.Control, {
        label: "\u59D3\u540D",
        id: "name",
        placeholder: "\u9673\u963F\u4E09",
        value: name.value,
        isInvalid: name.error,
        onChange: this.formChange,
        onBlur: this.valueCheck
      })), _react.default.createElement(Form.Group, {
        md: 6
      }, _react.default.createElement(Form.Control, {
        id: "cellphone",
        label: "\u624B\u6A5F",
        placeholder: "0912345678",
        value: cellphone.value,
        isInvalid: cellphone.error,
        onChange: this.formChange,
        onBlur: this.valueCheck
      }))), _react.default.createElement(Form.Row, null, _react.default.createElement(Form.Group, {
        md: 6
      }, _react.default.createElement("label", {
        htmlFor: "cityValue"
      }, "\u7E23\u5E02"), _react.default.createElement("select", {
        id: "cityValue",
        className: "form-control",
        defaultValue: cityValue,
        onChange: this.selectChange
      }, _taiwan.default.city.map(function (c, i) {
        return _react.default.createElement("option", {
          value: i,
          key: c
        }, c);
      }))), _react.default.createElement(Form.Group, {
        md: 4
      }, _react.default.createElement("label", {
        htmlFor: "regionValue"
      }, "\u9109\u93AE\u5730\u5340"), _react.default.createElement("select", {
        id: "regionValue",
        className: "form-control",
        value: regionValue,
        onChange: this.selectChange
      }, region.map(function (r, i) {
        return _react.default.createElement("option", {
          value: i,
          key: r
        }, r);
      }))), _react.default.createElement(Form.Group, {
        md: 2
      }, _react.default.createElement(Form.Control, {
        id: "inputZip",
        label: "\u90F5\u905E\u5340\u865F",
        defaultValue: "114"
      }))), _react.default.createElement(Form.Group, null, _react.default.createElement(Form.Control, {
        id: "address",
        label: "\u5730\u5740",
        value: address.value,
        isInvalid: address.error,
        onChange: this.formChange,
        onBlur: this.valueCheck
      })), _react.default.createElement(Form.Group, null, _react.default.createElement("label", {
        htmlFor: "remark"
      }, "\u5099\u8A3B"), _react.default.createElement("textarea", {
        className: "form-control",
        id: "remark",
        rows: "3",
        value: remark.value,
        onChange: this.formChange
      })));
    }
  }]);
  return Form;
}(_react.Component);

(0, _defineProperty2.default)(Form, "propTypes", {
  className: _propTypes.default.string
});
(0, _defineProperty2.default)(Form, "defaultProps", {
  className: null
});
(0, _defineProperty2.default)(Form, "Row", FormRow);
(0, _defineProperty2.default)(Form, "Group", FormGroup);
(0, _defineProperty2.default)(Form, "Control", FormControl);
var _default = Form;
exports.default = _default;