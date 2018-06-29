import React from 'react';
import { connect } from 'react-redux';

const FromRow = ({ id, title, isPassword }) => (
  <div className="form-group row">
    <label htmlFor={id} className="col-sm-2 col-form-label">{title}</label>
    <div className="col-sm-10">
      <input type={isPassword ? 'password' : 'text'} className="form-control" id={id} placeholder={'請輸入' + title} />
    </div>
  </div>
);

const LoginBox = () => (
  <div className="modal" tabIndex="-1" role="dialog">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-body">
          <FromRow id="account" title="帳號" />
          <FromRow id="password" title="密碼" isPassword />
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-primary">登入</button>
          <button type="button" className="btn btn-secondary" data-dismiss="modal">取消</button>
        </div>
      </div>
    </div>
  </div>
);

export default LoginBox;
