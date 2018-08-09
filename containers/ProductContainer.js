import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import cx from 'classnames';
import { getProductRequset } from '../action';

const LoadProduct = () => (
  <p>正在載入產品</p>
);
class ProductContainer extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const { productId } = this.props.match.params;
    dispatch(getProductRequset(productId));
  }
  renderProduct() {
    const {
      title,
      price,
    } = this.props.product;
    return (
      <div>
        <h3>{title}</h3>
        <strong>{`$${price}`}</strong>
        <div>
          商品描述商品描述商品描述商品描述商品描述商品描述
        </div>
      </div>
    );
  }
  render() {
    const {
      id,
    } = this.props.product;
    return (
      <div className="container">
        <div className="row">
          <div className="col-3">
            側邊攔
          </div>
          <div className="col-9">
            {
              !id ?
                <LoadProduct /> :
                this.renderProduct()
            }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { product } = state.productPage;
  return {
    product,
  };
};

export default withRouter(connect(mapStateToProps)(ProductContainer));
