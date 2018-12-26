import React from 'react';
import { Link } from 'react-router-dom';
import { SimpleHeader } from '../containers/Header';

const CheckoutFinishPage = () => (
  <React.Fragment>
    <SimpleHeader />
    <div className="container text-center">
      <h2 className="mb-4">感謝您的訂購<i className="material-icons">sentiment_very_satisfied</i></h2>
      <Link to="/">
        <button className="goIndex">回首頁</button>
      </Link>
    </div>
  </React.Fragment>
);

export default CheckoutFinishPage;
