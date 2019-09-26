import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import configureStore from './configureStore';

const preloadedState = () => {
  // Grab the state from a global variable injected into the server-generated HTML
  const serverPreloadState = window.__PRELOADED_STATE__;
  const loginStatus = JSON.parse(localStorage.getItem('loginStatus'));
  if (!loginStatus) return {};
  const { response } = loginStatus;
  return {
    ...serverPreloadState,
    login: {
      status: 'logined',
      username: response.name,
    },
    shoppingCart: response.shoppings,
  };
};

// const preloadedState = window.__PRELOADED_STATE__;

const store = configureStore(preloadedState());

// Allow the passed state to be garbage-collected
// delete window.__PRELOADED_STATE__;

ReactDOM.render(
  <App store={store} />,
  document.getElementById('root'),
);
