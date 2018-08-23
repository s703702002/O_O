import React from 'react';
import { connect } from 'react-redux';

// 計算總價格
function calcPrice(cart) {
  return cart.reduce((acc, cur) => {
    const { product: { price }, count } = cur;
    return acc + (price * count);
  }, 0);
}

const Item = ({ title, price }) => (
  <div className="item">
    <span className="title">{title}</span>
    <span>
      <b className="text-danger">{price}</b>元
    </span>
  </div>
);

const OrderInfo = ({ totalPrice, discount }) => (
  <aside className="order_info">
    <header className="order_info_header">
      <h4 className="mb-0">消費明細</h4>
    </header>
    <section className="order_info_body">
      <section className="info_section">
        <Item title="小計" price={totalPrice} />
        <Item title="折扣" price={discount} />
      </section>
      <section className="info_section">
        <Item title="總計" price={totalPrice - discount} />
      </section>
    </section>
  </aside>
);

const mapStateToProps = (state) => {
  const { shoppingCart } = state;
  const totalPrice = calcPrice(shoppingCart);
  return {
    totalPrice,
    discount: 150,
  };
};

export default connect(mapStateToProps)(OrderInfo);
