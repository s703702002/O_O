import React, { Component } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

const FormControl = ({
  id = null,
  type = 'text',
  label = '標題文字',
  placeholder = '',
  onChange = null,
  onBlur = null,
  isInvalid = '',
  defaultValue = null,
}) => (
  <React.Fragment>
    <label htmlFor={id}>{label}</label>
    <input
      className={cx('form-control', {
        'is-invalid': isInvalid.length > 0,
      })}
      type={type}
      id={id}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      defaultValue={defaultValue}
    />
    {
      (isInvalid.length > 0) ?
        <div className="invalid-feedback">
          {isInvalid}
        </div> :
        null
    }
  </React.Fragment>
);

const FormRow = ({ children }) => (
  <div className="form-row">
    {children}
  </div>
);

const FormGroup = ({
  children,
  md,
  xl,
}) => (
  <div
    className={cx('form-grop', {
      [`col-md-${md}`]: md > 0,
      [`col-md-${xl}`]: xl > 0,
    })}
  >
    {children}
  </div>
);

class Form extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.node,
    ]).isRequired,
    className: PropTypes.string,
  };
  static defaultProps = {
    className: null,
  };
  static Row = FormRow;
  static Group = FormGroup;
  static Control = FormControl;
  render() {
    const {
      children,
      className,
    } = this.props;
    return (
      <form className={className}>
        {children}
      </form>
    );
  }
}


export default Form;
