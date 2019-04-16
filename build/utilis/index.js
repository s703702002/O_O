"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serialize = serialize;
exports.queryToObj = queryToObj;
exports.getRandomItem = getRandomItem;
exports.pushHistory = pushHistory;
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function get() {
    return _ClickOutside.default;
  }
});
exports.clone = exports.delay = void 0;

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _ClickOutside = _interopRequireDefault(require("./ClickOutside"));

var clone = function clone(target) {
  return JSON.parse(JSON.stringify(target));
};

exports.clone = clone;

function serialize(obj) {
  var str = Object.entries(obj).map(function (item) {
    return "".concat(encodeURIComponent(item[0]), "=").concat(encodeURIComponent(item[1]));
  });
  return str.join('&');
}

function queryToObj(queryString) {
  var handleQs = decodeURI(queryString.substring(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"');
  return JSON.parse("{\"".concat(handleQs, "\"}"));
}

function getRandomItem(arr, amount) {
  if (!arr.length) return null;
  var copy = arr.slice();
  var result = [];

  for (var i = 0; i < amount; i++) {
    var initLenght = copy.length;
    var random = Math.floor(Math.random() * initLenght);
    var takeItem = copy.splice(random, 1);
    result.push.apply(result, (0, _toConsumableArray2.default)(takeItem));
  }

  return result;
}

function pushHistory(queryObj, history) {
  var search = history.location.search;
  var page = queryObj.page;

  if (!search.length) {
    search = '?sort=desc';
  }

  var queryObject = queryToObj(search);
  var newQueryObj = (0, _objectSpread2.default)({}, queryObject, queryObj);
  if (newQueryObj.minPrice === '') delete newQueryObj.minPrice;
  if (newQueryObj.maxPrice === '') delete newQueryObj.maxPrice;

  if (page !== undefined) {
    // 如果有變更page就不reset
    newQueryObj.page = page;
  } else {
    // 每次變更條件都reset頁數回0
    newQueryObj.page = 0;
  }

  var newQuery = "?".concat(serialize(newQueryObj));
  history.push(newQuery);
}

var delay = function delay(ms) {
  return new Promise(function (resolve) {
    return setTimeout(resolve, ms);
  });
};

exports.delay = delay;