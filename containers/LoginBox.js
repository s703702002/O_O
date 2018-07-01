import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { loginFlow } from '../action';

// const FromRow = ({ id, title, isPassword }) => (
//   <div className="form-group row">
//     <label htmlFor={id} className="col-sm-2 col-form-label">{title}</label>
//     <div className="col-sm-10">
//       <input type={isPassword ? 'password' : 'text'} className="form-control" id={id} placeholder={`請輸入${title}`} />
//     </div>
//   </div>
// );

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
    const { match } = this.props;

    return (
      <div
        className="modal"
        tabIndex="-1"
        role="dialog"
        style={
          match.params.filter === 'login' ?
          { display: 'block' } :
          null
        }
      >
        <div className="modal-dialog" role="document">
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
              <Link className="btn btn-secondary" to="/">取消</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
};


export default withRouter(connect(
  mapStateToProps,
  { loginFlow }
)(LoginBox));
