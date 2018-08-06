import React from 'react';
import Header from '../containers/Header';
import CardCaontainer from '../containers/CardContainer';
import LoginBox from '../containers/LoginBox';


const App = () => (
  <React.Fragment>
    <Header />
    <CardCaontainer />
    <LoginBox />
  </React.Fragment>
);

export default App;
