// import React from 'react';
// import {
//   render,
//   fireEvent,
//   cleanup,
// } from 'react-testing-library';
// import 'jest-dom/extend-expect';
// import Counter from '../../components/Counter';

// afterEach(cleanup);

// test('loads and display Counter', () => {
//   const { getByText, container, asFragment } = render(<Counter defaultValue={5} />)
//   const count = getByText('5');
//   fireEvent.click(getByText('add'))
//   expect(count.textContent).toBe('6')
// });


import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import Counter from '../../components/Counter';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('Counter minus work!', () => {
  // Test first render and componentDidMount
  act(() => {
    ReactDOM.render(<Counter defaultValue={5} min={4} />, container);
  });
  const minus = container.querySelector('button');
  const span = container.querySelector('.count');
  expect(span.textContent).toBe('5');

  // Test second render and componentDidUpdate
  act(() => {
    minus.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
  act(() => {
    minus.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
  expect(container).toMatchSnapshot();
});

it('Counter add work!', () => {
  // Test first render and componentDidMount
  act(() => {
    ReactDOM.render(<Counter defaultValue={10} max={10} />, container);
  });
  const add = container.querySelector('button:last-child');
  const span = container.querySelector('.count');
  expect(span.textContent).toBe('10');
  
  // Test second render and componentDidUpdate
  act(() => {
    add.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
  act(() => {
    add.dispatchEvent(new MouseEvent('click', {bubbles: true}));
  });
  expect(container).toMatchSnapshot();
});