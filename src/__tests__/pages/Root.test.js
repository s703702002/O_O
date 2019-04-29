import React from 'react';
import { render, unmountComponentAtNode } from "react-dom";
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux'
import {
  Route,
  Redirect,
  MemoryRouter,
} from 'react-router-dom';
import 'jest-dom/extend-expect';
import { loginSuccess } from '../../action';
import rootReducer from '../../reducers';
import Home from '../../pages/Home';
import ProductPage from '../../pages/ProductPage';
import CheckoutPage from '../../pages/CheckoutPage';
import NotFound from '../../pages/404';
import CustomerInfoPage from '../../pages/CustomerInfoPage';
import CheckoutFinishPage from '../../pages/CheckoutFinishPage';

const Root = ({ store }) => (
  <div>
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
  </div>
);

const mockProducts = [
  {id: "0", title: "商品0", price: 6777, gender: 0, inventory: 84},
  {id: "1", title: "商品1", price: 1615, gender: 1, inventory: 66},
  {id: "2", title: "商品2", price: 3359, gender: 1, inventory: 11},
  {id: "3", title: "商品3", price: 8453, gender: 0, inventory: 50},
  {id: "4", title: "商品4", price: 2081, gender: 1, inventory: 4},
  {id: "5", title: "商品5", price: 1066, gender: 0, inventory: 6},
  {id: "6", title: "商品6", price: 5013, gender: 0, inventory: 85},
  {id: "7", title: "商品7", price: 5827, gender: 1, inventory: 34},
  {id: "8", title: "商品8", price: 519, gender: 1, inventory: 92},
  {id: "9", title: "商品9", price: 3551, gender: 1, inventory: 91},
  {id: "10", title: "商品10", price: 2699, gender: 0, inventory: 35},
  {id: "11", title: "商品11", price: 7451, gender: 1, inventory: 52},
  {id: "12", title: "商品12", price: 2811, gender: 1, inventory: 6},
  {id: "13", title: "商品13", price: 3484, gender: 1, inventory: 38},
  {id: "14", title: "商品14", price: 2151, gender: 0, inventory: 8},
  {id: "15", title: "商品15", price: 7687, gender: 0, inventory: 52},
  {id: "16", title: "商品16", price: 5307, gender: 1, inventory: 54},
  {id: "17", title: "商品17", price: 8753, gender: 1, inventory: 24},
  {id: "18", title: "商品18", price: 6481, gender: 0, inventory: 92},
  {id: "19", title: "商品19", price: 5140, gender: 1, inventory: 84}
];

const mockLoginResponse = {
  id: "1", name: "stanley", shoppings: []
};

const renderTestSequence = ({
  initialEntries,
  steps
}, { initialState, store = createStore(rootReducer, initialState) } = {}) => {
  const div = document.createElement("div");

  class Assert extends React.Component {
    componentDidMount() {
      this.assert();
    }
    componentDidUpdate() {
      this.assert();
    }
    assert() {
      const nextStep = steps.shift();
      if (nextStep) {
        nextStep({ ...this.props, div, store });
      } else {
        unmountComponentAtNode(div);
      }
    }

    render() {
      return this.props.children;
    }
  }

  const AssertContainer = connect((state) => state)(Assert)

  class Test extends React.Component {
    render() {
      return (
        <Provider store={store}>
          <MemoryRouter initialEntries={initialEntries}>
            <Route render={props => {
              return  (
                <AssertContainer {...props}>
                  <Root store={store} />
                </AssertContainer>
              );
            }}/>
          </MemoryRouter>
        </Provider>
      );
    }
  }

  render(<Test />, div);
};

it("<Root/> Router Test", (done) => {
  renderTestSequence({
    initialEntries: ['/checkout'],
    steps: [
      ({ location }) => {
        expect(location.pathname).toEqual('/checkout');
      },
      ({ div, location, store }) => {
        expect(location.pathname).toEqual('/');
        expect(div.innerHTML).toMatch('商品1');
        store.dispatch(loginSuccess(mockLoginResponse));
      },
      ({ store, history }) => {
        expect(store.getState().login.status).toEqual('logined');
        history.push('/checkout');
      },
      ({ location, history }) => {
        expect(location.pathname).toEqual('/checkout');
        history.push('/customerinfo');
      },
      ({ history, div, location }) => {
        expect(location.pathname).toEqual('/customerinfo');
        expect(div.innerHTML).toMatch(mockLoginResponse.name);
        expect(div.innerHTML).toMatch('確認結帳');
        history.push("/100");
      },
      ({ div }) => {
        expect(div.innerHTML).toMatch('很抱歉，查無此頁面');
        done();
      }
    ]
  }, {
    initialState: {
      login: {
        status: 'init'
      },
      products: {
        products: mockProducts
      }
    }
  });
});
