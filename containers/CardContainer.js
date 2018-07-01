import React, { Component } from 'react';
import Card from '../components/Card';

class CardCaontainer extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    );
  }
}

export default CardCaontainer;
