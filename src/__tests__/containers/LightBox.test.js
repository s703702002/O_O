import React from 'react'
import { createStore } from 'redux'
import { render, cleanup } from 'react-testing-library'
import { Provider } from 'react-redux'
import { lightBoxMessage } from '../../reducers'
import LightBoxContainer from '../../containers/LightBoxContainer'

afterEach(cleanup);

const mockInitState = {
  lightBoxMessage: "hello world"
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
  })

  expect(asFragment()).toMatchSnapshot()
});
