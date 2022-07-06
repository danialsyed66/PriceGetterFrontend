import axios from '../../utils/axios';

import {
  CLEAR_ERRORS,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  GET_SELLER_PRODUCTS_REQUEST,
  GET_SELLER_PRODUCTS_SUCCESS,
  GET_SELLER_PRODUCTS_FAIL,
  GET_SELLER_ORDERS_REQUEST,
  GET_SELLER_ORDERS_SUCCESS,
  GET_SELLER_ORDERS_FAIL,
  PROCESS_ORDER_REQUEST,
  PROCESS_ORDER_SUCCESS,
  PROCESS_ORDER_FAIL,
  DASHBOARD_REQUEST,
  DASHBOARD_SUCCESS,
  DASHBOARD_FAIL,
  HANDLE_REFUND_REQUEST,
  HANDLE_REFUND_SUCCESS,
  HANDLE_REFUND_FAIL,
} from '../consts';

export const createProduct = productData => async dispatch => {
  try {
    dispatch({ type: CREATE_PRODUCT_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const {
      data: { data },
    } = await axios.post(`api/v1/products`, productData, config);

    dispatch({
      type: CREATE_PRODUCT_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateProduct = (productData, id) => async dispatch => {
  try {
    dispatch({ type: UPDATE_PRODUCT_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const {
      data: { data },
    } = await axios.patch(`api/v1/products/${id}`, productData, config);

    dispatch({
      type: UPDATE_PRODUCT_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getSellerProducts = () => async dispatch => {
  try {
    dispatch({ type: GET_SELLER_PRODUCTS_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const {
      data: { data },
    } = await axios.get(`api/v1/seller/products`, config);

    dispatch({
      type: GET_SELLER_PRODUCTS_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: GET_SELLER_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getSellerOrders = () => async dispatch => {
  try {
    dispatch({ type: GET_SELLER_ORDERS_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const {
      data: { data },
    } = await axios.get(`api/v1/seller/orders`, config);

    dispatch({
      type: GET_SELLER_ORDERS_SUCCESS,
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: GET_SELLER_ORDERS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const processOrder = id => async dispatch => {
  try {
    dispatch({ type: PROCESS_ORDER_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    await axios.patch(`api/v1/orders/${id}`, config);

    dispatch({
      type: PROCESS_ORDER_SUCCESS,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: PROCESS_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getDashboard = () => async dispatch => {
  try {
    dispatch({ type: DASHBOARD_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const {
      data: { data },
    } = await axios.get(`api/v1/seller/dashboard`, config);

    dispatch({
      type: DASHBOARD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DASHBOARD_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const handleRefund = (id, actions) => async dispatch => {
  try {
    dispatch({ type: HANDLE_REFUND_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const {
      data: { data },
    } = await axios.patch(`api/v1/payment/refund/${id}`, actions, config);

    dispatch({
      type: HANDLE_REFUND_SUCCESS,
      payload: data.order,
    });
  } catch (error) {
    dispatch({
      type: HANDLE_REFUND_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => ({ type: CLEAR_ERRORS });
