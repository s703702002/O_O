import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import cx from 'classnames';

class ProductContainer extends Component {
  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-10">
            One of three columns
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ProductContainer);
