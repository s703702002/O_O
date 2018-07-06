import { takeEvery, call, put } from 'redux-saga/effects';
import { delay } from '../utilis';
import { getAllProductsAPI } from '../api';
import {
  receiveProducts,
  getProductsError,
} from '../action';

function* productsFlow(action) {
  try {
    const response = yield call(getAllProductsAPI);
    yield put(receiveProducts(response));
  } catch (error) {
    yield put(getProductsError(error));
  }
}

export default function* watchRequsetProducts() {
  yield takeEvery('GET_PRODUCTS_REQUEST', productsFlow);
}
