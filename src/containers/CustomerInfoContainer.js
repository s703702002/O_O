import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PushButton from '../components/PushButton';
import Form from '../components/Form';
import OrderInfo from './OrderInfo';

const CustomerInfoContainer = (props) => {
  // const FromRef = useRef(null);
  const validateForm = useRef();
  const confirmHandler = () => {
    if (!validateForm.current()) return;
    props.history.push('/checkoutfinish');
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-9">
          <section>
            <h4>收件人資訊</h4>
            <Form
              ref={validateForm}
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
            onClick={confirmHandler}
          >
            確認結帳
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { shoppingCart } = state;
  return {
    shoppingCart,
  };
};

export default withRouter(connect(mapStateToProps)(CustomerInfoContainer));
