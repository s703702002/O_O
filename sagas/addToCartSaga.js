import { takeEvery, put, select, call } from 'redux-saga/effects';
import { delay } from '../utilis';
import {
  openLoginBox,
  addToCart,
  showAddFinished,
  hiddenAddFinished,
} from '../action';

const getLoginStatus = state => state.login.status;

function* addToCartFlow(action) {
  try {
    const loginStatus = yield select(getLoginStatus);
    const { product } = action;
    // if haven't login
    if (loginStatus === 'init' || loginStatus === 'loginerr') {
      yield put(openLoginBox);
    } else {
      yield put(addToCart(product));
      yield put(showAddFinished);
      yield call(delay, 2500);
      yield put(hiddenAddFinished);
    }
  } catch (err) {
    // do something
  }
}

export default function* watchAddToCart() {
  yield takeEvery('ADD_TO_CART_REQUEST', addToCartFlow);
}
