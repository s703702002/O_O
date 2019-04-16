"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _effects = require("redux-saga/effects");

var _utilis = require("../utilis");

var _api = require("../api");

var _action = require("../action");

var _loginSaga = require("./loginSaga");

var user = {
  username: 'stanley',
  password: '0000'
};
test('login flow測試', function () {
  var gen = (0, _loginSaga.loginFlow)((0, _objectSpread2.default)({
    type: 'LOGIN_REQUEST'
  }, user));
  var task = gen.next().value;
  expect((0, _effects.fork)(_loginSaga.authorize, user)).toEqual(task);
  expect((0, _effects.take)('LOGIN_CANCEL')).toEqual(gen.next().value);
});
test('authorize測試', function () {
  var res = {
    user: {
      id: '1',
      name: 'stanley',
      shoppings: [{
        product: {
          id: '8',
          title: '商品8',
          price: 519,
          gender: 1,
          inventory: 92
        },
        count: 2
      }, {
        product: {
          id: '6',
          title: '商品6',
          price: 5013,
          gender: 0,
          inventory: 85
        },
        count: 1
      }]
    }
  };
  var gen = (0, _loginSaga.authorize)(user);
  expect((0, _effects.call)(_api.loginAPI, user)).toEqual(gen.next().value);
  expect((0, _effects.put)((0, _action.loginSuccess)(res.user))).toEqual(gen.next(res).value);
  expect((0, _effects.call)(_utilis.delay, 1000)).toEqual(gen.next().value);
  expect((0, _effects.put)(_action.closeLoginBox)).toEqual(gen.next().value);
  expect(true).toEqual(gen.next().done);
});