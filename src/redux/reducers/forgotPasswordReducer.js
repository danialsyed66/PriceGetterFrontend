import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  FORGOT_PASSWORD_RESET,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_RESET,
  VERIFY_OTP_REQUEST,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_FAIL,
  VERIFY_OTP_RESET,
  CLEAR_ERRORS,
} from '../consts';

const reducer = (state = {}, { type, payload }) => {
  switch (type) {
    case FORGOT_PASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
    case VERIFY_OTP_REQUEST:
      return { ...state, loading: true };

    case FORGOT_PASSWORD_SUCCESS:
      return { ...state, loading: false, mailSent: true, message: payload };

    case VERIFY_OTP_SUCCESS:
      return { ...state, loading: false, otpVarified: payload };

    case RESET_PASSWORD_SUCCESS:
      return { ...state, loading: false, isReset: payload };

    case VERIFY_OTP_FAIL:
    case FORGOT_PASSWORD_FAIL:
    case RESET_PASSWORD_FAIL:
      return { ...state, loading: false, error: payload };

    case FORGOT_PASSWORD_RESET:
      return { ...state, mailSent: false };

    case VERIFY_OTP_RESET:
      return { ...state, otpVarified: false };

    case RESET_PASSWORD_RESET:
      return { ...state, isReset: false };

    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};

export default reducer;
