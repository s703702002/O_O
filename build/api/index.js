"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getProductAPI = exports.getAllProductsAPI = exports.loginAPI = void 0;

var _utilis = require("../utilis");

var graphqlUri = "".concat(window.location.href, "graphql/");
var loginUri = "".concat(window.location.href, "login");
var productInfoFragment = "fragment productInfo on Product{\n  id\n  title\n  price\n  gender\n  inventory\n}";

function getUserInfo(memberId) {
  var query = "\n    query{\n      user(id: ".concat(memberId, "){\n        id\n        name\n        shoppings {\n          product {\n            ...productInfo\n          }\n          count\n        }\n      }\n    }\n    ").concat(productInfoFragment, "\n  ");
  return fetch(graphqlUri, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin',
    body: JSON.stringify({
      query: query
    })
  }).then(function (r) {
    return r.json();
  }).then(function (_ref) {
    var data = _ref.data;
    return data;
  });
}

var loginAPI = function loginAPI(_ref2) {
  var username = _ref2.username,
      password = _ref2.password;
  return (0, _utilis.delay)(1000).then(function () {
    return fetch(loginUri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        username: username,
        password: password
      })
    }).then(function (r) {
      return r.json();
    }).then(function (memberId) {
      if (!memberId) throw new Error('登入失敗, 請確認帳號或密碼');
      return memberId;
    }).then(getUserInfo);
  });
};

exports.loginAPI = loginAPI;

var getAllProductsAPI = function getAllProductsAPI() {
  var query = "\n    query {\n      products{\n        ...productInfo\n      }\n    }\n    ".concat(productInfoFragment, "\n  ");
  return fetch(graphqlUri, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin',
    body: JSON.stringify({
      query: query
    })
  }).then(function (r) {
    return r.json();
  }).then(function (_ref3) {
    var data = _ref3.data;
    return data;
  });
};

exports.getAllProductsAPI = getAllProductsAPI;

var getProductAPI = function getProductAPI(_ref4) {
  var productId = _ref4.productId;
  var query = "\n    query {\n      product(id: ".concat(productId, "){\n        ...productInfo\n      }\n    }\n    ").concat(productInfoFragment, "\n  ");
  return fetch(graphqlUri, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin',
    body: JSON.stringify({
      query: query
    })
  }).then(function (r) {
    return r.json();
  }).then(function (_ref5) {
    var data = _ref5.data;
    return data;
  });
};

exports.getProductAPI = getProductAPI;