import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Counter extends Component {
  static propTypes = {
    max: PropTypes.number,
    min: PropTypes.number,
    maxClick: PropTypes.func,
    minClick: PropTypes.func,
    defaultValue: PropTypes.number,
  }
  static defaultProps = {
    max: null,
    min: 0,
    maxClick: () => {},
    minClick: () => {},
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
    } = this.props;
    count -= 1;
    if (count < min) return minClick();
    this.setState({ count });
  }
  add = () => {
    let { count } = this.state;
    const {
      max,
      maxClick,
    } = this.props;
    count += 1;
    if (count > max) return maxClick();
    this.setState({ count });
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
