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
  render() {
    console.log(this.props.product);
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-10">
            <LoadProduct />
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
