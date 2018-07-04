import { takeEvery, call, put } from 'redux-saga/effects';
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
    yield put(closeLoginBox);
  } catch (error) {
    yield put(loginError(error));
  }
}

export function* watchRequestLogin() {
  yield takeEvery('LOGIN_REQUEST', loginFlow);
}
