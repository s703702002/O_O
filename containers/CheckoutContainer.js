import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import {
  getProductsRequest,
} from '../action';

class CheckOutContainer extends Component {
  render() {
    return (
      <div>hello world</div>
    );
  }
}

const mapStateToProps = (state) => {
  const { shoppingCart } = state;
  return {
    shoppingCart,
  };
};

export default withRouter(connect(mapStateToProps)(CheckOutContainer));
