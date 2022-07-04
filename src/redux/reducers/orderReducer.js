import {
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CREATE_ORDER_FAIL,
  MY_ORDERS_REQUEST,
  MY_ORDERS_SUCCESS,
  MY_ORDERS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  CLEAR_ERRORS,
  ASK_REFUND_REQUEST,
  ASK_REFUND_SUCCESS,
  ASK_REFUND_FAIL,
} from '../consts';

const reducer = (state = {}, { type, payload }) => {
  switch (type) {
    case CREATE_ORDER_REQUEST:
      return { ...state, loading: true };

    case CREATE_ORDER_SUCCESS:
      return { ...state, loading: false, order: payload };

    case CREATE_ORDER_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};

export const myOrdersReducer = (state = { orders: [] }, { type, payload }) => {
  switch (type) {
    case MY_ORDERS_REQUEST:
      return { ...state, loading: true };

    case MY_ORDERS_SUCCESS:
      return { ...state, loading: false, orders: payload };

    case MY_ORDERS_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = { order: {} },
  { type, payload }
) => {
  switch (type) {
    case ORDER_DETAILS_REQUEST:
    case ASK_REFUND_REQUEST:
      return { ...state, loading: true };

    case ORDER_DETAILS_SUCCESS:
    case ASK_REFUND_SUCCESS:
      return { ...state, loading: false, order: payload };

    case ORDER_DETAILS_FAIL:
    case ASK_REFUND_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};

export default reducer;
