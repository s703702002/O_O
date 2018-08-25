import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import PushButton from '../components/PushButton';
import Form from '../components/Form';
import OrderInfo from './OrderInfo';

class CustomerInfoContainer extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-9">
            <section>
              <h4>收件人資訊</h4>
              <Form className="customer_info_form">
                <Form.Row>
                  <Form.Group md={6}>
                    <Form.Control
                      label="姓名"
                      id="name"
                      placeholder="陳阿三"
                    />
                  </Form.Group>
                  <Form.Group md={6}>
                    <Form.Control
                      id="cellphone"
                      label="手機"
                      placeholder="0912-345-678"
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group md={6}>
                    <label htmlFor="inputCity">城市</label>
                    <select id="inputCity" className="form-control" defaultValue="1">
                      <option value="1">台北市</option>
                      <option value="2">新北市</option>
                    </select>
                  </Form.Group>
                  <Form.Group md={4}>
                    <label htmlFor="inputState">鄉鎮區</label>
                    <select id="inputState" className="form-control" defaultValue="1">
                      <option value="1">內湖區</option>
                      <option value="2">大安區</option>
                    </select>
                  </Form.Group>
                  <Form.Group md={2}>
                    <Form.Control
                      id="inputZip"
                      label="郵遞區號"
                      defaultValue="114"
                    />
                  </Form.Group>
                </Form.Row>
                <Form.Group>
                  <Form.Control
                    id="inputAddress"
                    label="地址"
                  />
                </Form.Group>
                <Form.Group>
                  <label htmlFor="remark">備註</label>
                  <textarea className="form-control" id="remark" rows="3" />
                </Form.Group>
              </Form>
            </section>
          </div>
          <div className="col-3">
            <OrderInfo />
            <PushButton
              className="btn btn-outline-info w-100 my-2"
              path="/checkout"
              text="上一步"
            />
            <PushButton
              className="btn btn-danger w-100 my-2 text-lg"
              path="/"
              text="確認結帳"
            />
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
