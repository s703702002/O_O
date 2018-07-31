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
class CardCaontainer extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getProductsRequest());
  }
  renderProducts() {
    const {
      products,
    } = this.props;

    let {
      location: { search },
    } = this.props;

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

    return renderArray.map(item => (
      <Card
        key={item.id}
        title={item.title}
        price={item.price}
        inventory={item.inventory}
        gender={item.gender}
      />
    ));
  }
  render() {
    const { products } = this.props;
    return (
      <div className="container">
        <div className="row">
          <Aside />
          <div className="col">
            <div className="card_section">
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

export default withRouter(connect(mapStateToProps)(CardCaontainer));
