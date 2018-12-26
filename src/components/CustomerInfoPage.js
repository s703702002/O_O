import React from 'react';
import { SimpleHeader } from '../containers/Header';
import CustomerInfoContainer from '../containers/CustomerInfoContainer';

const CustomerInfoPage = () => (
  <React.Fragment>
    <SimpleHeader />
    <CustomerInfoContainer />
  </React.Fragment>
);

export default CustomerInfoPage;
