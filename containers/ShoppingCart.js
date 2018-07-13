import React from 'react';
import { connect } from 'react-redux';

const Product = ({ shoppings }) => (
  <div>
    <h4>我的購物車:</h4>
    {
      shoppings.map(item => (
        <div key={item.id}>
          {
            `產品名稱:${item.title}, 售價:${item.price}元`
          }
        </div>
      ))
    }
  </div>
);

const SoppingCart = ({ status, shoppings }) => (
  <div className="shopping_cart mr-2">
    <i className="material-icons md-24">shopping_cart</i>
    <div className="cart_content box-shadow">
      {
        (status === 'init' || status === 'loginerr') ?
          '請先登入唷 :)' :
          <Product shoppings={shoppings} />
      }
    </div>
  </div>
);

const mapStateToProps = (state, ownProps) => {
  const { login: { status, shoppings } } = state;
  return {
    status,
    shoppings,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {

};

export default connect(mapStateToProps)(SoppingCart);
