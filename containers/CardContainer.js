import React, { Component } from 'react';
import Card from '../components/Card';

class CardCaontainer extends Component {
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

export default CardCaontainer;
