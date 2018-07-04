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
        username: action.response.username,
        message: null,
      };
    case 'LOGIN_ERROR':
      return {
        status: 'loginerr',
        username: null,
        message: action.error,
      };
    case 'LOG_OUT':
      return {
        status: 'init',
        username: null,
        message: null,
      };
    default:
      return state;
  }
};

const loginBoxOpen = (state = false, action) => {
  switch (action.type) {
    case 'OPEN_LOGIN_BOX':
      return true;
    case 'CLOSE_LOGIN_BOX':
      return false;
    default:
      return state;
  }
}

const AppStore = combineReducers({
  login,
  loginBoxOpen,
});

export { login, loginBoxOpen };
export default AppStore;
