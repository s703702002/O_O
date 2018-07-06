const products = (
  state = {
    message: null,
    products: [],
  },
  action,
) => {
  switch (action.type) {
    case 'RECEIVE_PRODUCTS':
      return {
        products: action.response,
        message: null,
      };
    case 'GET_PRODUCTS_ERROR':
      return {
        products: [],
        message: action.error,
      };
    default:
      return state;
  }
};

export default products;
