import React from 'react';
import { SimpleHeader } from '../containers/Header';
import CustomerInfo from '../containers/CustomerInfoContainer';

const CustomerInfoPage = () => (
  <React.Fragment>
    <SimpleHeader />
    <CustomerInfo />
  </React.Fragment>
);

export default CustomerInfoPage;
