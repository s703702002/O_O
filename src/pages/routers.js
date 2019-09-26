import Root from './Root';
import Home from './Home';
import ProductPage from './ProductPage';
import CheckoutPage from './CheckoutPage';
import NotFound from './404';
import CustomerInfoPage from './CustomerInfoPage';
import CheckoutFinishPage from './CheckoutFinishPage';

const routes = [
  {
    component: Root,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home,
      },
      {
        path: '/checkout',
        component: CheckoutPage,
      },
      {
        path: '/customerinfo',
        component: CustomerInfoPage,
      },
      {
        path: '/checkoutfinish',
        component: CheckoutFinishPage,
      },
      {
        path: '/:productId',
        component: ProductPage,
      },
      {
        component: NotFound,
      },
    ],
  },
];

export default routes;
