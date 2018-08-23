import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import PushButton from '../components/PushButton';
import OrderInfo from './OrderInfo';

class CustomerInfoContainer extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-9">123</div>
          <div className="col-3">
            <OrderInfo />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { shoppingCart } = state;
  return {
    shoppingCart,
  };
};

export default withRouter(connect(mapStateToProps)(CustomerInfoContainer));
