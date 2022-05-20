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
  DELETE_POST_RESET,
  ADD_POST_SUCCESS,
  ADD_POST_FAIL,
  ADD_POST_RESET,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAIL,
  DELETE_COMMENT_RESET,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAIL,
  ADD_COMMENT_RESET,
} from '../consts';

const reducer = (state = { posts: [], post: {} }, { type, payload }) => {
  switch (type) {
    case GET_POSTS_REQUEST:
      return {
        ...state,
        posts: [],
        error: null,
        loading: true,
      };

    case GET_POST_REQUEST:
      return {
        ...state,
        post: {},
        error: null,
        loading: true,
      };

    case GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };

    case GET_POST_SUCCESS:
      return {
        ...state,
        post: payload,
        loading: false,
      };

    case LIKE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload.id ? { ...post, likes: payload.likes } : post
        ),
        post:
          state.post?._id === payload?.id
            ? { ...state.post, likes: payload.likes }
            : state.post,
      };

    case DELETE_POST_SUCCESS:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload),
        message: 'Post Deleted Successfully!',
      };

    case ADD_POST_SUCCESS:
      return {
        ...state,
        posts: [payload, ...state.posts],
        message: 'Post Added Successfully!',
      };

    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments?.filter(
            comment => comment._id !== payload
          ),
        },
        message: 'Comment Deleted Successfully!',
      };

    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        message: 'Comment Added Successfully!',
      };

    case GET_POSTS_FAIL:
    case GET_POST_FAIL:
    case LIKE_POST_FAIL:
    case DELETE_POST_FAIL:
    case ADD_POST_FAIL:
    case DELETE_COMMENT_FAIL:
    case ADD_COMMENT_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case DELETE_POST_RESET:
    case ADD_POST_RESET:
    case DELETE_COMMENT_RESET:
    case ADD_COMMENT_RESET:
      return {
        ...state,
        message: null,
      };

    default:
      return state;
  }
};

export default reducer;
