import React from 'react';
import { Provider } from 'react-redux';
import {
  StaticRouter,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Home from './components/Home';
import ProductPage from './pages/ProductPage';
import CheckoutPage from './pages/CheckoutPage';
import NotFound from './pages/404';
import CustomerInfoPage from './pages/CustomerInfoPage';
import CheckoutFinishPage from './pages/CheckoutFinishPage';
import Addfinished from './containers/AddFinish';
import LightBoxWithConnect from './containers/LightBoxContainer';
// import './css/main.scss';
// import { history } from './utilis';

// console.log('history', history);

const Root = ({ store }) => (
  <Provider store={store}>
    <StaticRouter location={'http://localhost'} context={{}}>
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
    </StaticRouter>
  </Provider>
);

export default Root;
