import { takeEvery, call, put, fork, cancel, take } from 'redux-saga/effects';
import { delay } from '../utilis';
import { loginAPI } from '../api';
import {
  loginSuccess,
  loginError,
  loginCancel,
  closeLoginBox,
} from '../action';

function* authorize({ username, password }) {
  try {
    const response = yield call(loginAPI, {
      username,
      password,
    });
    yield put(loginSuccess(response.user));
    yield call(delay, 1000);
    yield put(closeLoginBox);
  } catch (error) {
    const errorMessage = error.toString();
    yield put(loginError(errorMessage));
  }
}

function* loginFlow(action) {
  const task = yield fork(authorize, { username: action.username, password: action.password });
  yield take(loginCancel);
  yield cancel(task);
}

