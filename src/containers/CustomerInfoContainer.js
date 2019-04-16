import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PushButton from '../components/PushButton';
import Form from '../components/Form';
import OrderInfo from './OrderInfo';

class CustomerInfoContainer extends Component {
  customerForm = null;
  confirmHandler = () => {
    const { customerForm } = this;
    if (!customerForm.getValid()) return;
    this.props.history.push('/checkoutfinish');
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-9">
            <section>
              <h4>收件人資訊</h4>
              <Form
                className="customer_info_form"
                ref={(e) => { this.customerForm = e; }}
              />
            </section>
          </div>
          <div className="col-3">
            <OrderInfo />
            <PushButton
              className="btn btn-outline-info w-100 my-2"
              path="/checkout"
              text="上一步"
            />
            <button
              className="btn btn-danger w-100 my-2 text-lg"
              onClick={this.confirmHandler}
            >
              確認結帳
            </button>
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
