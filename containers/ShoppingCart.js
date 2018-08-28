import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeShoppingCardItem } from '../action';
import PushButton from '../components/PushButton';

const CartItem = ({ order, dispatch }) => (
  <div className="cart_item">
    <Link to={`/${order.product.id}`}>
      <h6 className="product_title">
        {`${order.product.title}，`}
        <span className="text-danger">{`$${order.product.price}`}</span>
      </h6>
    </Link>
    <span className="text-muted">{` x ${order.count}件`}</span>
    <small
      role="button"
      tabIndex="-1"
      className="ml-2 remove text-danger"
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
    <div className="goCheckout">
      <PushButton
        className="font-weight-bold btn btn-success"
        path="/checkout"
        text="立刻結帳"
      />
    </div>
  </React.Fragment>
);

const Product = ({ shoppingCart, dispatch }) => (
  <div>
    <h4>我的購物車</h4>
    {
      !shoppingCart.length ?
        <div className="empty_cart">
          <i className="material-icons">add_shopping_cart</i>
          <p>尚無商品</p>
        </div> :
        <CartContent shoppingCart={shoppingCart} dispatch={dispatch} />
    }
  </div>
);

const SoppingCart = ({ status, shoppingCart, dispatch }) => (
  <div className="shopping_cart mr-3">
    <i className="material-icons md-24">shopping_cart</i>
    <div className="cart_content box-shadow">
      {
        (status === 'logined') ?
          <Product shoppingCart={shoppingCart} dispatch={dispatch} /> :
          '請先登入!'
      }
    </div>
    {
      (status === 'logined' && shoppingCart.length > 0) ?
        <span className="count">{shoppingCart.length}</span>
        : null
    }
  </div>
);

const mapStateToProps = (state) => {
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
