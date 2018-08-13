import { combineReducers } from 'redux';
import login from './login';
import products from './products';
import productPage from './product_page';
import shoppingCart from './shopping_cart';

const loginBoxOpen = (state = false, action) => {
  switch (action.type) {
    case 'OPEN_LOGIN_BOX':
      document.body.classList.add('no-scroll');
      return true;
    case 'CLOSE_LOGIN_BOX':
      document.body.classList.remove('no-scroll');
      return false;
    default:
      return state;
  }
};

const showAddFinished = (state = false, action) => {
  switch (action.type) {
    case 'SHOW_ADD_FINISHED':
      return true;
    case 'HIDDEN_ADD_FINISHED':
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
  showAddFinished,
});

export { login, loginBoxOpen, products, productPage };
export default AppStore;
