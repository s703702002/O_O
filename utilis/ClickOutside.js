import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ClickOutside extends Component {
    static propTypes = {
      onClickOutside: PropTypes.func.isRequired,
    }

    constructor(props) {
      super(props);
      this.isTouch = false;
      this.isClickInSide = false;
      this.isUnMounted = false;
    }

    componentDidMount() {
      document.addEventListener('touchend', this.handle, false);
      document.addEventListener('click', this.handle, false);
    }

    componentWillUnmount() {
      this.isUnMounted = true;
      document.removeEventListener('touchend', this.handle, false);
      document.removeEventListener('click', this.handle, false);
    }

    handle = (e) => {
      if (this.isClickInSide) {
        this.isClickInSide = false;
        return;
      }

      if (e.type === 'touchend') this.isTouch = true;
      if (e.type === 'click' && this.isTouch) return;

      const { onClickOutside } = this.props;

      if (this.isUnMounted === false) onClickOutside(e);
    }

    handleClick = () => {
      this.isClickInSide = true;
    }

    render() {
      const { children, onClickOutside, ...props } = this.props;

      return (
        <div {...props} onClick={this.handleClick} role="document">
          {children}
        </div>
      );
    }
}
