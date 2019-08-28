import React, {useReducer, useCallback} from 'react';
import {
  render,
  fireEvent,
  cleanup,
} from '@testing-library/react';
import { renderHook, act } from '@testing-library/react-hooks'
import Form, { useFormState } from '../../src/components/Form'

afterEach(cleanup);

test('Form render correct', () => {
  const { result } = renderHook(() => useFormState())
  const { getByLabelText, getByDisplayValue, container, asFragment } = render(
    <Form
      state={result.current.state}
      formChange={result.current.formChange}
      selectChange={result.current.selectChange}
    />
  )

  act(() => {
    expect(result.current.validateForm()).toBeFalsy();
  })

  const nameInput = getByLabelText('姓名')
  act(() => {
    fireEvent.change(nameInput, { target: { value: 'acccdbc' } });
  })
  expect(result.current.state.name.value).toBe('acccdbc')

  const cellphoneInput = getByLabelText('手機');
  act(() => {
    fireEvent.change(cellphoneInput, { target: { value: '0912345678' } });
  })
  expect(result.current.state.cellphone.value).toBe('0912345678');

  const addressInput = getByLabelText('地址');
  act(() => {
    fireEvent.change(addressInput, { target: { value: 'anywhere' } });
  })
  expect(result.current.state.address.value).toBe('anywhere');

  act(() => {
    expect(result.current.validateForm()).toBeTruthy();
  })

  expect(asFragment()).toMatchSnapshot()
});
