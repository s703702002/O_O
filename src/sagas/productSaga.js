import { takeEvery, call, put } from 'redux-saga/effects';
import { getProductAPI } from '../api';
import {
  receiveProduct,
} from '../action';

export function* productFlow(action) {
  try {
    const response = yield call(getProductAPI, {
      productId: action.productId,
    });
    yield put(receiveProduct(response.product));
  } catch (error) {
    // do some...
  }
}

export default function* watchRequsetProduct() {
  yield takeEvery('GET_PRODUCT_REQUEST', productFlow);
}
