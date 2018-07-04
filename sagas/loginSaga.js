import { takeEvery, call, put } from 'redux-saga/effects';
import { loginAPI } from '../api';


export function* loginFlow(action) {
  try {
    const response = yield call(
      loginAPI,
      action.username,
      action.password,
    );
    yield put({
      type: 'LOGIN_SUCCESS',
      username: response,
    });
  } catch (error) {
    yield put({
      type: 'LOGIN_ERROR',
      message: error,
    });
  }
}

export function* watchRequestLogin() {
  yield takeEvery({
    type: 'LOGIN_REUQEST',
  }, loginFlow);
}
