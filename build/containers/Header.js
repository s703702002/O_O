"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SimpleHeader = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _action = require("../action");

var _LoginBox = _interopRequireDefault(require("./LoginBox"));

var _ShoppingCart = _interopRequireDefault(require("./ShoppingCart"));

var Person = function Person(_ref) {
  var username = _ref.username;
  return _react.default.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center'
    }
  }, _react.default.createElement("i", {
    className: "material-icons"
  }, "person"), username);
};

var SimpleHeader = function SimpleHeader(_ref2) {
  var children = _ref2.children;
  return _react.default.createElement("div", {
    className: "d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 border-bottom top_header"
  }, _react.default.createElement(_reactRouterDom.Link, {
    to: "/",
    className: "mr-md-auto logo"
  }, _react.default.createElement("h3", {
    className: "my-0"
  }, "Happy Shop")), children);
};

exports.SimpleHeader = SimpleHeader;

var Header = function Header(_ref3) {
  var username = _ref3.username,
      status = _ref3.status,
      clickLogin = _ref3.clickLogin,
      clickLogout = _ref3.clickLogout;
  return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(SimpleHeader, null, _react.default.createElement("span", {
    className: "mr-2 "
  }, username ? _react.default.createElement(Person, {
    username: username
  }) : 'pleas Login'), _react.default.createElement(_ShoppingCart.default, null), _react.default.createElement("button", {
    className: "btn btn-outline-primary",
    onClick: function onClick() {
      if (username) clickLogout();else clickLogin();
    }
  }, status === 'logined' ? '登出' : '登入')), _react.default.createElement(_LoginBox.default, null));
};

var mapStateToProps = function mapStateToProps(state) {
  var _state$login = state.login,
      username = _state$login.username,
      status = _state$login.status;
  return {
    username: username,
    status: status
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    clickLogin: function clickLogin() {
      dispatch(_action.openLoginBox);
    },
    clickLogout: function clickLogout() {
      dispatch(_action.logOut);
    }
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Header);

exports.default = _default;