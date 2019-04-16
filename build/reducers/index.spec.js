"use strict";

var _index = require("./index");

var _action = require("../action");

test('登入reducer測試', function () {
  // 假設登入成功發的action
  var action1 = {
    type: 'LOGIN_SUCCESS',
    response: {
      name: 'stanley',
      shoppings: [1, 2]
    }
  }; // 假設登入失敗發的action

  var action2 = {
    type: 'LOGIN_ERROR',
    error: '帳號或密碼錯誤'
  };
  expect((0, _index.login)(undefined, action1)).toEqual({
    status: 'logined',
    username: 'stanley',
    message: null
  });
  expect((0, _index.login)(undefined, action2)).toEqual({
    status: 'loginerr',
    username: null,
    message: action2.error
  });
});
test('loginBox測試', function () {
  expect((0, _index.loginBoxOpen)(undefined, _action.openLoginBox)).toBeTruthy();
  expect((0, _index.loginBoxOpen)(undefined, _action.closeLoginBox)).toBeFalsy();
});
test('fetch產品測試', function () {
  var response = [{
    id: 1,
    title: '長褲-女',
    price: 500,
    inventory: 2,
    gender: 0
  }, {
    id: 2,
    title: '短褲-女',
    price: 100,
    inventory: 10,
    gender: 0
  }];
  var successAction = {
    type: 'RECEIVE_PRODUCTS',
    response: response
  };
  var errorAction = {
    type: 'GET_PRODUCTS_ERROR',
    error: 'api出現異常!'
  };
  expect((0, _index.products)(undefined, successAction)).toEqual({
    products: response,
    message: null
  });
  expect((0, _index.products)(undefined, errorAction)).toEqual({
    products: [],
    message: 'api出現異常!'
  });
});
test('fetch 單一產品測試', function () {
  var response = {
    id: 1,
    title: '長褲-女',
    price: 500,
    inventory: 2,
    gender: 0
  };
  var successAction = {
    type: 'RECEIVE_PRODUCT',
    response: response
  };
  var errorAction = {
    type: 'GET_PRODUCT_ERROR',
    error: 'api出現異常!'
  };
  expect((0, _index.productPage)(undefined, successAction)).toEqual({
    message: null,
    product: response
  });
  expect((0, _index.productPage)(undefined, errorAction)).toEqual({
    product: {},
    message: errorAction.error
  });
});
test('購物車reducer測試', function () {
  var response = {
    id: '1',
    name: 'stanley',
    shoppings: [{
      product: {
        id: '8',
        title: '長褲-男',
        price: 500,
        gender: 1,
        inventory: 200
      },
      count: 2
    }, {
      product: {
        id: '6',
        title: '拖鞋-女',
        price: 199,
        gender: 0,
        inventory: 10
      },
      count: 1
    }]
  };
  expect((0, _index.shoppingCart)(undefined, (0, _action.loginSuccess)(response))).toEqual(response.shoppings);
  expect((0, _index.shoppingCart)(response.shoppings, (0, _action.addToCart)({
    id: '8',
    title: '長褲-男',
    price: 500,
    gender: 1,
    inventory: 200
  }, 2))).toEqual([{
    product: {
      id: '8',
      title: '長褲-男',
      price: 500,
      gender: 1,
      inventory: 200
    },
    count: 4
  }, {
    product: {
      id: '6',
      title: '拖鞋-女',
      price: 199,
      gender: 0,
      inventory: 10
    },
    count: 1
  }]);
  expect((0, _index.shoppingCart)(response.shoppings, (0, _action.reduceCartItem)('8'))).toEqual([{
    product: {
      id: '8',
      title: '長褲-男',
      price: 500,
      gender: 1,
      inventory: 200
    },
    count: 1
  }, {
    product: {
      id: '6',
      title: '拖鞋-女',
      price: 199,
      gender: 0,
      inventory: 10
    },
    count: 1
  }]);
});