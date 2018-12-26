const productPage = (
  state = {
    message: null,
    product: {},
  },
  action,
) => {
  switch (action.type) {
    case 'RECEIVE_PRODUCT':
      return {
        product: action.response,
        message: null,
      };
    case 'GET_PRODUCT_ERROR':
      return {
        product: {},
        message: action.error,
      };
    default:
      return state;
  }
};

export default productPage;
