import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  openLoginBox,
  logOut,
} from '../action';
import LoginBox from './LoginBox';
import SoppingCart from './ShoppingCart';

const Header = ({ username, status, dispatch }) => (
  <React.Fragment>
    <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 border-bottom top_header">
      <Link to="/" className="mr-md-auto logo">
        <h3 className="my-0">Happy Shop</h3>
      </Link>
      <span className="mr-2">
        {
          (username) ?
            `${username} 歡迎回來!` :
            '請登入'
        }
      </span>
      <SoppingCart />
      <button
        className="btn btn-outline-primary"
        onClick={() => {
          const dispathTarget = username ? logOut : openLoginBox;
          dispatch(dispathTarget);
        }}
      >
        {
          (status === 'logined') ?
            '登出' :
            '登入'
        }
      </button>
    </div>
    <LoginBox />
  </React.Fragment>
);

const mapStateToProps = (state, ownProps) => {
  const { login: { username, status } } = state;
  return {
    username,
    status,
  };
};

export default connect(mapStateToProps)(Header);
