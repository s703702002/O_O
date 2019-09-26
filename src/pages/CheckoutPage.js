import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import {
  Redirect,
} from 'react-router-dom';
import { SimpleHeader } from '../containers/Header';
import CheckOutContainer from '../containers/CheckoutContainer';

const CheckoutPage = () => {
  const loingStatus = useSelector(state => state.login.status, shallowEqual);
  if (loingStatus === 'init') return <Redirect to="/" />;
  return (
    <React.Fragment>
      <SimpleHeader />
      <CheckOutContainer />
    </React.Fragment>
  );
};

export default CheckoutPage;
