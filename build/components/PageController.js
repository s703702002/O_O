"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouter = require("react-router");

var _classnames = _interopRequireDefault(require("classnames"));

var _utilis = require("../utilis");

function goPage(pageNum, history) {
  var queryObj = {
    page: pageNum
  };
  (0, _utilis.pushHistory)(queryObj, history);
}

var PageController = function PageController(_ref) {
  var activePage = _ref.activePage,
      maxPage = _ref.maxPage,
      renderButton = _ref.renderButton,
      history = _ref.history;
  return _react.default.createElement("div", {
    className: "col-12 page_controller"
  }, _react.default.createElement("button", {
    className: "material-icons",
    onClick: function onClick() {
      if (activePage === 0) return;
      goPage(activePage - 1, history);
    }
  }, "keyboard_arrow_left"), renderButton.map(function (v) {
    if (v === '...') return _react.default.createElement("span", {
      key: v
    }, v);
    return _react.default.createElement("button", {
      key: v,
      className: (0, _classnames.default)('page_num', {
        active: v - 1 === activePage
      }),
      onClick: function onClick() {
        goPage(v - 1, history);
      }
    }, v);
  }), _react.default.createElement("button", {
    className: "material-icons",
    onClick: function onClick() {
      if (activePage === maxPage) return;
      goPage(activePage + 1, history);
    }
  }, "keyboard_arrow_right"));
};

var _default = (0, _reactRouter.withRouter)(PageController);

exports.default = _default;