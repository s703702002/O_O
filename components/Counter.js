import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addLightBoxMessage } from '../action';

class Counter extends Component {
  static propTypes = {
    max: PropTypes.number,
    min: PropTypes.number,
  }
  static defaultProps = {
    max: null,
    min: 0,
  };
  state = {
    count: 0,
  }
  minus = () => {
    let { count } = this.state;
    const {
      min,
    } = this.props;
    count -= 1;
    if (count < min) return;
    this.setState({ count });
  }
  add = () => {
    let { count } = this.state;
    const {
      max,
      dispatch,
    } = this.props;
    count += 1;
    if (count > max) return dispatch(addLightBoxMessage('此商品庫存不足'));
    return this.setState({ count });
  }
  render() {
    return (
      <div className="counter">
        <button className="btn btn-light material-icons" onClick={this.minus}>remove</button>
        <span className="count">{this.state.count}</span>
        <button className="btn btn-light material-icons" onClick={this.add}>add</button>
      </div>
    );
  }
}

export default Counter;
