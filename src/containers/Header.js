import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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

const Header = () => {
  const login = useSelector(state => state.login);
  const dispatch = useDispatch();
  const clickLogin = useCallback(
    () => dispatch(openLoginBox),
    [dispatch],
  );
  const clickLogOut = useCallback(
    () => dispatch(logOut),
    [dispatch],
  );
  return (
    <React.Fragment>
      <SimpleHeader>
        <span className="mr-2 ">
          {
            (login.username) ?
              <Person username={login.username} /> :
              'pleas Login'
          }
        </span>
        <SoppingCart />
        <button
          className="btn btn-outline-primary"
          onClick={() => {
            if (login.status === 'logined') clickLogOut();
            else clickLogin();
          }}
        >
          {
            (login.status === 'logined') ?
              '登出' :
              '登入'
          }
        </button>
      </SimpleHeader>
      <LoginBox />
    </React.Fragment>
  );
};

export { SimpleHeader };
export default React.memo(Header);
