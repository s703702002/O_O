import React, { Component } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import cityData from '../static/taiwan.json';
import { clone } from '../utilis';

function formCheck(id, value) {
  switch (id) {
    case 'name':
    case 'address':
      return (/[a-zA-Z\u4e00-\u9fa5]/g.test(value)) ?
        '' :
        '至少輸入一個中文或英文字';
    case 'cellphone':
      return (/^09\d{8}/g.test(value)) ?
        '' :
        '請輸入正確的手機格式';
    default:
      return '';
  }
}

const FormControl = ({
  id = null,
  type = 'text',
  label = '標題文字',
  placeholder = '',
  onChange = null,
  onBlur = null,
  isInvalid = '',
  defaultValue = null,
  pattern = null
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
      pattern={pattern}
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
    cityValue: 0,
    regionValue: 0,
    isValid: false,
  };
  getValid() {
    return this.valueCheckAll();
  }
  valueCheckAll = () => {
    const copy = clone(this.state);
    const keys = Object.keys(copy);
    let isValid = true;
    keys.forEach((id) => {
      const { value } = copy[id];

      // 代表是不需驗證的欄位
      if (typeof value === 'undefined') return;

      copy[id] = {
        value,
        error: formCheck(id, value),
      };

      if (copy[id].error.length > 0) isValid = false;
    });
    this.setState(() => ({
      ...copy,
      isValid,
    }));
    return isValid;
  }
  formChange = (e) => {
    const {
      id,
      value,
    } = e.target;

    this.setState(prevState => ({
      ...prevState,
      [id]: {
        value,
        error: '',
      },
    }));
  }
  valueCheck = (e) => {
    const {
      id,
      value,
    } = e.target;

    const error = formCheck(id, value);

    if (error.length) {
      this.setState(prevState => ({
        ...prevState,
        [id]: {
          value,
          error,
        },
        isValid: false,
      }));
    }
  }
  selectChange = (e) => {
    const {
      id,
      value,
    } = e.target;
    this.setState(prevState => ({
      ...prevState,
      regionValue: 0,
      [id]: value,
    }));
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
      cityValue,
      regionValue,
    } = this.state;

    const region = cityData.region[cityValue]; // 鄉鎮地區

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
              type="tel"
              value={cellphone.value}
              isInvalid={cellphone.error}
              onChange={this.formChange}
              onBlur={this.valueCheck}
              pattern="09[0-9]{8}"
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group md={6}>
            <label htmlFor="cityValue">縣市</label>
            <select id="cityValue" className="form-control" defaultValue={cityValue} onChange={this.selectChange}>
              {
                cityData.city.map((c, i) => <option value={i} key={c}>{c}</option>)
              }
            </select>
          </Form.Group>
          <Form.Group md={4}>
            <label htmlFor="regionValue">鄉鎮地區</label>
            <select id="regionValue" className="form-control" value={regionValue} onChange={this.selectChange}>
              {
                region.map((r, i) => <option value={i} key={r}>{r}</option>)
              }
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
