import axios from 'axios';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SOCIAL_LOGIN_SUCCESS,
  SOCIAL_LOGIN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  CLEAR_ERRORS,
} from '../consts';

export const login = userData => async dispatch => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });

    const config = { headers: { 'Content-Type': 'application/json' } };

    const {
      data: { data },
    } = await axios.post('/api/v1/login', userData, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

export const socialLogin = () => async dispatch => {
  try {
    const config = { headers: { 'Content-Type': 'application/json' } };

    const {
      data: {
        user: { id, displayName, emails, photos, provider },
      },
    } = await axios.get('/auth/login/success', config);

    const {
      data: { data },
    } = await axios.post(
      '/auth/saveUser',
      {
        name: displayName,
        email: emails[0].value,
        avatar: { url: photos[0].value },
        provider,
        socialId: id,
      },
      config
    );

    dispatch({
      type: SOCIAL_LOGIN_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: SOCIAL_LOGIN_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

export const register = userData => async dispatch => {
  try {
    dispatch({
      type: REGISTER_REQUEST,
    });

    const config = { headers: { 'Content-Type': 'multipart/form-data' } };

    const {
      data: { data },
    } = await axios.post('/api/v1/register', userData, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

export const loadUser = () => async dispatch => {
  try {
    dispatch({
      type: LOAD_USER_REQUEST,
    });

    const {
      data: { data },
    } = await axios.get('/api/v1/profile');

    dispatch({
      type: LOAD_USER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.post('/api/v1/logout');

    dispatch({
      type: LOGOUT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

export const clearErrors = () => ({ type: CLEAR_ERRORS });
