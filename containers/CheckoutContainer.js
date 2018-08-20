import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Counter from '../components/Counter';

const OrderList = ({ order }) => {
  const {
    product,
    count,
  } = order;
  const {
    id,
    title,
    price,
  } = product;
  return (
    <div className="row">
      <div className="col-3">
        <img className="mw-100" src={`/static/img/${id}.jpg`} alt="test" />
      </div>
      <div className="col-5">
        <div>
          <Link to={`/${id}`}>{title}</Link>
        </div>
        <p>單價:<span className="text-danger">{price}</span>元</p>
      </div>
      <div className="col-4">
        <Counter max={10} defaultValue={2} />
        <p>總計:<strong className="text-danger">123</strong>元</p>
      </div>
    </div>
  );
};

class CheckOutContainer extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-8">
            <OrderList order={this.props.shoppingCart[0]} />
          </div>
          <div className="col-4">
          123
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

export default withRouter(connect(mapStateToProps)(CheckOutContainer));
