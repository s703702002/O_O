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
        username: action.response.name,
        message: null,
      };
    case 'LOGIN_ERROR':
      return {
        status: 'loginerr',
        username: null,
        message: action.error,
      };
    case 'LOGIN_CANCEL':
      return {
        status: 'init',
        username: null,
        message: null,
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

export default login;
