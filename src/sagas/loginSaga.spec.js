import { takeEvery, call, put, fork, cancel, take } from 'redux-saga/effects';
import { delay } from '../utilis';
import { loginAPI } from '../api';
import {
  loginSuccess,
  loginError,
  loginCancel,
  closeLoginBox,
} from '../action';
import {
  loginFlow,
  authorize,
} from './loginSaga';

const user = {
  username: 'stanley',
  password: '0000',
};

test('login flow測試', () => {
  const gen = loginFlow({
    type: 'LOGIN_REQUEST',
    ...user,
  });

  const task = gen.next().value;
  expect(fork(authorize, user)).toEqual(task);
  expect(take('LOGIN_CANCEL')).toEqual(gen.next().value);
});

test('authorize測試', () => {
  const res = {
    user: {
      id: '1',
      name: 'stanley',
      shoppings: [
        {
          product: {
            id: '8',
            title: '商品8',
            price: 519,
            gender: 1,
            inventory: 92,
          },
          count: 2,
        },
        {
          product: {
            id: '6',
            title: '商品6',
            price: 5013,
            gender: 0,
            inventory: 85,
          },
          count: 1,
        },
      ],
    },
  };
  const gen = authorize(user);
  expect(call(loginAPI, user)).toEqual(gen.next().value);
  expect(put(loginSuccess(res.user))).toEqual(gen.next(res).value);
  expect(call(delay, 1000)).toEqual(gen.next().value);
  expect(put(closeLoginBox)).toEqual(gen.next().value);
  expect(true).toEqual(gen.next().done);
});
