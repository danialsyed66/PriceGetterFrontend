import axios from '../../utils/axios';

import {
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAIL,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAIL,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
  CLEAR_ERRORS,
} from '../consts';

export const getPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_POSTS_REQUEST,
    });

    const {
      data: { data },
    } = await axios.get('/api/v1/posts');

    dispatch({
      type: GET_POSTS_SUCCESS,
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: GET_POSTS_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

export const handleLike = (postId) => async (dispatch) => {
  try {
    const {
      data: { data },
    } = await axios.patch(`/api/v1/posts/${postId}`);

    dispatch({
      type: LIKE_POST_SUCCESS,
      payload: { id: postId, likes: data.likes },
    });
  } catch (error) {
    dispatch({
      type: LIKE_POST_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

export const deletePost = (postId) => async (dispatch) => {
  try {
    await axios.delete(`/api/v1/posts/${postId}`);

    dispatch({
      type: DELETE_POST_SUCCESS,
      payload: postId,
    });
  } catch (error) {
    dispatch({
      type: DELETE_POST_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

export const clearErrors = () => ({ type: CLEAR_ERRORS });
