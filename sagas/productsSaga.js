import { takeLatest, call, put } from 'redux-saga/effects';
import { getAllProductsAPI } from '../api';
import {
  receiveProducts,
  getProductsError,
} from '../action';

function* productsFlow(action) {
  try {
    const response = yield call(getAllProductsAPI);
    yield put(receiveProducts(response.products));
  } catch (error) {
    yield put(getProductsError(error));
  }
}

export default function* watchRequsetProducts() {
  yield takeLatest('GET_PRODUCTS_REQUEST', productsFlow);
}
