import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  CLEAR_ERRORS,
} from '../consts';

const reducer = (state = { products: [] }, { type, payload }) => {
  switch (type) {
    case ALL_PRODUCTS_REQUEST:
      return { ...state, loading: true };
    case ALL_PRODUCTS_SUCCESS:
      if (payload.options.newReq)
        return {
          ...state,
          loading: false,
          products: payload.products,
          totalProducts: payload.totalProducts,
          resPerPage: payload.resPerPage,
          options: payload.options,
        };

      return {
        ...state,
        loading: false,
        products: [...state.products, ...payload.products],
        totalProducts: payload.totalProducts,
        resPerPage: payload.resPerPage,
        options: payload.options,
      };
    case ALL_PRODUCTS_FAIL:
      return { ...state, loading: false, error: payload.error };
    case CLEAR_ERRORS:
      if (state?.options?.newReq)
        return {
          ...state,
          error: null,
          products: [],
        };

      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default reducer;
