import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeShoppingCardItem } from '../action';

const CartItem = ({ order, dispatch }) => (
  <div className="in_shopping_cart">
    <Link to={`/${order.product.id}`}>
      {
        `${order.product.title}，售價:${order.product.price}元 x ${order.count}件`
      }
    </Link>
    <small
      role="button"
      tabIndex="-1"
      className="ml-2 remove"
      onClick={() => { dispatch(removeShoppingCardItem(order.product.id)); }}
    >
      移除
    </small>
  </div>
);

const CartContent = ({ shoppingCart, dispatch }) => (
  <React.Fragment>
    {
    shoppingCart.map(order => <CartItem order={order} dispatch={dispatch} key={order.product.id} />)
    }
    <Link to="/" className="text-danger font-weight-bold">
      立刻結帳
    </Link>
  </React.Fragment>
);

const Product = ({ shoppingCart, dispatch }) => (
  <div>
    <h4>我的購物車:</h4>
    {
      !shoppingCart.length ?
      '購物車裡面沒東西唷' :
      <CartContent shoppingCart={shoppingCart} dispatch={dispatch} />
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
