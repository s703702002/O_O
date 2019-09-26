import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter,
  Switch,
} from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import Addfinished from '../containers/AddFinish';
import LightBoxWithConnect from '../containers/LightBoxContainer';
import '../css/main.scss';

import routers from '../pages/routers';

const App = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <div className="mb-5">
        <Switch>
          {renderRoutes(routers)}
        </Switch>
        <Addfinished />
        <LightBoxWithConnect />
      </div>
    </BrowserRouter>
  </Provider>
);

export default App;
