import React from 'react'
import { createStore } from 'redux'
import { render, cleanup } from '@testing-library/react'
import { Provider } from 'react-redux'
import { lightBoxMessage } from '../../src/reducers'
import LightBoxContainer from '../../src/containers/LightBoxContainer'

afterEach(cleanup);

const mockInitState = {
  lightBoxMessage: 'hello world'
};

const mockEmptyMessage = {
  lightBoxMessage: ''
};

function renderWithRedux(
  ui,
  { initialState, store = createStore(lightBoxMessage, initialState) } = {}
){
  return {
    ...render(
      <Provider store={store}>
        {ui}
      </Provider>,
      store
    )
  }
};

test('<LightBoxContainer /> render', () => {
  const { asFragment } = renderWithRedux(<LightBoxContainer/>, {
    initialState: mockInitState
  });

  expect(asFragment()).toMatchSnapshot();
});

test('<LightBoxContainer /> will render null', () => {
  const { container } = renderWithRedux(<LightBoxContainer/>, {
    initialState: mockEmptyMessage
  });

  expect(container.childElementCount).toBe(0);
});