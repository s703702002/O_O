import React, { Component } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

class LightBox extends Component {
  static propTypes = {
    className: PropTypes.string,
    message: PropTypes.string.isRequired,
  }
  static defaultProps = {
    className: null,
  };
  render() {
    const {
      className,
      message,
      removeLightBox,
    } = this.props;
    return (
      <div
        className={cx('modal light_box', className)}
        tabIndex="-1"
        role="dialog"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <i className="material-icons text-warning">error_outline</i>
              <p className="text-warning font-weight-bold message">{message}</p>
              <button className="btn btn-outline-info" onClick={removeLightBox}>知道了</button>
            </div>
          </div>
        </div>
        <div className="mask" role="document" onClick={removeLightBox} />
      </div>
    );
  }
}

export default LightBox;
