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

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _reactRouter = require("react-router");

var _action = require("../action");

var _utilis = require("../utilis");

var _ProductInfo = _interopRequireDefault(require("../components/ProductInfo"));

var _Card = _interopRequireDefault(require("../components/Card"));

var _Counter = _interopRequireDefault(require("../components/Counter"));

var _ = _interopRequireDefault(require("../pages/404"));

var _PushButton = _interopRequireDefault(require("../components/PushButton"));

var LoadProduct = function LoadProduct() {
  return _react.default.createElement("p", null, "\u6B63\u5728\u8F09\u5165\u7522\u54C1");
};

var ProductContainer =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(ProductContainer, _Component);

  function ProductContainer(props) {
    var _this;

    (0, _classCallCheck2.default)(this, ProductContainer);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(ProductContainer).call(this, props));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)(_this), "addToCart", function (product) {
      var dispatch = _this.props.dispatch;
      var count = _this.counter.state.count; // 若選購數量為0

      if (count === 0) return dispatch((0, _action.addLightBoxMessage)('請選擇選購數量'));
      return dispatch((0, _action.addToCartRequest)(product, count));
    });
    _this.counter = null;
    return _this;
  }

  (0, _createClass2.default)(ProductContainer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          dispatch = _this$props.dispatch,
          products = _this$props.products;
      if (!products.length) dispatch((0, _action.getProductsRequest)());
    } // 加入購物車

  }, {
    key: "renderAside",
    value: function renderAside(product) {
      var _this2 = this;

      var dispatch = this.props.dispatch;
      var price = product.price,
          inventory = product.inventory;

      var CounterWithMax = function CounterWithMax(_ref) {
        var innerRef = _ref.innerRef;
        return _react.default.createElement(_Counter.default, {
          max: inventory,
          ref: innerRef,
          maxClick: function maxClick() {
            dispatch((0, _action.addLightBoxMessage)('此商品庫存不足'));
          }
        });
      };

      return _react.default.createElement("aside", {
        className: "col-4"
      }, _react.default.createElement("h3", null, _react.default.createElement("span", {
        className: "sub-title"
      }, "\u552E\u50F9:"), _react.default.createElement("strong", {
        className: "text-danger"
      }, "$".concat(price))), _react.default.createElement("div", {
        className: "mb-2"
      }, _react.default.createElement("span", {
        className: "sub-title"
      }, "\u5EAB\u5B58:"), _react.default.createElement("span", null, inventory, "\u4EF6")), _react.default.createElement("div", {
        className: "d-flex align-items-center mb-2"
      }, _react.default.createElement("span", {
        className: "sub-title"
      }, "\u9078\u8CFC\u6578\u91CF:"), _react.default.createElement(CounterWithMax, {
        innerRef: function innerRef(e) {
          _this2.counter = e;
        }
      })), _react.default.createElement("button", {
        className: "btn btn-outline-primary w-100 mb-2",
        onClick: function onClick() {
          _this2.addToCart(product);
        }
      }, "\u52A0\u5165\u8CFC\u7269\u8ECA"), _react.default.createElement(_PushButton.default, {
        className: "btn btn-outline-info w-100 mb-2",
        path: "/",
        text: "\u7E7C\u7E8C\u9078\u8CFC"
      }));
    }
  }, {
    key: "renderOther",
    value: function renderOther(product) {
      var products = this.props.products;
      var id = product.id;
      var otherProducts = products.filter(function (item) {
        return item.id !== id;
      });
      var renderList = (0, _utilis.getRandomItem)(otherProducts, 12);
      if (!renderList) return null;
      return _react.default.createElement("section", {
        className: "col-12"
      }, _react.default.createElement("h4", null, "\u5176\u4ED6\u5546\u54C1"), _react.default.createElement("div", {
        className: "row"
      }, renderList.map(function (item) {
        return _react.default.createElement(_Card.default, {
          key: item.id,
          item: item,
          col: 2
        });
      })));
    }
  }, {
    key: "renderContent",
    value: function renderContent(product) {
      if (!product) return _react.default.createElement(_.default, null);
      return _react.default.createElement(_react.default.Fragment, null, _react.default.createElement(_ProductInfo.default, {
        product: product
      }), this.renderAside(product), this.renderOther(product));
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          products = _this$props2.products,
          productId = _this$props2.match.params.productId;
      var product = products.filter(function (item) {
        return item.id === productId;
      })[0];
      return _react.default.createElement("div", {
        className: "container"
      }, _react.default.createElement("div", {
        className: "row"
      }, !products.length ? _react.default.createElement(LoadProduct, null) : this.renderContent(product)));
    }
  }]);
  return ProductContainer;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  var products = state.products.products;
  return {
    products: products
  };
};

var _default = (0, _reactRouter.withRouter)((0, _reactRedux.connect)(mapStateToProps)(ProductContainer));

exports.default = _default;