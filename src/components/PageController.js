import React from 'react';
import cx from 'classnames';
import { pushHistory } from '../utilis';

function goPage(pageNum) {
  const queryObj = {
    page: pageNum,
  };
  pushHistory(queryObj);
}

const PageController = ({
  activePage,
  maxPage,
  renderButton,
}) => (
  <div className="col-12 page_controller">
    <button
      className="material-icons"
      onClick={() => {
        if (activePage === 0) return;
        goPage(activePage - 1);
      }}
    >
      keyboard_arrow_left
    </button>
    {
      renderButton.map((v) => {
        if (v === '...') return <span key={v}>{v}</span>;
        return (
          <button
            key={v}
            className={cx('page_num', { active: (v - 1) === activePage })}
            onClick={() => { goPage(v - 1); }}
          >
            {v}
          </button>
        );
      })
    }
    <button
      className="material-icons"
      onClick={() => {
        if (activePage === maxPage) return;
        goPage(activePage + 1);
      }}
    >
      keyboard_arrow_right
    </button>
  </div>
);

export default PageController;
