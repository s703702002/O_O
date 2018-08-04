import React from 'react';
import { connect } from 'react-redux';

const Product = ({ shoppingCart }) => (
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
            `${item.title}, 售價:${item.price}元`
          }
        </div>
      ))
    }
  </div>
);

const SoppingCart = ({ status, shoppingCart }) => (
  <div className="shopping_cart mr-2">
    <i className="material-icons md-24">shopping_cart</i>
    <div className="cart_content box-shadow">
      {
        (status === 'init' || status === 'loginerr') ?
          '請先登入!' :
          <Product shoppingCart={shoppingCart} />
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

const mapDispatchToProps = (dispatch, ownProps) => {

};

export default connect(mapStateToProps)(SoppingCart);
