import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Counter extends Component {
  static propTypes = {
    max: PropTypes.number,
    min: PropTypes.number,
    maxClick: PropTypes.func,
    minClick: PropTypes.func,
    addClick: PropTypes.func,
    minusClick: PropTypes.func,
    defaultValue: PropTypes.number,
  }
  static defaultProps = {
    max: null,
    min: 0,
    maxClick: () => {}, // 超出最大值的click
    minClick: () => {}, // 超出最小值的click
    addClick: () => {},
    minusClick: () => {},
    defaultValue: 0,
  };
  state = {
    count: this.props.defaultValue,
  }
  minus = () => {
    let { count } = this.state;
    const {
      min,
      minClick,
      minusClick,
    } = this.props;
    count -= 1;
    if (count < min) return minClick();
    return this.setState(() => ({
      count,
    }), minusClick);
  }
  add = () => {
    let { count } = this.state;
    const {
      max,
      maxClick,
      addClick,
    } = this.props;
    count += 1;
    if (count > max) return maxClick();
    return this.setState(() => ({
      count,
    }), addClick);
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
