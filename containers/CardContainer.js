import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '../components/Card';
import { getProductsRequest } from '../action';

const LoadingProducts = () => (
  <p>正在載入產品 請稍後!</p>
);
class CardCaontainer extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getProductsRequest());
  }
  renderProducts() {
    const { products } = this.props;
    return products.map((item, index) => (
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
            篩選側
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

export default connect(mapStateToProps)(CardCaontainer);
