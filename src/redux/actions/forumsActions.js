import axios from '../../utils/axios';

import {
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAIL,
  GET_POST_REQUEST,
  GET_POST_SUCCESS,
  GET_POST_FAIL,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAIL,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
  ADD_POST_SUCCESS,
  ADD_POST_FAIL,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAIL,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAIL,
  CLEAR_ERRORS,
} from '../consts';

export const getPosts = () => async dispatch => {
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

export const getPost = id => async dispatch => {
  try {
    dispatch({
      type: GET_POST_REQUEST,
    });

    const {
      data: { data },
    } = await axios.get(`/api/v1/posts/${id}`);

    dispatch({
      type: GET_POST_SUCCESS,
      payload: data.post,
    });
  } catch (error) {
    dispatch({
      type: GET_POST_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

export const handleLike = postId => async dispatch => {
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

export const deletePost = postId => async dispatch => {
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

export const addPost = post => async dispatch => {
  try {
    const {
      data: { data },
    } = await axios.post('/api/v1/posts', post);

    dispatch({
      type: ADD_POST_SUCCESS,
      payload: data.post,
    });
  } catch (error) {
    dispatch({
      type: ADD_POST_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    await axios.delete(`/api/v1/posts/${postId}/comments/${commentId}`);

    dispatch({
      type: DELETE_COMMENT_SUCCESS,
      payload: commentId,
    });
  } catch (error) {
    dispatch({
      type: DELETE_COMMENT_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

export const addComment = (postId, comment) => async dispatch => {
  try {
    const {
      data: { data },
    } = await axios.post(`/api/v1/posts/${postId}/comments`, comment);

    dispatch({
      type: ADD_COMMENT_SUCCESS,
      payload: data.comments,
    });
  } catch (error) {
    dispatch({
      type: ADD_COMMENT_FAIL,
      payload: error?.response?.data?.message,
    });
  }
};

export const clearErrors = () => ({ type: CLEAR_ERRORS });
