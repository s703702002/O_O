const isNewItem = (state, productId) =>
  !state.some(item => item.product.id === productId);

const handleAddToCart = (state, action) => {
  const { product, count } = action;
  const productId = product.id;
  // 若是不在購物車的產品 就新增一筆資料
  if (isNewItem(state, productId)) {
    return [...state, {
      product,
      count,
    }];
  }
  return state.map((item) => {
    const order = { ...item };
    if (order.product.id === productId) order.count += count;
    return order;
  });
};

const handleReduceCartItem = (state, action) => {
  const { productId } = action;

  return state.map((item) => {
    const order = { ...item };
    if (order.product.id === productId) order.count -= 1;
    return order;
  });
};

const shoppingsCarts = (state = [], action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return [...action.response.shoppings];
    case 'LOG_OUT':
      return [];
    case 'ADD_TO_CART':
      return handleAddToCart(state, action);
    case 'REMOVE_SHOPPING_CART_ITEM':
      return state.filter(item => item.product.id !== action.productId);
    case 'REDUCE_CART_ITEM':
      return handleReduceCartItem(state, action);
    default:
      return state;
  }
};

export default shoppingsCarts;
