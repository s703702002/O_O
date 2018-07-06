import { all } from 'redux-saga/effects';
import watchRequestLogin from './loginSaga';
import watchRequsetProducts from './productsSaga';

export default function* rootSaga() {
  yield all([
    watchRequestLogin(),
    watchRequsetProducts(),
  ]);
}
