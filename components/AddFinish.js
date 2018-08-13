import React from 'react';
import cx from 'classnames';

const Addfinished = () => (
  <div
    className={cx('modal add_finished show')}
    tabIndex="-1"
    role="dialog"
  >
    <div className="modal-dialog modal-dialog-centered" role="document">
      <div className="content">
        <h2>商品已成功加入購物車</h2>
        <i className="material-icons">check_circle_outline</i>
      </div>
    </div>
    <div className="mask" role="document" />
  </div>
);

export default Addfinished;
