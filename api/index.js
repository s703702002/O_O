import { delay } from '../utilis';
import ProductsData from './products.json';

export const loginAPI = ({ username, password }) => delay(500).then(() => {
  if (username !== 'user1' || password !== '0000') {
    throw new Error('登入失敗, 請確認帳號或密碼');
  }
  return {
    username: 'stanley',
  };
});

export const getAllProductsAPI = () =>
  delay(1000).then(() => ProductsData);
