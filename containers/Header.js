import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  openLoginBox,
  logOut,
} from '../action';
import LoginBox from './LoginBox';
import SoppingCart from './ShoppingCart';

const Person = ({ username }) => (
  <span style={{ display: 'flex', alignItems: 'center' }}>
    <i className="material-icons">person</i>
    {username}
  </span>
);

const SimpleHeader = ({ children }) => (
  <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 border-bottom top_header">
    <Link to="/" className="mr-md-auto logo">
      <h3 className="my-0">Happy Shop</h3>
    </Link>
    {children}
  </div>
);

const Header = ({
  username,
  status,
  clickLogin,
  clickLogout,
}) => (
  <React.Fragment>
    <SimpleHeader>
      <span className="mr-2 ">
        {
          (username) ?
            <Person username={username} /> :
            '請登入'
        }
      </span>
      <SoppingCart />
      <button
        className="btn btn-outline-primary"
        onClick={() => {
          if (username) clickLogout();
          else clickLogin();
        }}
      >
        {
          (status === 'logined') ?
            '登出' :
            '登入'
        }
      </button>
    </SimpleHeader>
    <LoginBox />
  </React.Fragment>
);

const mapStateToProps = (state) => {
  const { login: { username, status } } = state;
  return {
    username,
    status,
  };
};

const mapDispatchToProps = dispatch => ({
  clickLogin: () => { dispatch(openLoginBox); },
  clickLogout: () => { dispatch(logOut); },
});

export { SimpleHeader };
export default connect(mapStateToProps, mapDispatchToProps)(Header);
