import { combineReducers } from 'redux';

const login = (state = { status: 'init' }, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return {
        status: 'loading',
        username: null,
        message: null,
      };
    case 'LOGIN_SUCCESS':
      return {
        status: 'logined',
        username: action.username,
        message: null,
      };
    case 'LOGIN_ERROR':
      return {
        status: 'loginerr',
        username: null,
        message: action.err,
      };
    default:
      return state;
  }
};

const AppStore = combineReducers({
  login,
});

export { login };
export default AppStore;
