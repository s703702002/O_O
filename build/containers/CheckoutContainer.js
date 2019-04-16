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

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _reactRouter = require("react-router");

var _reactRouterDom = require("react-router-dom");

var _Counter = _interopRequireDefault(require("../components/Counter"));

var _PushButton = _interopRequireDefault(require("../components/PushButton"));

var _OrderInfo = _interopRequireDefault(require("./OrderInfo"));

var _action = require("../action");

var imgUrl = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16576763d66%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16576763d66%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.8359375%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';

var Order = function Order(_ref) {
  var order = _ref.order,
      dispatch = _ref.dispatch;
  var product = order.product,
      count = order.count;
  var id = product.id,
      title = product.title,
      price = product.price,
      inventory = product.inventory;
  var total = price * count;
  return _react.default.createElement("div", {
    className: "row order"
  }, _react.default.createElement("div", {
    className: "col-3"
  }, _react.default.createElement(_reactRouterDom.Link, {
    to: "/".concat(id)
  }, _react.default.createElement("img", {
    className: "mw-100",
    src: imgUrl,
    alt: "test"
  }))), _react.default.createElement("div", {
    className: "col-3"
  }, _react.default.createElement("h3", null, _react.default.createElement(_reactRouterDom.Link, {
    to: "/".concat(id)
  }, title)), _react.default.createElement("p", null, "\u55AE\u50F9:", _react.default.createElement("span", {
    className: "text-danger mx-1"
  }, price), "\u5143")), _react.default.createElement("div", {
    className: "col-3"
  }, _react.default.createElement(_Counter.default, {
    min: 1,
    max: inventory,
    defaultValue: count,
    addClick: function addClick() {
      dispatch((0, _action.addToCart)(product, 1));
    },
    minusClick: function minusClick() {
      dispatch((0, _action.reduceCartItem)(id));
    },
    maxClick: function maxClick() {
      dispatch((0, _action.addLightBoxMessage)('此商品庫存不足'));
    },
    minClick: function minClick() {
      dispatch((0, _action.addLightBoxMessage)('最少數量為1'));
    }
  }), _react.default.createElement("div", {
    className: "mt-2"
  }, _react.default.createElement("small", {
    role: "button",
    tabIndex: "-1",
    className: "remove text-secondary cursor-pointer",
    onClick: function onClick() {
      dispatch((0, _action.removeShoppingCardItem)(id));
    }
  }, "\u79FB\u9664\u6B64\u5546\u54C1"))), _react.default.createElement("div", {
    className: "col-3"
  }, _react.default.createElement("p", {
    className: "font-weight-bold"
  }, "\u7E3D\u8A08:", _react.default.createElement("span", {
    className: "text-danger mx-1"
  }, total), "\u5143")));
};

var CheckOutContainer =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(CheckOutContainer, _Component);

  function CheckOutContainer() {
    (0, _classCallCheck2.default)(this, CheckOutContainer);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(CheckOutContainer).apply(this, arguments));
  }

  (0, _createClass2.default)(CheckOutContainer, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          shoppingCart = _this$props.shoppingCart,
          dispatch = _this$props.dispatch;
      return _react.default.createElement("div", {
        className: "container"
      }, _react.default.createElement("div", {
        className: "row"
      }, _react.default.createElement("div", {
        className: "col-9"
      }, shoppingCart.map(function (item) {
        return _react.default.createElement(Order, {
          order: item,
          key: item.product.id,
          dispatch: dispatch
        });
      })), _react.default.createElement("div", {
        className: "col-3"
      }, _react.default.createElement(_OrderInfo.default, null), _react.default.createElement(_PushButton.default, {
        text: "\u7E7C\u7E8C\u7D50\u5E33",
        className: "btn btn-outline-primary w-100 my-2",
        path: "/customerinfo"
      }), _react.default.createElement(_PushButton.default, {
        text: "\u7E7C\u7E8C\u9078\u8CFC",
        className: "btn btn-outline-info w-100",
        path: "/"
      }))));
    }
  }]);
  return CheckOutContainer;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  var shoppingCart = state.shoppingCart;
  return {
    shoppingCart: shoppingCart
  };
};

var _default = (0, _reactRouter.withRouter)((0, _reactRedux.connect)(mapStateToProps)(CheckOutContainer));

exports.default = _default;