import React, { Component } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

class LightBox extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.element,
    ]).isRequired,
    clickMask: PropTypes.func,
  }
  static defaultProps = {
    className: null,
    clickMask: () => { console.log('clickMask'); },
  };
  render() {
    const {
      className,
      children,
      clickMask,
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
              {children}
            </div>
          </div>
        </div>
        <div className="mask" role="document" onClick={clickMask} />
      </div>
    );
  }
}

export default LightBox;
