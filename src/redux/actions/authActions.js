import axios from './axios';

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

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const {
      data: { data, token },
    } = await axios.post('/api/v1/login', userData, config);

    localStorage.setItem('token', token);

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

export const socialLogin = socialData => async dispatch => {
  try {
    const config = { headers: { 'Content-Type': 'application/json' } };
    // console.log('socialLogin', 1);

    // const {
    //   data: {
    //     user: { id, displayName, emails, photos, provider },
    //   },
    // } = await axios.get('/api/v1/auth/login/success', config);
    // console.log('socialLogin', 2, displayName);

    // {
    //   name: displayName,
    //   email: emails[0].value,
    //   avatar: { url: photos[0].value },
    //   provider,
    //   socialId: id,
    // },

    const {
      data: { data, token },
    } = await axios.post('/api/v1/auth/saveUser', socialData, config);
    console.log('socialLogin', 3, token);

    localStorage.setItem('token', token);

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
      data: { data, token },
    } = await axios.post('/api/v1/register', userData, config);

    localStorage.setItem('token', token);

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

export const logout = () => dispatch => {
  try {
    // await axios.post('/api/v1/logout');
    localStorage.removeItem('token');

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
