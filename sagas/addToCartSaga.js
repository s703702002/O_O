import { takeEvery, put, select, call, all } from 'redux-saga/effects';
import { delay } from '../utilis';
import {
  openLoginBox,
  addToCart,
  showAddFinished,
  hiddenAddFinished,
  addLightBoxMessage,
  removeLightBoxMessage,
} from '../action';

const getLoginStatus = state => state.login.status;

function* openBox() {
  yield put(openLoginBox);
}

function* watchOpenBox() {
  yield takeEvery(removeLightBoxMessage(), openBox);
}

function* addToCartFlow(action) {
  try {
    const loginStatus = yield select(getLoginStatus);
    const { product, count } = action;
    // if haven't login
    if (loginStatus === 'init' || loginStatus === 'loginerr') {
      yield put(addLightBoxMessage('請先登入'));
      console.log('action', action);
    } else {
      yield put(addToCart(product, count));
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
