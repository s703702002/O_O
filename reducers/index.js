import { combineReducers } from 'redux';
import login from './login';
import products from './products';
import productPage from './product_page';
import shoppingCart from './shopping_cart';

const loginBoxOpen = (state = false, action) => {
  switch (action.type) {
    case 'OPEN_LOGIN_BOX':
      return true;
    case 'CLOSE_LOGIN_BOX':
      return false;
    default:
      return state;
  }
};

const AppStore = combineReducers({
  login,
  loginBoxOpen,
  products,
  shoppingCart,
  productPage,
});

export { login, loginBoxOpen, products, productPage };
export default AppStore;
