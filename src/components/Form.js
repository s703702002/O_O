import React, { Component, useState, useReducer, useCallback } from 'react';
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

const FormControl = React.memo(({
  id = null,
  type = 'text',
  label = '標題文字',
  placeholder = '',
  onChange = null,
  onBlur = null,
  isInvalid = '',
  pattern = null,
  value,
  defaultValue
}) => {
  return (
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
      pattern={pattern}
      value={value}
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
)});

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

function reducer(state, action) {
  switch(action.type) {
    case 'SET_VALUE':
      return {
        ...state,
        [action.target]: {
          value: action.value,
          error: ''
        }
      }
    case 'SET_ERROR':
      return {
        ...state,
        [action.target]: {
          ...state[action.target],
          error: action.error
        }
      }
    case 'SET_REMARK_VALUE':
      return {
        ...state,
        remark: action.value
      }
    case 'SET_CITY':
      return {
        ...state,
        cityValue: action.value,
        regionValue: '0'
      }
    case 'SET_REGION':
      return {
        ...state,
        regionValue: action.value
      }
    case 'VALIDATE_ALL':
      return {
        ...state,
        ...action.copy
      }
    default:
      return state
  }
};

export function useFormState(initialState) {
  initialState = Object.assign({
    name: {
      value: '',
      error: ''
    },
    cellphone: {
      value: '',
      error: ''
    },
    address: {
      value: '',
      error: ''
    },
    remark: '',
    cityValue: '0',
    regionValue: '0',
  }, initialState)
  
  const [state, dispatch] = useReducer(reducer, initialState);

  const formChange = useCallback((e) => {
    const id = e.currentTarget.id

    if (id === 'remark') {
      return dispatch({
        type: 'SET_REMARK_VALUE',
        value:  e.currentTarget.value
      })
    }

    dispatch({
      type: 'SET_VALUE',
      target: id,
      value:  e.currentTarget.value
    })
  }, [dispatch]);

  const valueCheck = useCallback((e) => {
    const {
      id,
      value,
    } = e.currentTarget;

    const error = formCheck(id, value);

    if (error.length) {
      dispatch({
        type: 'SET_ERROR',
        target: id,
        error
      })
    }
  }, [formCheck, dispatch]);

  const selectChange = useCallback((e) => {
    const {
      id,
      value,
    } = e.target;

    if (id === 'regionValue') {
      return  dispatch({
        type: 'SET_REGION',
        value,
      });
    }

    dispatch({
      type: 'SET_CITY',
      value,
    });
  }, [dispatch])

  const validateForm = () => {
    const copy = clone(state);
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

    dispatch({
      type: 'VALIDATE_ALL',
      copy
    })

    return isValid;
  }

  return {
    state,
    dispatch,
    formChange,
    valueCheck,
    selectChange,
    validateForm
  }
}

const Form = (props) => {
  const {
    className,
    state: {
      name,
      cellphone,
      address,
      remark,
      cityValue,
      regionValue,
    },
    formChange,
    onBlurCallBack,
    selectChange,
  } = props

  const region = cityData.region[cityValue]; // 鄉鎮地區

  return (
    <form className={className}>
      <FormRow>
        <FormGroup md={6}>
          <FormControl
            label="姓名"
            id="name"
            placeholder="陳阿三"
            value={name.value}
            isInvalid={name.error}
            onChange={formChange}
            onBlur={onBlurCallBack}
          />
        </FormGroup>
        <FormGroup md={6}>
          <FormControl
            id="cellphone"
            label="手機"
            placeholder="0912345678"
            type="tel"
            value={cellphone.value}
            isInvalid={cellphone.error}
            onChange={formChange}
            onBlur={onBlurCallBack}
            pattern="09[0-9]{8}"
          />
        </FormGroup>
      </FormRow>
      <FormRow>
        <FormGroup md={6}>
          <label htmlFor="cityValue">縣市</label>
          <select id="cityValue" className="form-control" value={cityValue} onChange={selectChange}>
            {
              cityData.city.map((c, i) => <option value={i} key={c}>{c}</option>)
            }
          </select>
        </FormGroup>
        <FormGroup md={4}>
          <label htmlFor="regionValue">鄉鎮地區</label>
          <select id="regionValue" className="form-control" value={regionValue} onChange={selectChange}>
            {
              region.map((r, i) => <option value={i} key={r}>{r}</option>)
            }
          </select>
        </FormGroup>
        <FormGroup md={2}>
          <FormControl
            id="inputZip"
            label="郵遞區號"
            defaultValue="114"
          />
        </FormGroup>
      </FormRow>
      <FormRow>
        <FormGroup md={12}>
          <FormControl
            id="address"
            label="地址"
            value={address.value}
            isInvalid={address.error}
            onChange={formChange}
            onBlur={onBlurCallBack}
            value={address.value}
          />
        </FormGroup>
      </FormRow>
      <FormRow>
        <FormGroup md={12}>
          <label htmlFor="remark">備註</label>
          <textarea
            className="form-control"
            id="remark"
            rows="3"
            value={remark}
            onChange={formChange}
          />
        </FormGroup>
      </FormRow>
    </form>
  );
}

