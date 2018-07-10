import { delay } from '../utilis';

const graphqlUri = 'http://10.30.3.75:3000/';
const productInfoFragment = `fragment productInfo on Product{
  id
  title
  price
  gender
  inventory
}`;

export const loginAPI = ({ username, password }) => delay(500).then(() => {
  if (username !== 'stanley' || password !== '0000') {
    throw new Error('登入失敗, 請確認帳號或密碼');
  }

  const id = 1;
  const query = `
    query{
      user(id: ${id}){
        id
        name
        shoppings {
          ...productInfo
        }
      }
    }
    ${productInfoFragment}
  `;

  return fetch(graphqlUri, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
    }),
  }).then(r => r.json())
    .then(({ data }) => data);
});

export const getAllProductsAPI = () => {
  const query = `
    query {
      products{
        ...productInfo
      }
    }
    ${productInfoFragment}
  `;
  return fetch(graphqlUri, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  }).then(r => r.json())
    .then(({ data }) => data);
};
