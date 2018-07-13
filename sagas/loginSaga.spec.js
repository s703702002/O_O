import { takeEvery, call, put, fork, cancel, take } from 'redux-saga/effects';
import { delay } from '../utilis';
import { loginAPI } from '../api';
import {
  loginSuccess,
  loginError,
  loginCancel,
  closeLoginBox,
} from '../action';

function* loginFlow(action) {
  try {
    const response = yield call(loginAPI, {
      username: action.username,
      password: action.password,
    });
    yield put(loginSuccess(response.user));
    yield call(delay, 1000);
    yield put(closeLoginBox);
  } catch (error) {
    const errorMessage = error.toString();
    yield put(loginError(errorMessage));
  }
}

test('login saga測試', () => {
  const user = {
    username: 'stanley',
    password: '0000',
  };
  const res = {
    id: '1',
    name: 'stanley',
    shoppings: [
      {
        id: '8',
        price: 500,
        title: '長褲-男',
        gender: 1,
        inventory: 200,
      },
      {
        id: '11',
        price: 2299,
        title: '長T-男',
        gender: 1,
        inventory: 0,
      },
      {
        id: '5',
        price: 299,
        title: '涼鞋-女',
        gender: 0,
        inventory: 0,
      },
    ],
  };
  const getRes = () => res;
  const gen = loginFlow({
    type: 'LOGIN_REQUEST',
    ...user,
  });
  expect(call(loginAPI, user)).toEqual(gen.next().value);
  expect(put(loginSuccess(res))).toEqual(gen.next(getRes()).value);
});
