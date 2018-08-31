import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/Root';
import configureStore from './configureStore';

const preloadedState = () => {
  const loginStatus = JSON.parse(localStorage.getItem('loginStatus'));
  if (!loginStatus) return {};
  const { response } = loginStatus;
  return {
    login: {
      status: 'logined',
      username: response.name,
    },
    shoppingCart: response.shoppings,
  };
};

const store = configureStore(preloadedState());

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root'),
);
