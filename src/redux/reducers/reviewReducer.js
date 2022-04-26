import {
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_RESET,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_RESET,
  CLEAR_ERRORS,
} from '../consts';

const reducer = (state = {}, { type, payload }) => {
  switch (type) {
    case NEW_REVIEW_REQUEST:
    case DELETE_REVIEW_REQUEST:
      return { ...state, loading: true };

    case NEW_REVIEW_SUCCESS:
    case DELETE_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        success: payload.success,
        message: payload.message,
      };

    case NEW_REVIEW_FAIL:
    case DELETE_REVIEW_FAIL:
      return { ...state, loading: false, error: payload.error };

    case NEW_REVIEW_RESET:
    case DELETE_REVIEW_RESET:
      return { ...state, success: false, message: '' };

    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};

export default reducer;
