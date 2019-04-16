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

var _reactRedux = require("react-redux");

var _reactRouter = require("react-router");

var _PushButton = _interopRequireDefault(require("../components/PushButton"));

var _Form = _interopRequireDefault(require("../components/Form"));

var _OrderInfo = _interopRequireDefault(require("./OrderInfo"));

var CustomerInfoContainer =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(CustomerInfoContainer, _Component);

  function CustomerInfoContainer() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, CustomerInfoContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(CustomerInfoContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "customerForm", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "confirmHandler", function () {
      var _assertThisInitialize = (0, _assertThisInitialized2.default)(_this),
          customerForm = _assertThisInitialize.customerForm;

      if (!customerForm.getValid()) return;

      _this.props.history.push('/checkoutfinish');
    });
    return _this;
  }

  (0, _createClass2.default)(CustomerInfoContainer, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react.default.createElement("div", {
        className: "container"
      }, _react.default.createElement("div", {
        className: "row"
      }, _react.default.createElement("div", {
        className: "col-9"
      }, _react.default.createElement("section", null, _react.default.createElement("h4", null, "\u6536\u4EF6\u4EBA\u8CC7\u8A0A"), _react.default.createElement(_Form.default, {
        className: "customer_info_form",
        ref: function ref(e) {
          _this2.customerForm = e;
        }
      }))), _react.default.createElement("div", {
        className: "col-3"
      }, _react.default.createElement(_OrderInfo.default, null), _react.default.createElement(_PushButton.default, {
        className: "btn btn-outline-info w-100 my-2",
        path: "/checkout",
        text: "\u4E0A\u4E00\u6B65"
      }), _react.default.createElement("button", {
        className: "btn btn-danger w-100 my-2 text-lg",
        onClick: this.confirmHandler
      }, "\u78BA\u8A8D\u7D50\u5E33"))));
    }
  }]);
  return CustomerInfoContainer;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  var shoppingCart = state.shoppingCart;
  return {
    shoppingCart: shoppingCart
  };
};

var _default = (0, _reactRouter.withRouter)((0, _reactRedux.connect)(mapStateToProps)(CustomerInfoContainer));

exports.default = _default;