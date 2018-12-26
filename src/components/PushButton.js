import React, { Component } from 'react';
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

export function withPush(WrappedComponent) {
  return class extends Component {
    render() {
      return <WrappedComponent push={push} {...this.props} />;
    }
  };
}

export default PushButton;
