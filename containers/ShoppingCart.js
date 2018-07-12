import React from 'react';
import { connect } from 'react-redux';

const SoppingCart = ({ status, shoppings }) => (
  <div className="shopping_cart mr-2">
    <i className="material-icons md-24">shopping_cart</i>
    <div className="cart_content box-shadow">
      {
        (status === 'init') ?
          '請先登入唷 :)' :
          shoppings.map(item => (
            <div key={item.id}>
              {`產品名稱:${item.title}`}
            </div>
          ))
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
