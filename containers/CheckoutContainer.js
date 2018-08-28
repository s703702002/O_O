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

const imgUrl = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22288%22%20height%3D%22225%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16576763d66%20text%20%7B%20fill%3A%23eceeef%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16576763d66%22%3E%3Crect%20width%3D%22288%22%20height%3D%22225%22%20fill%3D%22%2355595c%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2296.8359375%22%20y%3D%22118.8%22%3EThumbnail%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';

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
          <img className="mw-100" src={imgUrl} alt="test" />
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
