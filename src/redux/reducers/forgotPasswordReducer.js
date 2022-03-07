import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_RESET,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_RESET,
  CLEAR_ERRORS,
} from '../consts';

const reducer = (state = {}, { type, payload }) => {
  switch (type) {
    case FORGOT_PASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
      return { ...state, loading: true };

    case FORGOT_PASSWORD_SUCCESS:
      return { ...state, loading: false, mailSent: true, message: payload };

    case RESET_PASSWORD_SUCCESS:
      return { ...state, loading: false, isReset: payload };

    case FORGOT_PASSWORD_FAIL:
      return { ...state, loading: false, error: payload };

    case RESET_PASSWORD_FAIL:
      return { ...state, loading: false, error: payload };

    case FORGOT_PASSWORD_RESET:
      return { ...state, mailSent: false };

    case RESET_PASSWORD_RESET:
      return { ...state, isReset: false };

    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};

export default reducer;
