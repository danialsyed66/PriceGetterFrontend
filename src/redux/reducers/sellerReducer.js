import {
  CLEAR_ERRORS,
  CREATE_PRODUCT_FAIL,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_RESET,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_RESET,
  GET_SELLER_PRODUCTS_REQUEST,
  GET_SELLER_PRODUCTS_SUCCESS,
  GET_SELLER_PRODUCTS_FAIL,
  GET_SELLER_ORDERS_REQUEST,
  GET_SELLER_ORDERS_SUCCESS,
  GET_SELLER_ORDERS_FAIL,
  PROCESS_ORDER_REQUEST,
  PROCESS_ORDER_SUCCESS,
  PROCESS_ORDER_FAIL,
  PROCESS_ORDER_RESET,
  DASHBOARD_REQUEST,
  DASHBOARD_SUCCESS,
  DASHBOARD_FAIL,
  HANDLE_REFUND_REQUEST,
  HANDLE_REFUND_SUCCESS,
  HANDLE_REFUND_FAIL,
} from '../consts';

const reducer = (
  state = { product: {}, products: [], orders: [], dashboard: {} },
  { type, payload }
) => {
  switch (type) {
    case CREATE_PRODUCT_REQUEST:
    case UPDATE_PRODUCT_REQUEST:
    case GET_SELLER_PRODUCTS_REQUEST:
    case GET_SELLER_ORDERS_REQUEST:
    case PROCESS_ORDER_REQUEST:
    case DASHBOARD_REQUEST:
    case HANDLE_REFUND_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case CREATE_PRODUCT_SUCCESS:
      return {
        loading: false,
        message: 'Product Created Successfully!',
        product: payload,
      };

    case UPDATE_PRODUCT_SUCCESS:
      return {
        loading: false,
        message: 'Product Updated Successfully!',
        product: payload,
      };

    case GET_SELLER_PRODUCTS_SUCCESS:
      return {
        loading: false,
        products: payload,
      };

    case GET_SELLER_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: payload,
      };

    case DASHBOARD_SUCCESS:
      return {
        loading: false,
        dashboard: payload,
      };

    case PROCESS_ORDER_SUCCESS:
      return {
        loading: false,
        processed: true,
        orders: state.orders.map(order => {
          if (order._id !== payload) return order;

          return {
            ...order,
            deliveredAt: Date.now(),
            orderStatus: 'Delivered',
          };
        }),
      };

    case HANDLE_REFUND_SUCCESS:
      return {
        ...state,
        loading: false,
        processed: true,
        orders: state.orders.map(order =>
          payload._id === order._id ? payload : order
        ),
      };

    case CREATE_PRODUCT_FAIL:
    case UPDATE_PRODUCT_FAIL:
    case GET_SELLER_PRODUCTS_FAIL:
    case GET_SELLER_ORDERS_FAIL:
    case PROCESS_ORDER_FAIL:
    case DASHBOARD_FAIL:
    case HANDLE_REFUND_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case CREATE_PRODUCT_RESET:
    case UPDATE_PRODUCT_RESET:
      return {
        ...state,
        message: null,
      };

    case PROCESS_ORDER_RESET:
      return {
        ...state,
        processed: null,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export default reducer;
