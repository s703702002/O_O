import { all } from 'redux-saga/effects';
import watchRequestLogin from './loginSaga';
import watchRequsetProduct from './productSaga';
import watchRequsetProducts from './productsSaga';
import watchAddToCart from './addToCartSaga';

export default function* rootSaga() {
  yield all([
    watchRequestLogin(),
    watchRequsetProduct(),
    watchRequsetProducts(),
    watchAddToCart(),
  ]);
}
