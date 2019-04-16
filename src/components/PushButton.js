import React from 'react';
import { withRouter } from 'react-router';

const PushButton = ({
  className,
  path,
  text,
  history,
}) => (
  <button
    className={className}
    onClick={() => { history.push(path); }}
  >
    {text}
  </button>
);

export default withRouter(PushButton);
