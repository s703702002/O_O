import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PushButton from '../components/PushButton';
import Form, { useFormState } from '../components/Form';
import OrderInfo from './OrderInfo';

const CustomerInfoContainer = (props) => {
  const {
    validateForm,
    state,
    formChange,
    valueCheck,
    selectChange,
  } = useFormState();
  const confirmHandler = () => {
    if (!validateForm()) return;
    props.history.push('/checkoutfinish');
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-9">
          <section>
            <h4>訂購人</h4>
            <hr />
            <Form
              state={state}
              formChange={formChange}
              onBlurCallBack={valueCheck}
              selectChange={selectChange}
            />
          </section>
          <section>
            <h4>收件人</h4>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
              <label className="form-check-label" htmlFor="defaultCheck1">
                同訂購人
              </label>
            </div>
            <hr />
            <Form
              state={state}
              formChange={formChange}
              onBlurCallBack={valueCheck}
              selectChange={selectChange}
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
