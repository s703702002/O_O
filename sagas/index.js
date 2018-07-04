import { all } from 'redux-saga/effects';
import { watchRequestLogin } from './loginSaga';

export default function* rootSaga() {
  yield all([
    watchRequestLogin(),
  ]);
}
