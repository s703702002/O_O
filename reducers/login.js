import { clone } from '../utilis';

const login = (state = { status: 'init' }, action) => {
  const newShoppings = !state.shoppings ? null : clone(state.shoppings);
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        status: 'loading',
        username: null,
        message: null,
        shoppings: [],
      };
    case 'LOGIN_SUCCESS':
      return {
        status: 'logined',
        username: action.response.name,
        message: null,
        shoppings: action.response.shoppings,
      };
    case 'LOGIN_ERROR':
      return {
        status: 'loginerr',
        username: null,
        message: action.error,
        shoppings: [],
      };
    case 'LOGIN_CANCEL':
      return {
        state: 'init',
        username: null,
        message: null,
        shoppings: [],
      };
    case 'LOG_OUT':
      return {
        status: 'init',
        username: null,
        message: null,
        shoppings: [],
      };
    case 'ADD_TO_CART':
      newShoppings.push(action.product);
      return {
        ...state,
        shoppings: newShoppings,
      };
    default:
      return state;
  }
};

export default login;
