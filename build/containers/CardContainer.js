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

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _reactRouter = require("react-router");

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Card = _interopRequireDefault(require("../components/Card"));

var _NoMatchCard = _interopRequireDefault(require("../components/NoMatchCard"));

var _PageController = _interopRequireDefault(require("../components/PageController"));

var _Aside = _interopRequireDefault(require("./Aside"));

var _action = require("../action");

var _utilis = require("../utilis");

// 計算pageController 需要的陣列
function calcRenderButton(nowpage, limit, totalLength) {
  var startPageNum = Math.floor(nowpage / limit); // 最後一組page要render幾個

  var last = totalLength % limit; // 當nowpage大於last代表已經到最後幾頁

  var lastIndex = totalLength - last;

  if (nowpage + 1 > lastIndex) {
    return (0, _toConsumableArray2.default)(new Array(last)).map(function (v, i) {
      return totalLength - i;
    }).reverse();
  }

  var arr = (0, _toConsumableArray2.default)(new Array(limit)).map(function (v, i) {
    return startPageNum * limit + i + 1;
  });
  arr.push('...');
  return arr;
}

var LoadingProducts = function LoadingProducts() {
  return _react.default.createElement("p", null, "\u6B63\u5728\u8F09\u5165\u7522\u54C1 \u8ACB\u7A0D\u5F8C!");
};

var CardContainer =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(CardContainer, _Component);

  function CardContainer() {
    (0, _classCallCheck2.default)(this, CardContainer);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(CardContainer).apply(this, arguments));
  }

  (0, _createClass2.default)(CardContainer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          dispatch = _this$props.dispatch,
          products = _this$props.products; // 若沒有產品, 發request

      if (!products.length) dispatch((0, _action.getProductsRequest)());
    }
  }, {
    key: "renderProducts",
    value: function renderProducts() {
      // 負責處理render的邏輯
      var products = this.props.products;
      var search = this.props.location.search; // 若沒有sort參數, 預設降冪排列

      if (!search.length) {
        search = '?sort=desc&page=0';
      }

      var queryObject = (0, _utilis.queryToObj)(search);
      var renderArray = products.slice(); // 價格排序

      if (queryObject.sort === 'desc') {
        renderArray.sort(function (a, b) {
          return b.price - a.price;
        });
      } else if (queryObject.sort === 'asc') {
        renderArray.sort(function (a, b) {
          return a.price - b.price;
        });
      } // 性別


      if (queryObject.gender === 'male') {
        renderArray = renderArray.filter(function (item) {
          return item.gender === 1;
        });
      } else if (queryObject.gender === 'female') {
        renderArray = renderArray.filter(function (item) {
          return item.gender === 0;
        });
      } // 價格區間


      if (queryObject.minPrice) {
        renderArray = renderArray.filter(function (item) {
          return item.price > Number(queryObject.minPrice);
        });
      }

      if (queryObject.maxPrice) {
        renderArray = renderArray.filter(function (item) {
          return item.price < Number(queryObject.maxPrice);
        });
      } // 若篩選後無符合的產品


      if (!renderArray.length) return _react.default.createElement(_NoMatchCard.default, null);
      return this.renderContent(renderArray, queryObject);
    }
  }, {
    key: "renderContent",
    value: function renderContent(renderArray, queryObject) {
      var _this$props2 = this.props,
          limit = _this$props2.limit,
          pageController = _this$props2.pageController;
      var page = queryObject.page; // 字串轉數字

      page = Number(page); // 計算該頁需要redner的產品

      var startIndex = page * limit;
      var overIndex = startIndex + limit;
      var limitRender = renderArray.slice(startIndex, overIndex); // 算出總共需要幾頁

      var pageLength = Math.ceil(renderArray.length / limit); // 計算pageController需要的陣列

      var renderButton = calcRenderButton(page, pageController, pageLength);
      if (!limitRender.length) return _react.default.createElement(_NoMatchCard.default, null);
      return _react.default.createElement(_react.default.Fragment, null, limitRender.map(function (item) {
        return _react.default.createElement(_Card.default, {
          key: item.id,
          item: item,
          col: 3
        });
      }), _react.default.createElement(_PageController.default, {
        activePage: page,
        maxPage: pageLength - 1,
        renderButton: renderButton
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var products = this.props.products;
      return _react.default.createElement("div", {
        className: "container"
      }, _react.default.createElement("div", {
        className: "row"
      }, _react.default.createElement(_Aside.default, {
        className: "col-2"
      }), _react.default.createElement("div", {
        className: "col-10"
      }, _react.default.createElement("div", {
        className: "row"
      }, !products.length ? _react.default.createElement(LoadingProducts, null) : this.renderProducts()))));
    }
  }]);
  return CardContainer;
}(_react.Component);

(0, _defineProperty2.default)(CardContainer, "propTypes", {
  limit: _propTypes.default.number,
  pageController: _propTypes.default.number
});
(0, _defineProperty2.default)(CardContainer, "defaultProps", {
  limit: 20,
  // 一頁要顯示幾筆資料
  pageController: 7
});

var mapStateToProps = function mapStateToProps(state) {
  var products = state.products.products;
  return {
    products: products
  };
};

var _default = (0, _reactRouter.withRouter)((0, _reactRedux.connect)(mapStateToProps)(CardContainer));

exports.default = _default;