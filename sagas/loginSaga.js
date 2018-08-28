import { takeEvery, call, put, fork, cancel, cancelled, take } from 'redux-saga/effects';
import { delay } from '../utilis';
import { loginAPI } from '../api';
import {
  loginSuccess,
  loginError,
  closeLoginBox,
} from '../action';

function* authorize({ username, password }) {
  try {
    const response = yield call(loginAPI, {
      username,
      password,
    });
    const successResponse = yield put(loginSuccess(response.user));
    // 如果登入成功 把response存在localStorage 方便下次可以直接取用
    localStorage.setItem('loginStatus', JSON.stringify(successResponse));
    yield call(delay, 1000);
    yield put(closeLoginBox);
  } catch (error) {
    const errorMessage = error.toString();
    yield put(loginError(errorMessage));
  } finally {
    // if (yield cancelled()) {
    //   console.log('登入被取消');
    // } else {
    //   console.log('登入成功了!');
    // }
  }
}

function* loginFlow(action) {
  const task = yield fork(authorize, { username: action.username, password: action.password });
  yield take('LOGIN_CANCEL');
  yield cancel(task);
}

export default function* watchRequestLogin() {
  yield takeEvery('LOGIN_REQUEST', loginFlow);
}
