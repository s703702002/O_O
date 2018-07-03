import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loginFlow, closeLoginBox } from '../action';
import cx from 'classnames';

class LoginBox extends Component {
  constructor(props) {
    super(props);
    this.accountInput = React.createRef();
    this.passwordInput = React.createRef();
  }
  onClickLogin = () => {
    const { loginFlow: login } = this.props;
    const accountInput = this.accountInput.current;
    const passwordInput = this.passwordInput.current;
    login(accountInput.value, passwordInput.value);
  }
  render() {
    const {
      loginBoxOpen,
      closeLoginBox: close,
    } = this.props;
    return (
      <div
        className={cx('modal login_box', {
          show: loginBoxOpen,
        })}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
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
        <div className="mask" />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { loginBoxOpen } = state;
  return {
    loginBoxOpen,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  closeLoginBox: () => { dispatch(closeLoginBox); },
  loginFlow: (acc, pass) => { dispatch(loginFlow(acc, pass)); },
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginBox);
