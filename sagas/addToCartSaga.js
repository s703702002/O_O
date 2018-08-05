import { takeEvery, put, select } from 'redux-saga/effects';
import { openLoginBox, addToCart } from '../action';

const getLoginStatus = state => state.login.status;

function* addToCartFlow(action) {
  try {
    const loginStatus = yield select(getLoginStatus);
    const { product } = action;
    // if haven't login
    if (loginStatus === 'init') {
      yield put(openLoginBox);
    } else {
      yield put(addToCart(product));
    }
  } catch (err) {
    // do something
  }
}

export default function* watchAddToCart() {
  yield takeEvery('ADD_TO_CART_REQUEST', addToCartFlow);
}
