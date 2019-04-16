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

var _classnames = _interopRequireDefault(require("classnames"));

var _action = require("../action");

var Loading = function Loading() {
  return _react.default.createElement("div", {
    className: "loader-outer"
  }, _react.default.createElement("div", {
    className: "loader"
  }));
};

var LoginError = function LoginError(props) {
  return _react.default.createElement("p", null, props.message);
};

var LoginSuccess = function LoginSuccess() {
  return _react.default.createElement("p", null, "\u767B\u5165\u6210\u529F\uFF0C\u6B61\u8FCE\u56DE\u4F86");
};

var LoginForm = function LoginForm(props) {
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", {
    className: "form-group row"
  }, _react.default.createElement("label", {
    htmlFor: "account",
    className: "col-sm-2 col-form-label"
  }, "\u5E33\u865F"), _react.default.createElement("div", {
    className: "col-sm-10"
  }, _react.default.createElement("input", {
    ref: props.accountRef,
    type: "text",
    className: "form-control",
    id: "account",
    placeholder: "\u8ACB\u8F38\u5165\u5E33\u865F",
    autoComplete: "off"
  }))), _react.default.createElement("div", {
    className: "form-group row"
  }, _react.default.createElement("label", {
    htmlFor: "password",
    className: "col-sm-2 col-form-label"
  }, "\u5BC6\u78BC"), _react.default.createElement("div", {
    className: "col-sm-10"
  }, _react.default.createElement("input", {
    ref: props.passwordRef,
    type: "password",
    className: "form-control",
    id: "password",
    placeholder: "\u8ACB\u8F38\u5165\u5E33\u865F"
  }))), _react.default.createElement("p", null, "\u6E2C\u8A66\u5E33\u865F:stanley \u5BC6\u78BC:0000"));
};

var LoginBox =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(LoginBox, _Component);

  function LoginBox() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, LoginBox);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(LoginBox)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "onClickLogin", function () {
      var login = _this.props.login;

      var _assertThisInitialize = (0, _assertThisInitialized2.default)(_this),
          accountInput = _assertThisInitialize.accountInput,
          passwordInput = _assertThisInitialize.passwordInput;

      var payload = {
        username: accountInput.value,
        password: passwordInput.value
      };
      login(payload);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "handleKeyUp", function (e) {
      var _assertThisInitialize2 = (0, _assertThisInitialized2.default)(_this),
          accountInput = _assertThisInitialize2.accountInput,
          passwordInput = _assertThisInitialize2.passwordInput; // Enter鍵


      if (e.keyCode === 13 && accountInput.value !== '' && passwordInput.value !== '') {
        _this.onClickLogin();
      }
    });
    return _this;
  }

  (0, _createClass2.default)(LoginBox, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          loginBoxOpen = _this$props.loginBoxOpen,
          close = _this$props.closeLoginBox,
          loginCancelEvent = _this$props.loginCancelEvent,
          status = _this$props.status,
          message = _this$props.message;
      var accountInput = this.accountInput;
      if (loginBoxOpen) accountInput.focus();
      return _react.default.createElement("div", {
        className: (0, _classnames.default)('modal login_box', {
          show: loginBoxOpen,
          loading: status === 'loading'
        }),
        tabIndex: "-1",
        role: "dialog",
        onKeyUp: this.handleKeyUp
      }, _react.default.createElement("div", {
        className: "modal-dialog modal-dialog-centered",
        role: "document"
      }, _react.default.createElement("div", {
        className: "modal-content"
      }, _react.default.createElement("div", {
        className: "modal-body"
      }, status === 'loading' ? _react.default.createElement(Loading, null) : null, status === 'loginerr' ? _react.default.createElement(LoginError, {
        message: message
      }) : null, status === 'logined' ? _react.default.createElement(LoginSuccess, null) : _react.default.createElement(LoginForm, {
        accountRef: function accountRef(el) {
          _this2.accountInput = el;
        },
        passwordRef: function passwordRef(el) {
          _this2.passwordInput = el;
        }
      })), _react.default.createElement("div", {
        className: "modal-footer"
      }, _react.default.createElement("button", {
        type: "button",
        className: "btn btn-danger abort-login",
        onClick: loginCancelEvent
      }, "\u53D6\u6D88\u767B\u5165"), _react.default.createElement("button", {
        type: "button",
        className: "btn btn-primary",
        onClick: this.onClickLogin
      }, "\u767B\u5165"), _react.default.createElement("button", {
        className: "btn btn-secondary",
        onClick: close
      }, "\u53D6\u6D88")))), _react.default.createElement("div", {
        className: "mask",
        onClick: close,
        role: "document"
      }));
    }
  }]);
  return LoginBox;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  var loginBoxOpen = state.loginBoxOpen,
      _state$login = state.login,
      status = _state$login.status,
      message = _state$login.message;
  return {
    loginBoxOpen: loginBoxOpen,
    status: status,
    message: message
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    closeLoginBox: function closeLoginBox() {
      dispatch(_action.closeLoginBox);
    },
    login: function login(_ref) {
      var username = _ref.username,
          password = _ref.password;
      dispatch((0, _action.loginRequest)({
        username: username,
        password: password
      }));
    },
    loginCancelEvent: function loginCancelEvent() {
      dispatch(_action.loginCancel);
    }
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(LoginBox);

exports.default = _default;