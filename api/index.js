import { delay } from '../utilis';

const graphqlUri = 'http://localhost:3000/graphql/';
const loginUri = 'http://localhost:3000/login';
const productInfoFragment = `fragment productInfo on Product{
  id
  title
  price
  gender
  inventory
}`;

function getUserInfo(memberId) {
  const query = `
    query{
      user(id: ${memberId}){
        id
        name
        shoppings {
          product {
            ...productInfo
          }
          count
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
}

export const loginAPI = ({ username, password }) => delay(1000).then(() => {
  return fetch(loginUri, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then(r => r.json())
    .then((memberId) => {
      if (!memberId) throw new Error('登入失敗, 請確認帳號或密碼');
      return memberId;
    })
    .then(getUserInfo);
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

export const getProductAPI = ({ productId }) => {
  const query = `
    query {
      product(id: ${productId}){
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
