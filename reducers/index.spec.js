import loginStaus from './index';

test('登入reducer測試', () => {
  expect(loginStaus({}, {
    type: 'LOGIN',
    username: 'stanley',
  })).toEqual({
    status: 'logined',
    username: 'stanley',
  });
});
