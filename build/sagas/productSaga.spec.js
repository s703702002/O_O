"use strict";

var _effects = require("redux-saga/effects");

var _api = require("../api");

var _action = require("../action");

var _productSaga = require("./productSaga");

test('product saga測試', function () {
  var res = {
    product: {
      "id": "0",
      "title": "商品0",
      "price": 6777,
      "gender": 0,
      "inventory": 84
    }
  };
  var productId = 0;
  var gen = (0, _productSaga.productFlow)({
    type: 'GET_PRODUCT_REQUEST',
    productId: productId
  });
  expect((0, _effects.call)(_api.getProductAPI, {
    productId: productId
  })).toEqual(gen.next().value);
  expect((0, _effects.put)((0, _action.receiveProduct)(res.product))).toEqual(gen.next(res).value);
  expect(gen.next().done).toBeTruthy();
});