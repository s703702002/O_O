import { loginAPI } from './index';

test('登入api測試', () => {
  expect(loginAPI('user1', '0000')).toEqual({
    username: 'stanley',
  });
});

