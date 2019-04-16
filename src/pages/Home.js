import React from 'react';
import { Provider } from 'react-redux';
import {
  Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Home from '../components/Home';
import ProductPage from './ProductPage';
import CheckoutPage from './CheckoutPage';
import NotFound from './404';
import CustomerInfoPage from './CustomerInfoPage';
import CheckoutFinishPage from './CheckoutFinishPage';
import Addfinished from '../containers/AddFinish';
import LightBoxWithConnect from '../containers/LightBoxContainer';
import '../css/main.scss';
import { history } from '../utilis';


const Root = ({ store }) => (
  <Provider store={store}>
    <Router history={history}>
      <div className="mb-5">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route
            path="/checkout"
            render={() => {
              if (store.getState().login.status === 'init') return <Redirect to="/" />;
              return <CheckoutPage />;
            }}
          />
          <Route
            path="/customerinfo"
            render={() => {
              if (store.getState().login.status === 'init') return <Redirect to="/" />;
              return <CustomerInfoPage />;
            }}
          />
          <Route path="/checkoutfinish" component={CheckoutFinishPage} />
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
