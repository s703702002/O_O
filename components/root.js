import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Header from '../containers/Header';
import App from './App';
import ProductPage from './ProductPage';
import NotFound from './404';
import Addfinished from '../containers/AddFinish';
import LightBoxWithConnect from '../containers/LightBoxContainer';
import '../css/main.scss';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <div className="mb-5">
        <Header />
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/:productId" component={ProductPage} />
          <Route component={NotFound} />
        </Switch>
        <Addfinished />
        <LightBoxWithConnect />
      </div>
    </Router>
  </Provider>
);

export default Root;
