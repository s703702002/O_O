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

export const loginCancel = {
  type: 'LOGIN_CANCEL',
};

export const getProductRequset = productId => ({
  type: 'GET_PRODUCT_REQUEST',
  productId,
});

export const getProductsRequest = () => ({
  type: 'GET_PRODUCTS_REQUEST',
});

export const receiveProduct = response => ({
  type: 'RECEIVE_PRODUCT',
  response,
});

export const receiveProducts = response => ({
  type: 'RECEIVE_PRODUCTS',
  response,
});

export const getProductsError = error => ({
  type: 'GET_PRODUCTS_ERROR',
  error,
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

export const addToCartRequest = product => ({
  type: 'ADD_TO_CART_REQUEST',
  product,
});

export const addToCart = product => ({
  type: 'ADD_TO_CART',
  product,
});

export const showAddFinished = {
  type: 'SHOW_ADD_FINISHED',
};

export const hiddenAddFinished = {
  type: 'HIDDEN_ADD_FINISHED',
};
