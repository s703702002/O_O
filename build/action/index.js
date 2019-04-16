"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeLightBoxMessage = exports.addLightBoxMessage = exports.hiddenAddFinished = exports.showAddFinished = exports.reduceCartItem = exports.removeShoppingCardItem = exports.addToCart = exports.addToCartRequest = exports.closeLoginBox = exports.openLoginBox = exports.getProductsError = exports.receiveProducts = exports.receiveProduct = exports.getProductsRequest = exports.getProductRequset = exports.logOut = exports.loginCancel = exports.loginError = exports.loginSuccess = exports.loginRequest = void 0;

var loginRequest = function loginRequest(_ref) {
  var username = _ref.username,
      password = _ref.password;
  return {
    type: 'LOGIN_REQUEST',
    username: username,
    password: password
  };
};

exports.loginRequest = loginRequest;

var loginSuccess = function loginSuccess(response) {
  return {
    type: 'LOGIN_SUCCESS',
    response: response
  };
};

exports.loginSuccess = loginSuccess;

var loginError = function loginError(error) {
  return {
    type: 'LOGIN_ERROR',
    error: error
  };
};

exports.loginError = loginError;
var loginCancel = {
  type: 'LOGIN_CANCEL'
};
exports.loginCancel = loginCancel;
var logOut = {
  type: 'LOG_OUT'
};
exports.logOut = logOut;

var getProductRequset = function getProductRequset(productId) {
  return {
    type: 'GET_PRODUCT_REQUEST',
    productId: productId
  };
};

exports.getProductRequset = getProductRequset;

var getProductsRequest = function getProductsRequest() {
  return {
    type: 'GET_PRODUCTS_REQUEST'
  };
};

exports.getProductsRequest = getProductsRequest;

var receiveProduct = function receiveProduct(response) {
  return {
    type: 'RECEIVE_PRODUCT',
    response: response
  };
};

exports.receiveProduct = receiveProduct;

var receiveProducts = function receiveProducts(response) {
  return {
    type: 'RECEIVE_PRODUCTS',
    response: response
  };
};

exports.receiveProducts = receiveProducts;

var getProductsError = function getProductsError(error) {
  return {
    type: 'GET_PRODUCTS_ERROR',
    error: error
  };
};

exports.getProductsError = getProductsError;
var openLoginBox = {
  type: 'OPEN_LOGIN_BOX'
};
exports.openLoginBox = openLoginBox;
var closeLoginBox = {
  type: 'CLOSE_LOGIN_BOX'
};
exports.closeLoginBox = closeLoginBox;

var addToCartRequest = function addToCartRequest(product, count) {
  return {
    type: 'ADD_TO_CART_REQUEST',
    product: product,
    count: count
  };
};

exports.addToCartRequest = addToCartRequest;

var addToCart = function addToCart(product, count) {
  return {
    type: 'ADD_TO_CART',
    product: product,
    count: count
  };
};

exports.addToCart = addToCart;

var removeShoppingCardItem = function removeShoppingCardItem(productId) {
  return {
    type: 'REMOVE_SHOPPING_CART_ITEM',
    productId: productId
  };
}; // 減少購物車內已購商品數量一個


exports.removeShoppingCardItem = removeShoppingCardItem;

var reduceCartItem = function reduceCartItem(productId) {
  return {
    type: 'REDUCE_CART_ITEM',
    productId: productId
  };
};

exports.reduceCartItem = reduceCartItem;
var showAddFinished = {
  type: 'SHOW_ADD_FINISHED'
};
exports.showAddFinished = showAddFinished;
var hiddenAddFinished = {
  type: 'HIDDEN_ADD_FINISHED'
};
exports.hiddenAddFinished = hiddenAddFinished;

var addLightBoxMessage = function addLightBoxMessage(message) {
  return {
    type: 'ADD_LIGHT_BOX_MESSAGE',
    message: message
  };
};

exports.addLightBoxMessage = addLightBoxMessage;

var removeLightBoxMessage = function removeLightBoxMessage() {
  return {
    type: 'REMOVE_LIGHT_BOX_MESSAGE'
  };
};

exports.removeLightBoxMessage = removeLightBoxMessage;