const shoppingsCarts = (state = [], action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return [...action.response.shoppings];
    case 'LOG_OUT':
      return [];
    case 'ADD_TO_CART':
      return [...state, action.product];
    default:
      return state;
  }
};

export default shoppingsCarts;
