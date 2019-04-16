"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _Home = _interopRequireDefault(require("./pages/Home"));

var _ProductPage = _interopRequireDefault(require("./pages/ProductPage"));

var _CheckoutPage = _interopRequireDefault(require("./pages/CheckoutPage"));

var _ = _interopRequireDefault(require("./pages/404"));

var _CustomerInfoPage = _interopRequireDefault(require("./pages/CustomerInfoPage"));

var _CheckoutFinishPage = _interopRequireDefault(require("./pages/CheckoutFinishPage"));

var _AddFinish = _interopRequireDefault(require("./containers/AddFinish"));

var _LightBoxContainer = _interopRequireDefault(require("./containers/LightBoxContainer"));

// import './css/main.scss';
var Root = function Root(_ref) {
  var store = _ref.store,
      location = _ref.location,
      context = _ref.context;
  return _react.default.createElement(_reactRedux.Provider, {
    store: store
  }, _react.default.createElement(_reactRouterDom.StaticRouter, {
    location: location,
    context: context
  }, _react.default.createElement("div", {
    className: "mb-5"
  }, _react.default.createElement(_reactRouterDom.Switch, null, _react.default.createElement(_reactRouterDom.Route, {
    exact: true,
    path: "/",
    component: _Home.default
  }), _react.default.createElement(_reactRouterDom.Route, {
    path: "/checkout",
    render: function render() {
      if (store.getState().login.status === 'init') return _react.default.createElement(_reactRouterDom.Redirect, {
        to: "/"
      });
      return _react.default.createElement(_CheckoutPage.default, null);
    }
  }), _react.default.createElement(_reactRouterDom.Route, {
    path: "/customerinfo",
    render: function render() {
      if (store.getState().login.status === 'init') return _react.default.createElement(_reactRouterDom.Redirect, {
        to: "/"
      });
      return _react.default.createElement(_CustomerInfoPage.default, null);
    }
  }), _react.default.createElement(_reactRouterDom.Route, {
    path: "/checkoutfinish",
    component: _CheckoutFinishPage.default
  }), _react.default.createElement(_reactRouterDom.Route, {
    path: "/:productId",
    component: _ProductPage.default
  }), _react.default.createElement(_reactRouterDom.Route, {
    component: _.default
  })), _react.default.createElement(_AddFinish.default, null), _react.default.createElement(_LightBoxContainer.default, null))));
};

var _default = Root;
exports.default = _default;