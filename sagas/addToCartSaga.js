import { takeEvery, put, select, call, take } from 'redux-saga/effects';
import { delay } from '../utilis';
import {
  addToCart,
  showAddFinished,
  hiddenAddFinished,
  addLightBoxMessage,
  openLoginBox,
} from '../action';

const getLoginStatus = state => state.login.status;

function* addToCartFlow(action) {
  try {
    const loginStatus = yield select(getLoginStatus);
    const { product, count } = action;
    // if haven't login
    if (loginStatus === 'init' || loginStatus === 'loginerr') {
      yield put(addLightBoxMessage('請先登入'));
      // 等 user 關閉lightbox
      yield take('REMOVE_LIGHT_BOX_MESSAGE');
      yield put(openLoginBox);
    } else {
      yield put(addToCart(product, count));
      yield put(showAddFinished);
      yield call(delay, 2500);
      yield put(hiddenAddFinished);
    }
  } catch (err) {
    // do something
  } finally {
    // always do
  }
}

export default function* watchAddToCart() {
  yield takeEvery('ADD_TO_CART_REQUEST', addToCartFlow);
}
