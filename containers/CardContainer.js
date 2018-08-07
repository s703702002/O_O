import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Card from '../components/Card';
import Aside from './Aside';
import { getProductsRequest } from '../action';
import { queryToObj } from '../utilis';

const LoadingProducts = () => (
  <p>正在載入產品 請稍後!</p>
);
class CardContainer extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getProductsRequest());
  }
  renderProducts() {
    const {
      products,
      dispatch,
    } = this.props;

    let {
      search,
    } = this.props.location;

    // 若沒有sort參數, 預設唯降冪排列
    if (!search.length) {
      search = '?sort=desc';
    }
    const queryObject = queryToObj(search);
    let renderArray = JSON.parse(JSON.stringify(products));

    // 價格排序
    if (queryObject.sort === 'desc') {
      renderArray.sort((a, b) => b.price - a.price);
    } else if (queryObject.sort === 'asc') {
      renderArray.sort((a, b) => a.price - b.price);
    }

    // 性別
    if (queryObject.gender === 'male') {
      renderArray = renderArray.filter(item => item.gender === 1);
    } else if (queryObject.gender === 'female') {
      renderArray = renderArray.filter(item => item.gender === 0);
    }

    // 價格區間
    if (queryObject.minPrice) {
      renderArray = renderArray.filter(item => item.price > Number(queryObject.minPrice));
    }
    if (queryObject.maxPrice) {
      renderArray = renderArray.filter(item => item.price < Number(queryObject.maxPrice));
    }

    return renderArray.map(item => (
      <Card
        key={item.id}
        item={item}
        dispatch={dispatch}
      />
    ));
  }
  render() {
    const { products } = this.props;
    return (
      <div className="container">
        <div className="row">
          <Aside className="col-2" />
          <div className="col-10">
            <div className="row">
              {
                (!products.length) ?
                  <LoadingProducts /> :
                  this.renderProducts()
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { products } = state.products;
  return {
    products,
  };
};

export default withRouter(connect(mapStateToProps)(CardContainer));
