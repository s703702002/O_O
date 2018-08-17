import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Card from '../components/Card';
import NoMatchCard from '../components/NoMatchCard';
import Aside from './Aside';
import { getProductsRequest } from '../action';
import { queryToObj } from '../utilis';

const LoadingProducts = () => (
  <p>正在載入產品 請稍後!</p>
);

class CardContainer extends Component {
  state = {
    page: 0,
  }
  componentDidMount() {
    const {
      dispatch,
      products,
    } = this.props;
    // 若沒有產品, 發request
    if (!products.length) dispatch(getProductsRequest());
  }
  renderProducts() {
    const {
      products,
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

    // 若篩選後無符合的產品
    if (!renderArray.length) return <NoMatchCard />;

    return this.renderContent(renderArray);
  }
  renderContent(renderArray) {
    const { page } = this.state;
    return (
      <React.Fragment>
        {
          renderArray.map(item => (
            <Card
              key={item.id}
              item={item}
              col={3}
            />
          ))
        }
        {
          <div className="col-12 page_controller">
            <button className="material-icons">keyboard_arrow_left</button>
            <button className="page_num active">1</button>
            <button className="page_num">2</button>
            <button className="material-icons">keyboard_arrow_right</button>
          </div>
        }
      </React.Fragment>
    );
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

const mapStateToProps = (state) => {
  const { products } = state.products;
  return {
    products,
  };
};

export default withRouter(connect(mapStateToProps)(CardContainer));
