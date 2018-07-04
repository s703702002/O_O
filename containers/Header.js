import React from 'react';
import { connect } from 'react-redux';
import { openLoginBox, logOut } from '../action';

const Header = ({ username, dispatch }) => (
  <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
    <h5 className="my-0 mr-md-auto font-weight-normal">黑皮</h5>
    <span className="mr-2">
      {
        (username) ?
          `${username} 歡迎回來!` :
          '請登入'
      }
    </span>
    <button
      className="btn btn-outline-primary"
      onClick={() => {
        const dispathTarget = username ? logOut : openLoginBox;
        dispatch(dispathTarget);
      }}
    >
      {
        (username) ?
          '登出' :
          '登入'
      }
    </button>
  </div>
);

const mapStateToProps = (state, ownProps) => {
  const { login: { username }, loginBoxOpen } = state;
  return {
    username,
    loginBoxOpen,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {

};

export default connect(mapStateToProps)(Header);
