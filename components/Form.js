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
    className: PropTypes.string,
  };
  static defaultProps = {
    className: null,
  };
  static Row = FormRow;
  static Group = FormGroup;
  static Control = FormControl;
  state = {
    name: {
      value: '',
      error: '',
    },
    cellphone: {
      value: '',
      error: '',
    },
    address: {
      value: '',
      error: '',
    },
    remark: {
      value: '',
      error: '',
    },
    isValid: false,
  };
  getValid() {
    return this.state.isValid;
  }
  formChange = (e) => {
    const {
      id,
      value,
    } = e.target;
    this.setState({
      [id]: {
        value,
        error: '',
      },
    });
  }
  valueCheck = (e) => {
    const {
      id,
      value,
    } = e.target;
    if (!value.length) {
      this.setState({
        [id]: {
          value,
          error: '此欄位是必填欄位唷',
        },
        isValid: false,
      });
    }
  }
  render() {
    const {
      className,
    } = this.props;
    const {
      name,
      cellphone,
      address,
      remark,
    } = this.state;
    return (
      <form className={className}>
        <Form.Row>
          <Form.Group md={6}>
            <Form.Control
              label="姓名"
              id="name"
              placeholder="陳阿三"
              value={name.value}
              isInvalid={name.error}
              onChange={this.formChange}
              onBlur={this.valueCheck}
            />
          </Form.Group>
          <Form.Group md={6}>
            <Form.Control
              id="cellphone"
              label="手機"
              placeholder="0912345678"
              value={cellphone.value}
              isInvalid={cellphone.error}
              onChange={this.formChange}
              onBlur={this.valueCheck}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group md={6}>
            <label htmlFor="inputCity">城市</label>
            <select id="inputCity" className="form-control" defaultValue="1">
              <option value="1">台北市</option>
              <option value="2">新北市</option>
            </select>
          </Form.Group>
          <Form.Group md={4}>
            <label htmlFor="inputState">鄉鎮區</label>
            <select id="inputState" className="form-control" defaultValue="1">
              <option value="1">內湖區</option>
              <option value="2">大安區</option>
            </select>
          </Form.Group>
          <Form.Group md={2}>
            <Form.Control
              id="inputZip"
              label="郵遞區號"
              defaultValue="114"
            />
          </Form.Group>
        </Form.Row>
        <Form.Group>
          <Form.Control
            id="address"
            label="地址"
            value={address.value}
            isInvalid={address.error}
            onChange={this.formChange}
            onBlur={this.valueCheck}
          />
        </Form.Group>
        <Form.Group>
          <label htmlFor="remark">備註</label>
          <textarea
            className="form-control"
            id="remark"
            rows="3"
            value={remark.value}
            onChange={this.formChange}
          />
        </Form.Group>
      </form>
    );
  }
}


export default Form;
