import {
  HOME_PAGE_REQUEST,
  HOME_PAGE_SUCCESS,
  HOME_PAGE_FAIL,
  CLEAR_ERRORS,
} from '../consts';

const reducer = (state = {}, { type, payload }) => {
  switch (type) {
    case HOME_PAGE_REQUEST:
      return { ...state, loading: true };

    case HOME_PAGE_SUCCESS:
      return { ...state, loading: false, home: payload };

    case HOME_PAGE_FAIL:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case CLEAR_ERRORS:
      return { ...state, error: null };
    default:
      return state;
  }
};

export default reducer;
