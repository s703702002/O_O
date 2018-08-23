import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import Counter from '../components/Counter';
import PushButton from '../components/PushButton';
import OrderInfo from './OrderInfo';
import {
  removeShoppingCardItem,
  addToCart,
  reduceCartItem,
  addLightBoxMessage,
} from '../action';

const Order = ({
  order,
  dispatch,
}) => {
  const {
    product,
    count,
  } = order;

  const {
    id,
    title,
    price,
    inventory,
  } = product;

  const total = price * count;

  return (
    <div className="row order">
      <div className="col-3">
        <Link to={`/${id}`}>
          <img className="mw-100" src={`/static/img/${id}.jpg`} alt="test" />
        </Link>
      </div>
      <div className="col-3">
        <h3>
          <Link to={`/${id}`}>{title}</Link>
        </h3>
        <p>單價:<span className="text-danger mx-1">{price}</span>元</p>
      </div>
      <div className="col-3">
        <Counter
          min={1}
          max={inventory}
          defaultValue={count}
          addClick={() => { dispatch(addToCart(product, 1)); }}
          minusClick={() => { dispatch(reduceCartItem(id)); }}
          maxClick={() => { dispatch(addLightBoxMessage('此商品庫存不足')); }}
          minClick={() => { dispatch(addLightBoxMessage('最少數量為1')); }}
        />
        <div className="mt-2">
          <small
            role="button"
            tabIndex="-1"
            className="remove text-secondary cursor-pointer"
            onClick={() => { dispatch(removeShoppingCardItem(id)); }}
          >
            移除此商品
          </small>
        </div>
      </div>
      <div className="col-3">
        <p className="font-weight-bold">總計:<span className="text-danger mx-1">{total}</span>元</p>
      </div>
    </div>
  );
};

class CheckOutContainer extends Component {
  render() {
    const {
      shoppingCart,
      dispatch,
    } = this.props;

    return (
      <div className="container">
        <div className="row">
          <div className="col-9">
            {
              shoppingCart.map(item =>
                (<Order
                  order={item}
                  key={item.product.id}
                  dispatch={dispatch}
                />))
            }
          </div>
          <div className="col-3">
            <OrderInfo />
            <PushButton
              text="繼續結帳"
              className="btn btn-outline-primary w-100 my-2"
              path="/customerinfo"
            />
            <PushButton
              text="繼續選購"
              className="btn btn-outline-info w-100"
              path="/"
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

export default withRouter(connect(mapStateToProps)(CheckOutContainer));
