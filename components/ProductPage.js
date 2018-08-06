import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

class ProductPage extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-10">
            <div className="row">
              12312312
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

export default withRouter(connect(mapStateToProps)(ProductPage));
