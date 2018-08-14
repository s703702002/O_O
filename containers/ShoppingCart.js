import React from 'react';
import { connect } from 'react-redux';
import { removeShoppingCardItem } from '../action';

const Product = ({ shoppingCart, dispatch }) => (
  <div>
    <h4>我的購物車:</h4>
    {
      !shoppingCart.length ?
      '購物車裡面沒東西唷' :
      shoppingCart.map(item => (
        <div
          className="in_shopping_cart"
          key={item.id}
        >
          {
            `${item.title}，售價:${item.price}元`
          }
          <small
            role="button"
            tabIndex="-1"
            className="ml-2 remove"
            onClick={() => { dispatch(removeShoppingCardItem(item.id)); }}
          >
            移除
          </small>
        </div>
      ))
    }
  </div>
);

const SoppingCart = ({ status, shoppingCart, dispatch }) => (
  <div className="shopping_cart mr-2">
    <i className="material-icons md-24">shopping_cart</i>
    <div className="cart_content box-shadow">
      {
        (status === 'init' || status === 'loginerr') ?
          '請先登入!' :
          <Product shoppingCart={shoppingCart} dispatch={dispatch} />
      }
    </div>
  </div>
);

const mapStateToProps = (state, ownProps) => {
  const {
    shoppingCart,
    login: { status },
  } = state;
  return {
    status,
    shoppingCart,
  };
};

export default connect(mapStateToProps)(SoppingCart);
