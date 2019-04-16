"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _LightBox = _interopRequireDefault(require("../components/LightBox"));

var _action = require("../action");

var LightBoxWithConnect = function LightBoxWithConnect(_ref) {
  var lightBoxMessage = _ref.lightBoxMessage,
      removeLightBox = _ref.removeLightBoxMessage;

  if (lightBoxMessage.length > 0) {
    return _react.default.createElement(_LightBox.default, {
      message: lightBoxMessage,
      removeLightBox: removeLightBox
    });
  }

  return null;
};

var mapStateToProps = function mapStateToProps(state) {
  var lightBoxMessage = state.lightBoxMessage;
  return {
    lightBoxMessage: lightBoxMessage
  };
};

var _default = (0, _reactRedux.connect)(mapStateToProps, {
  removeLightBoxMessage: _action.removeLightBoxMessage
})(LightBoxWithConnect);

exports.default = _default;