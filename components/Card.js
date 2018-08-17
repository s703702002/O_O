import React from 'react';
import { Link } from 'react-router-dom';

const imgUrl = '/static/img/';
const Card = ({ item, col }) => (
  <div
    role="document"
    className={`col-${col} product_card`}
    onClick={() => { window.scrollTo(0, 0); }}
  >
    <Link to={item.id} className="card">
      <img className="card-img-top" src={`${imgUrl}${item.id}.jpg`} alt={item.title} />
      <div className="card-body">
        <h5 className="card-title">{item.title}</h5>
        <p className="card-text">{`售價: ${item.price} 元`}</p>
        <p className="card-text">
          <small className="text-muted">
            {`庫存: ${item.inventory}`}
          </small>
        </p>
      </div>
    </Link>
  </div>
);

export default Card;
