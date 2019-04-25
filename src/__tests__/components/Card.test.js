import React from 'react';
import {
  render,
  cleanup,
} from 'react-testing-library';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Card from '../../components/Card';

afterEach(cleanup);

// this is a handy function that I would utilize for any component
// that relies on the router being in context
function renderWithRouter(
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {}
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
  }
}

const mockItem1 = {
  title: 'mock title',
  gender: 0,
  price: 2100,
  inventory: 199,
  id: "124",
};

const mockItem2 = {
  title: 'mock 2',
  gender: 1,
  price: 300,
  inventory: 99,
  id: "332",
};

test('Card Render', () => {
  const { asFragment } = renderWithRouter(
    <Card
      item={mockItem1}
      col={5}
    />
  )
  expect(asFragment()).toMatchSnapshot()
});

test('Card Render mock2', () => {
  const { asFragment } = renderWithRouter(
    <Card
      item={mockItem2}
      col={4}
    />
  )
  expect(asFragment()).toMatchSnapshot()
});
