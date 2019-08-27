import React from 'react';
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
  const nameInput = getByLabelText('姓名')
  act(() => {
    fireEvent.change(nameInput, { target: { value: 'abc' } })
  })
  act(() => {
    expect(result.current.validateForm()).toBeFalsy()
  })
  expect(asFragment()).toMatchSnapshot()
})
