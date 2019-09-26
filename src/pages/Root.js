import React from 'react';
import { renderRoutes } from 'react-router-config';

const Root = ({ route }) => (
  <React.Fragment>
    {renderRoutes(route.routes)}
  </React.Fragment>
);

export default Root;
