import React from 'react';
import {
  push,
} from '../utilis';

// 可以pushHistory的按鈕

const PushButton = ({
  className,
  path,
  text,
}) => (
  <button
    className={className}
    onClick={() => { push(path); }}
  >
    {text}
  </button>
);

export default PushButton;
