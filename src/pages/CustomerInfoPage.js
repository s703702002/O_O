import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import {
  Redirect,
} from 'react-router-dom';
import { SimpleHeader } from '../containers/Header';
import CustomerInfo from '../containers/CustomerInfoContainer';

const CustomerInfoPage = () => {
  const loingStatus = useSelector(state => state.login.status, shallowEqual);
  if (loingStatus === 'init') return <Redirect to="/" />;
  return (
    <React.Fragment>
      <SimpleHeader />
      <CustomerInfo />
    </React.Fragment>
  );
};

export default CustomerInfoPage;
