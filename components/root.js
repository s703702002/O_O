import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from '../containers/Header';
import App from './App';
import ProductPage from './ProductPage';
import Addfinished from '../containers/AddFinish';
import '../css/main.scss';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <div className="mb-5">
        <Header />
        <Route exact path="/" component={App} />
        <Route path="/:productId" component={ProductPage} />
        <Addfinished />
      </div>
    </Router>
  </Provider>
);

export default Root;
