import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';

export default function configureStore(preloadedState) {
  const sagaMiddleware = createSagaMiddleware();
  let middlewares;

  if (process.env.NODE_ENV !== 'production') {
    middlewares = [
      createLogger(),
      sagaMiddleware,
    ];
  } else {
    middlewares = [
      sagaMiddleware,
    ];
  }

  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(...middlewares),
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
