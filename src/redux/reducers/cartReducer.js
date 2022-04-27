import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART,
  SAVE_SHIPPING_INFO,
} from "../consts";

const reducer = (
  state = { cartItems: [], shippingInfo: {} },
  { type, payload }
) => {
  switch (type) {
    case ADD_TO_CART:
      const isInCart = state.cartItems.find((item) => item._id === payload._id);

      if (!isInCart)
        return { ...state, cartItems: [...state.cartItems, payload] };

      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item._id === payload._id ? payload : item
        ),
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item._id !== payload),
      };

    case UPDATE_CART:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item._id === payload.id
            ? { ...item, quantity: payload.quantity }
            : item
        ),
      };

    case SAVE_SHIPPING_INFO:
      return {
        ...state,
        shippingInfo: payload,
      };

    default:
      return state;
  }
};

export default reducer;
