import React from 'react';
import { withRouter } from 'react-router';
import cx from 'classnames';
import { pushHistory } from '../utilis';

function goPage(pageNum, history) {
  const queryObj = {
    page: pageNum,
  };
  pushHistory(queryObj, history);
}

const PageController = ({
  activePage,
  maxPage,
  renderButton,
  history,
}) => (
  <div className="col-12 page_controller">
    <button
      className="material-icons"
      onClick={() => {
        if (activePage === 0) return;
        goPage(activePage - 1, history);
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
            onClick={() => { goPage(v - 1, history); }}
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
        goPage(activePage + 1, history);
      }}
    >
      keyboard_arrow_right
    </button>
  </div>
);

export default withRouter(PageController);
