import axios from '../../utils/axios';

import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  CLEAR_ERRORS,
} from '../consts';

export const forgotPassword = email => async dispatch => {
  try {
    dispatch({
      type: FORGOT_PASSWORD_REQUEST,
    });

    const { data } = await axios.post('/api/v1/forgotPassword', { email });

    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

export const resetPassword = (token, userData) => async dispatch => {
  try {
    dispatch({
      type: RESET_PASSWORD_REQUEST,
    });

    const { data } = await axios.patch(
      `/api/v1/resetPassword/${token}`,
      userData
    );

    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      payload: data.status === 'success' ? true : false,
    });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

export const clearErrors = () => ({ type: CLEAR_ERRORS });