const inputPropType = PropTypes.shape({
  value: PropTypes.string,
  error: PropTypes.string,
})

Form.propTypes = {
  state: PropTypes.shape({
    name: inputPropType,
    cellphone: inputPropType,
    address: inputPropType,
    remark: PropTypes.string,
    cityValue: PropTypes.string,
    regionValue: PropTypes.string,
  }),
  className: PropTypes.string,
  onBlurCallBack: PropTypes.func,
  formChange: PropTypes.func.isRequired,
  selectChange: PropTypes.func.isRequired,
}
Form.defaultProps = {
  className: 'customer_info_form'
}

// class Form extends Component {
//   static propTypes = {
//     className: PropTypes.string,
//   };
//   static defaultProps = {
//     className: null,
//   };
//   static Row = FormRow;
//   static Group = FormGroup;
//   static Control = FormControl;
//   state = {
//     name: {
//       value: '',
//       error: '',
//     },
//     cellphone: {
//       value: '',
//       error: '',
//     },
//     address: {
//       value: '',
//       error: '',
//     },
//     remark: {
//       value: '',
//       error: '',
//     },
//     cityValue: 0,
//     regionValue: 0,
//     isValid: false,
//   };
//   getValid() {
//     return this.valueCheckAll();
//   }
//   valueCheckAll = () => {
//     const copy = clone(this.state);
//     const keys = Object.keys(copy);
//     let isValid = true;
//     keys.forEach((id) => {
//       const { value } = copy[id];

//       // 代表是不需驗證的欄位
//       if (typeof value === 'undefined') return;

//       copy[id] = {
//         value,
//         error: formCheck(id, value),
//       };

//       if (copy[id].error.length > 0) isValid = false;
//     });
//     this.setState(() => ({
//       ...copy,
//       isValid,
//     }));
//     return isValid;
//   }
//   formChange = (e) => {
//     const {
//       id,
//       value,
//     } = e.target;

//     this.setState(() => ({
//       [id]: {
//         value,
//         error: '',
//       },
//     }));
//   }
//   valueCheck = (e) => {
//     const {
//       id,
//       value,
//     } = e.target;

//     const error = formCheck(id, value);

//     if (error.length) {
//       this.setState(() => ({
//         [id]: {
//           value,
//           error,
//         },
//         isValid: false,
//       }));
//     }
//   }
//   selectChange = (e) => {
//     const {
//       id,
//       value,
//     } = e.target;
//     this.setState(() => ({
//       regionValue: 0,
//       [id]: value,
//     }));
//   }
//   render() {
//     const {
//       className,
//     } = this.props;

//     const {
//       name,
//       cellphone,
//       address,
//       remark,
//       cityValue,
//       regionValue,
//     } = this.state;

//     const region = cityData.region[cityValue]; // 鄉鎮地區

//     return (
//       <form className={className}>
//         <Form.Row>
//           <Form.Group md={6}>
//             <Form.Control
//               label="姓名"
//               id="name"
//               placeholder="陳阿三"
//               value={name.value}
//               isInvalid={name.error}
//               onChange={this.formChange}
//               onBlur={this.valueCheck}
//             />
//           </Form.Group>
//           <Form.Group md={6}>
//             <Form.Control
//               id="cellphone"
//               label="手機"
//               placeholder="0912345678"
//               type="tel"
//               value={cellphone.value}
//               isInvalid={cellphone.error}
//               onChange={this.formChange}
//               onBlur={this.valueCheck}
//               pattern="09[0-9]{8}"
//             />
//           </Form.Group>
//         </Form.Row>
//         <Form.Row>
//           <Form.Group md={6}>
//             <label htmlFor="cityValue">縣市</label>
//             <select id="cityValue" className="form-control" defaultValue={cityValue} onChange={this.selectChange}>
//               {
//                 cityData.city.map((c, i) => <option value={i} key={c}>{c}</option>)
//               }
//             </select>
//           </Form.Group>
//           <Form.Group md={4}>
//             <label htmlFor="regionValue">鄉鎮地區</label>
//             <select id="regionValue" className="form-control" value={regionValue} onChange={this.selectChange}>
//               {
//                 region.map((r, i) => <option value={i} key={r}>{r}</option>)
//               }
//             </select>
//           </Form.Group>
//           <Form.Group md={2}>
//             <Form.Control
//               id="inputZip"
//               label="郵遞區號"
//               defaultValue="114"
//             />
//           </Form.Group>
//         </Form.Row>
//         <Form.Group>
//           <Form.Control
//             id="address"
//             label="地址"
//             value={address.value}
//             isInvalid={address.error}
//             onChange={this.formChange}
//             onBlur={this.valueCheck}
//             value={address.value}
//           />
//         </Form.Group>
//         <Form.Row>
//           <Form.Group md={12}>
//             <label htmlFor="remark">備註</label>
//             <textarea
//               className="form-control"
//               id="remark"
//               rows="3"
//               value={remark.value}
//               onChange={this.formChange}
//             />
//           </Form.Group>
//         </Form.Row>
//       </form>
//     );
//   }
// }

export default Form;
