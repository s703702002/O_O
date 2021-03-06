import {
  login,
  loginBoxOpen,
  products,
  productPage,
  shoppingCart,
} from '../../src/reducers';
import {
  openLoginBox,
  closeLoginBox,
  loginSuccess,
  addToCart,
  reduceCartItem,
} from '../../src/action';

test('登入reducer測試', () => {
  // 假設登入成功發的action
  const action1 = {
    type: 'LOGIN_SUCCESS',
    response: {
      name: 'stanley',
      shoppings: [1, 2],
    },
  };

  // 假設登入失敗發的action
  const action2 = {
    type: 'LOGIN_ERROR',
    error: '帳號或密碼錯誤',
  };

  expect(login(undefined, action1)).toEqual({
    status: 'logined',
    username: 'stanley',
    message: null,
  });
  expect(login(undefined, action2)).toEqual({
    status: 'loginerr',
    username: null,
    message: action2.error,
  });
});


test('loginBox測試', () => {
  expect(loginBoxOpen(undefined, openLoginBox)).toBeTruthy();
  expect(loginBoxOpen(undefined, closeLoginBox)).toBeFalsy();
});

test('fetch產品測試', () => {
  const response = [{
    id: 1, title: '長褲-女', price: 500, inventory: 2, gender: 0,
  },
  {
    id: 2, title: '短褲-女', price: 100, inventory: 10, gender: 0,
  }];

  const successAction = {
    type: 'RECEIVE_PRODUCTS',
    response,
  };

  const errorAction = {
    type: 'GET_PRODUCTS_ERROR',
    error: 'api出現異常!',
  };

  expect(products(undefined, successAction)).toEqual({
    products: response,
    message: null,
  });

  expect(products(undefined, errorAction)).toEqual({
    products: [],
    message: 'api出現異常!',
  });
});


test('fetch 單一產品測試', () => {
  const response = {
    id: 1, title: '長褲-女', price: 500, inventory: 2, gender: 0,
  };
  const successAction = {
    type: 'RECEIVE_PRODUCT',
    response,
  };

  const errorAction = {
    type: 'GET_PRODUCT_ERROR',
    error: 'api出現異常!',
  };
  expect(productPage(undefined, successAction)).toEqual({
    message: null,
    product: response,
  });

  expect(productPage(undefined, errorAction)).toEqual({
    product: {},
    message: errorAction.error,
  });
});

test('購物車reducer測試', () => {
  const response = {
    id: '1',
    name: 'stanley',
    shoppings: [
      {
        product: {
          id: '8',
          title: '長褲-男',
          price: 500,
          gender: 1,
          inventory: 200,
        },
        count: 2,
      },
      {
        product: {
          id: '6',
          title: '拖鞋-女',
          price: 199,
          gender: 0,
          inventory: 10,
        },
        count: 1,
      },
    ],
  };

  expect(shoppingCart(undefined, loginSuccess(response))).toEqual(response.shoppings);
  expect(shoppingCart(response.shoppings, addToCart({
    id: '8',
    title: '長褲-男',
    price: 500,
    gender: 1,
    inventory: 200,
  }, 2))).toEqual([
    {
      product: {
        id: '8',
        title: '長褲-男',
        price: 500,
        gender: 1,
        inventory: 200,
      },
      count: 4,
    },
    {
      product: {
        id: '6',
        title: '拖鞋-女',
        price: 199,
        gender: 0,
        inventory: 10,
      },
      count: 1,
    },
  ]);

  expect(shoppingCart(response.shoppings, reduceCartItem('8'))).toEqual([
    {
      product: {
        id: '8',
        title: '長褲-男',
        price: 500,
        gender: 1,
        inventory: 200,
      },
      count: 1,
    },
    {
      product: {
        id: '6',
        title: '拖鞋-女',
        price: 199,
        gender: 0,
        inventory: 10,
      },
      count: 1,
    },
  ]);

});
