const delay = ms =>
  new Promise(resolve => setTimeout(resolve, ms));

export const loginAPI = (account, password) => {
  return delay(500).then(() => {
    if (account !== 'user1' || password !== '0000') {
      throw new Error('登入失敗, 請確認帳號或密碼');
    }
    return {
      username: 'stanley',
    };
  });
};

