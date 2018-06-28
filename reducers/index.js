import { combineReducers } from 'redux';

const loginStaus = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        status: 'logined',
        username: action.username,
      };
    default:
      return state;
  }
};

const AppStore = combineReducers({
  loginStaus,
});

export default AppStore;
