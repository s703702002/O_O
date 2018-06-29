import { loginAPI } from '../api';

const loginRequest = () => ({
  type: 'LOGIN_REQUEST',
});

const loginSuccess = username => ({
  type: 'LOGIN_SUCCESS',
  username,
});

const loginError = err => ({
  type: 'LOGIN_ERROR',
  err,
});

export const loginFlow = (account, password) => (dispatch, getState) => {
  dispatch(loginRequest());
  loginAPI(account, password)
    .then((response) => {
      dispatch(loginSuccess(response.username));
    })
    .catch((error) => {
      dispatch(loginError(error));
    });
};
