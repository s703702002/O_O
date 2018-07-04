export const loginRequest = ({ username, password }) => ({
  type: 'LOGIN_REQUEST',
  username,
  password,
});

export const loginSuccess = response => ({
  type: 'LOGIN_SUCCESS',
  response,
});

export const loginError = error => ({
  type: 'LOGIN_ERROR',
  error,
});

export const loginCancel = () => ({
  type: 'LOGIN_CANCEL',
});

export const openLoginBox = {
  type: 'OPEN_LOGIN_BOX',
};

export const closeLoginBox = {
  type: 'CLOSE_LOGIN_BOX',
};

export const logOut = {
  type: 'LOG_OUT',
};
