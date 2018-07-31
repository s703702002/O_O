import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Card from '../components/Card';
import Aside from './Aside';
import { getProductsRequest } from '../action';
import { serialize } from '../utilis';


const LoadingProducts = () => (
  <p>正在載入產品 請稍後!</p>
);
class CardCaontainer extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getProductsRequest());
  }
  pushHistory(key, value) {
    let {
      location: { search },
    } = this.props;
    if (!search.length) {
      search = '?sort=desc';
    }
    const queryObject = JSON.parse('{"' + decodeURI(search.substring(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
    queryObject[key] = value;
    const newQuery = `?${serialize(queryObject)}`;
    this.props.history.push(newQuery);
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
    const queryObject = JSON.parse('{"' + decodeURI(search.substring(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
    const renderArray = JSON.parse(JSON.stringify(products));

    // 價格排序
    if (queryObject.sort === 'desc') {
      renderArray.sort((a, b) => b.price - a.price);
    } else if (queryObject.sort === 'asc') {
      renderArray.sort((a, b) => a.price - b.price);
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
          <div className="filter_section">
            <section className="order_box">
              <header className="mb-2">排序</header>
              <section>
                <button className="btn btn-outline-primary" onClick={() => { this.pushHistory('sort', 'desc'); }}>
                  價格: 高至低
                </button>
                <button className="btn btn-outline-primary" onClick={() => { this.pushHistory('sort', 'asc'); }}>
                  價格: 低至高
                </button>
              </section>
            </section>
            <section className="filter_box">
              <header className="title mb-2">性別</header>
              <div className="custom-control custom-radio">
                <input type="radio" id="maleRadio" name="gender" className="custom-control-input" value="male" />
                <label className="custom-control-label" htmlFor="maleRadio">男裝</label>
              </div>
              <div className="custom-control custom-radio">
                <input type="radio" id="femaleRadio" name="gender" className="custom-control-input" value="female" />
                <label className="custom-control-label" htmlFor="femaleRadio">女裝</label>
              </div>
            </section>
            <section className="filter_box">
              <header className="title mb-2">價格區間</header>
              <div className="custom-control custom-checkbox">
                <input type="checkbox" id="priceFilter1" name="priceFilter" className="custom-control-input" />
                <label className="custom-control-label" htmlFor="priceFilter1">0 ~ 500</label>
              </div>
              <div className="custom-control custom-checkbox">
                <input type="checkbox" id="priceFilter2" name="priceFilter" className="custom-control-input" />
                <label className="custom-control-label" htmlFor="priceFilter2">500 ~ 1000</label>
              </div>
              <div className="custom-control custom-checkbox">
                <input type="checkbox" id="priceFilter3" name="priceFilter" className="custom-control-input" />
                <label className="custom-control-label" htmlFor="priceFilter3">1000 ~ 1500</label>
              </div>
              <div className="custom-control custom-checkbox">
                <input type="checkbox" id="priceFilter4" name="priceFilter" className="custom-control-input" />
                <label className="custom-control-label" htmlFor="priceFilter4">1500 ~ 2000</label>
              </div>
              <div className="custom-control custom-checkbox">
                <input type="checkbox" id="priceFilter5" name="priceFilter" className="custom-control-input" />
                <label className="custom-control-label" htmlFor="priceFilter5">2000以上</label>
              </div>
            </section>
          </div>
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
