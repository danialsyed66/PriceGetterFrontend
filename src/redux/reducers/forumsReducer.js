import {
  GET_POSTS_REQUEST,
  GET_POSTS_SUCCESS,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAIL,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
  GET_POSTS_FAIL,
  DELETE_POST_RESET,
} from '../consts';

const reducer = (state = { posts: [], error: {} }, { type, payload }) => {
  switch (type) {
    case GET_POSTS_REQUEST:
      return {
        ...state,
        posts: [],
        error: {},
        post: null,
        loading: true,
      };

    case GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };

    case LIKE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
      };

    case DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload),
        message: 'Post Deleted Successfully!',
      };

    case GET_POSTS_FAIL:
    case LIKE_POST_FAIL:
    case DELETE_POST_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case DELETE_POST_RESET:
      return {
        ...state,
        message: null,
      };

    default:
      return state;
  }
};

export default reducer;
