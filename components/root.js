import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App';
import LoginBox from '../containers/LoginBox';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <div>
        <Route path="/" component={App} />
        <Route path="/login" component={LoginBox} />
      </div>
    </Router>
  </Provider>
);

export default Root;
