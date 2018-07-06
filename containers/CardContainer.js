import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '../components/Card';
import { getProductsRequest } from '../action';

class CardCaontainer extends Component {
  componentDidMount() {
    console.log('componentDidMount');
    const { dispatch } = this.props;
    dispatch(getProductsRequest());
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="filter_section">
            篩選側
          </div>
          <div className="col">
            <div className="card_section">
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
              <Card />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(CardCaontainer);
