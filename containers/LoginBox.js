import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { loginRequest, closeLoginBox } from '../action';

const Loading = props => (
  <div className="loader-outer">
    <div className="loader" />
  </div>
);

const LoginError = props => (
  <p>{props.message}</p>
);


class LoginBox extends Component {
  constructor(props) {
    super(props);
    this.accountInput = React.createRef();
    this.passwordInput = React.createRef();
  }
  onClickLogin = () => {
    const { login } = this.props;
    const accountInput = this.accountInput.current;
    const passwordInput = this.passwordInput.current;
    const payload = {
      username: accountInput.value,
      password: passwordInput.value,
    };
    login(payload);
  }
  render() {
    const {
      loginBoxOpen,
      closeLoginBox: close,
      status,
      message,
    } = this.props;

    console.log('登入狀態', status);

    return (
      <div
        className={cx('modal login_box', {
          show: loginBoxOpen,
          loading: status === 'loading',
        })}
        tabIndex="-1"
        role="dialog"
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
              <div className="form-group row">
                <label htmlFor="account" className="col-sm-2 col-form-label">帳號</label>
                <div className="col-sm-10">
                  <input
                    ref={this.accountInput}
                    type="text"
                    className="form-control"
                    id="account"
                    placeholder="請輸入帳號"
                  />
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="password" className="col-sm-2 col-form-label">密碼</label>
                <div className="col-sm-10">
                  <input
                    ref={this.passwordInput}
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="請輸入帳號"
                  />
                </div>
              </div>
            </div>

            <div className="modal-footer">
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

const mapStateToProps = (state, ownProps) => {
  const { loginBoxOpen, login: { status, message } } = state;
  return {
    loginBoxOpen,
    status,
    message,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  closeLoginBox: () => { dispatch(closeLoginBox); },
  login: ({ username, password }) => { dispatch(loginRequest({ username, password })); },
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginBox);
