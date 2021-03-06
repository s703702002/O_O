import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { loginRequest, closeLoginBox, loginCancel } from '../action';

const Loading = () => (
  <div className="loader-outer">
    <div className="loader" />
  </div>
);

const LoginError = props => (
  <p>{props.message}</p>
);

const LoginSuccess = () => (
  <p>登入成功，歡迎回來</p>
);

const LoginForm = props => (
  <React.Fragment>
    <div className="form-group row">
      <label htmlFor="account" className="col-sm-2 col-form-label">帳號</label>
      <div className="col-sm-10">
        <input
          ref={props.accountRef}
          type="text"
          className="form-control"
          id="account"
          placeholder="請輸入帳號"
          autoComplete="off"
        />
      </div>
    </div>
    <div className="form-group row">
      <label htmlFor="password" className="col-sm-2 col-form-label">密碼</label>
      <div className="col-sm-10">
        <input
          ref={props.passwordRef}
          type="password"
          className="form-control"
          id="password"
          placeholder="請輸入帳號"
        />
      </div>
    </div>
    <p>測試帳號:stanley 密碼:0000</p>
  </React.Fragment>
);

class LoginBox extends Component {
  onClickLogin = () => {
    const { login } = this.props;
    const { accountInput, passwordInput } = this;
    const payload = {
      username: accountInput.value,
      password: passwordInput.value,
    };
    login(payload);
  }
  handleKeyUp = (e) => {
    const { accountInput, passwordInput } = this;
    // Enter鍵
    if (e.keyCode === 13 && accountInput.value !== '' && passwordInput.value !== '') {
      this.onClickLogin();
    }
  }
  render() {
    const {
      loginBoxOpen,
      closeLoginBox: close,
      loginCancelEvent,
      status,
      message,
    } = this.props;

    if (loginBoxOpen) this.accountInput.focus();

    return (
      <div
        className={cx('modal login_box', {
          show: loginBoxOpen,
          loading: status === 'loading',
        })}
        tabIndex="-1"
        role="dialog"
        onKeyUp={this.handleKeyUp}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              {
                (status === 'loading') ? <Loading /> : null
              }
              {
                (status === 'loginerr') ? <LoginError message={message} /> : null
              }
              {
                (status === 'logined') ?
                  <LoginSuccess /> :
                  <LoginForm
                    accountRef={(el) => { this.accountInput = el; }}
                    passwordRef={(el) => { this.passwordInput = el; }}
                  />
              }
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger abort-login" onClick={loginCancelEvent}>取消登入</button>
              <button type="button" className="btn btn-primary" onClick={this.onClickLogin}>登入</button>
              <button className="btn btn-secondary" onClick={close}>取消</button>
            </div>
          </div>
        </div>
        <div className="mask" onClick={close} role="document" />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { loginBoxOpen, login: { status, message } } = state;
  return {
    loginBoxOpen,
    status,
    message,
  };
};

const mapDispatchToProps = dispatch => ({
  closeLoginBox: () => { dispatch(closeLoginBox); },
  login: ({ username, password }) => { dispatch(loginRequest({ username, password })); },
  loginCancelEvent: () => { dispatch(loginCancel); },
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginBox);
