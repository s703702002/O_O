import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App';
import LoginBox from '../containers/LoginBox';
import '../css/main.scss';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <div>
        <Route path="/" component={App} />
        <LoginBox />
      </div>
    </Router>
  </Provider>
);

export default Root;
