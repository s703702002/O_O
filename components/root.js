import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from '../containers/Header';
import App from './App';
import ProductPage from './ProductPage';
import '../css/main.scss';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <div>
        <Header />
        <Route exact path="/" component={App} />
        <Route path="/:productId" component={ProductPage} />
      </div>
    </Router>
  </Provider>
);

export default Root;
