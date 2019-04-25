import { call, put } from 'redux-saga/effects';
import { getProductAPI } from '../../api';
import {
  receiveProduct,
  getProductsError,
} from '../../action';
import { productFlow } from '../../sagas/productSaga';

test('product saga測試', () => {
  const res = {
    product: {
      "id": "0",
      "title": "商品0",
      "price": 6777,
      "gender": 0,
      "inventory": 84
    },
  };
  const productId = 0;
  const gen = productFlow({
    type: 'GET_PRODUCT_REQUEST',
    productId,
  });
  expect(call(getProductAPI, { productId })).toEqual(gen.next().value);
  expect(put(receiveProduct(res.product))).toEqual(gen.next(res).value);
  expect(gen.next().done).toBeTruthy();
});
