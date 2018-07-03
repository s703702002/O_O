import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App';
import LoginBox from '../containers/LoginBox';
import '../css/main.scss';

const Root = ({ store }) => (
  <Provider store={store}>
    <div>
      <App />
      <LoginBox />
    </div>
  </Provider>
);

export default Root;
