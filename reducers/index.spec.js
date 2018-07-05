import { login, loginBoxOpen } from './index';
import {openLoginBox, closeLoginBox} from '../action';

test('登入reducer測試', () => {
  // 假設登入成功發的action
  const action1 = {
    type: 'LOGIN_SUCCESS',
    username: 'stanley',
  };

  // 假設登入失敗發的action
  const action2 = {
    type: 'LOGIN_ERROR',
    error: '帳號或密碼錯誤',
  };

  expect(login(undefined, action1)).toEqual({
    status: 'logined',
    username: 'stanley',
    message: null,
  });
  expect(login(undefined, action2)).toEqual({
    status: 'loginerr',
    username: null,
    message: action2.error,
  });
});


test('loginBox測試', () => {
  expect(loginBoxOpen(undefined, openLoginBox)).toBeTruthy();
  expect(loginBoxOpen(undefined, closeLoginBox)).toBeFalsy();
});

