import axios from '../../utils/axios';

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
  ASK_REFUND_REQUEST,
  ASK_REFUND_SUCCESS,
  ASK_REFUND_FAIL,
  CLEAR_ERRORS,
} from '../consts';

export const createOrder = order => async dispatch => {
  try {
    dispatch({
      type: CREATE_ORDER_REQUEST,
    });

    const { data } = await axios.post('/api/v1/orders', order);

    dispatch({
      type: CREATE_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_ORDER_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

export const getMyOrders = () => async dispatch => {
  try {
    dispatch({
      type: MY_ORDERS_REQUEST,
    });

    const { data } = await axios.get('/api/v1/orders/my');

    dispatch({
      type: MY_ORDERS_SUCCESS,
      payload: data.data.orders,
    });
  } catch (error) {
    dispatch({
      type: MY_ORDERS_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

export const getOrderDetails = id => async dispatch => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    const {
      data: { data },
    } = await axios.get(`/api/v1/orders/${id}`);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

export const refundRequest = (id, message) => async dispatch => {
  try {
    dispatch({
      type: ASK_REFUND_REQUEST,
    });

    const {
      data: { data },
    } = await axios.patch(`/api/v1/orders/requestRefund/${id}`, { message });

    dispatch({
      type: ASK_REFUND_SUCCESS,
      payload: data.order,
    });
  } catch (error) {
    dispatch({
      type: ASK_REFUND_FAIL,
      payload: error?.response?.data?.error,
    });
  }
};

export const clearErrors = () => ({ type: CLEAR_ERRORS });
