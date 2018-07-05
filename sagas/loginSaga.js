import { takeEvery, call, put } from 'redux-saga/effects';
import { delay } from '../utilis';
import { loginAPI } from '../api';
import {
  loginSuccess,
  loginError,
  loginCancel,
  closeLoginBox,
} from '../action';

export function* loginFlow(action) {
  try {
    const response = yield call(loginAPI, {
      username: action.username,
      password: action.password,
    });
    yield put(loginSuccess(response));
    yield call(delay, 1000);
    yield put(closeLoginBox);
  } catch (error) {
    const errorMessage = error.toString();
    yield put(loginError(errorMessage));
  }
}

export function* watchRequestLogin() {
  yield takeEvery('LOGIN_REQUEST', loginFlow);
}
