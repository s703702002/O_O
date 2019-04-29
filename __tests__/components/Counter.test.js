import React from 'react';
import {
  render,
  fireEvent,
  cleanup,
} from 'react-testing-library';
import 'jest-dom/extend-expect';
import Counter from '../../src/components/Counter';

afterEach(cleanup);

test('Counter add', () => {
  const { getByText, container, asFragment } = render(
    <Counter
      defaultValue={5}
      min={4}
      max={7}
    />
  )
  fireEvent.click(getByText('add')) // 6
  fireEvent.click(getByText('add')) // 7
  fireEvent.click(getByText('add')) // 7
  expect(asFragment()).toMatchSnapshot()
});

test('Counter minus', () => {
  const { getByText, container, asFragment } = render(
    <Counter
      defaultValue={5}
      min={4}
      max={7}
    />
  )
  fireEvent.click(getByText('remove')) // 4
  fireEvent.click(getByText('remove')) // 4
  expect(asFragment()).toMatchSnapshot()
});
