import axios from 'axios';

import {
  HOME_PAGE_REQUEST,
  HOME_PAGE_SUCCESS,
  HOME_PAGE_FAIL,
  CLEAR_ERRORS,
} from '../consts';

export const getHome = userData => async dispatch => {
  try {
    dispatch({
      type: HOME_PAGE_REQUEST,
    });

    const {
      data: { data },
    } = await axios.get(
      'https://price-getter-backend.herokuapp.com/api/v1/products/getHomePage?resPerPage=10'
    );

    dispatch({
      type: HOME_PAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: HOME_PAGE_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};
export const clearErrors = () => ({ type: CLEAR_ERRORS });
