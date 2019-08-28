import React, { useState } from 'react';
import { withRouter } from 'react-router';
import PushButton from '../components/PushButton';
import Form, { useFormState } from '../components/Form';
import OrderInfo from './OrderInfo';

export const CustomerInfoContainer = (props) => {
  const {
    validateForm,
    state: orderFormState,
    formChange,
    valueCheck,
    selectChange,
  } = useFormState();

  const {
    validateForm: receiveFormValidate,
    state: receiveFormState,
    formChange: receiveFormChange,
    valueCheck: receiveFormCheck,
    selectChange: receiveFormSelectChange,
  } = useFormState();

  const [sameWithOrder, setSameWithOrder] = useState(false);

  const confirmHandler = () => {
    const valid = validateForm() && (sameWithOrder || receiveFormValidate());
    if (!valid) return;
    props.history.push('/checkoutfinish');
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-9">
          <section className="mb-3">
            <h4>訂購人</h4>
            <hr />
            <Form
              state={orderFormState}
              formChange={formChange}
              onBlurCallBack={valueCheck}
              selectChange={selectChange}
            />
          </section>
          <section>
            <div className="d-flex align-items-center">
              <h4 className="mb-0 mr-2">收件人</h4>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={sameWithOrder}
                  id="receiveCheck"
                  onChange={() => setSameWithOrder(!sameWithOrder)}
                />
                <label className="form-check-label" htmlFor="receiveCheck">
                  同訂購人
                </label>
              </div>
            </div>
            <hr />
            <Form
              id="receive"
              state={receiveFormState}
              formChange={receiveFormChange}
              onBlurCallBack={receiveFormCheck}
              selectChange={receiveFormSelectChange}
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

export default withRouter(CustomerInfoContainer);
