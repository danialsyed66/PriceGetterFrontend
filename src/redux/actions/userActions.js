import axios from '../../utils/axios';

import {
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  HANDLE_FAVOURITE_REQUEST,
  HANDLE_FAVOURITE_SUCCESS,
  HANDLE_FAVOURITE_FAIL,
  GET_FAVOURITES_REQUEST,
  GET_FAVOURITES_SUCCESS,
  GET_FAVOURITES_FAIL,
  CLEAR_ERRORS,
} from '../consts';

export const updateProfile = userData => async dispatch => {
  try {
    dispatch({
      type: UPDATE_PROFILE_REQUEST,
    });

    const config = { headers: { 'Content-Type': 'multipart/form-data' } };

    const { data } = await axios.post('/api/v1/profile/edit', userData, config);

    dispatch({
      type: UPDATE_PROFILE_SUCCESS,
      payload: data.status === 'success' ? true : false,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

export const changePassword = userData => async dispatch => {
  try {
    dispatch({
      type: CHANGE_PASSWORD_REQUEST,
    });

    const { data } = await axios.patch('/api/v1/changePassword', userData);

    dispatch({
      type: CHANGE_PASSWORD_SUCCESS,
      payload: data.status === 'success' ? true : false,
    });
  } catch (error) {
    dispatch({
      type: CHANGE_PASSWORD_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

export const getFavourites = () => async dispatch => {
  try {
    dispatch({
      type: GET_FAVOURITES_REQUEST,
    });

    const {
      data: { data },
    } = await axios.get(`/api/v1/favourites`);

    dispatch({
      type: GET_FAVOURITES_SUCCESS,
      payload: data.favourites,
    });
  } catch (error) {
    dispatch({
      type: GET_FAVOURITES_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

export const handleFavourite = (productId, favouriteId) => async dispatch => {
  try {
    dispatch({
      type: HANDLE_FAVOURITE_REQUEST,
    });

    const { data } = await axios.patch(`/api/v1/favourites/${productId}`);

    dispatch({
      type: HANDLE_FAVOURITE_SUCCESS,
      payload: {
        status: data.status === 'success' ? true : false,
        favouriteId,
      },
    });
  } catch (error) {
    dispatch({
      type: HANDLE_FAVOURITE_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

export const clearErrors = () => ({ type: CLEAR_ERRORS });
