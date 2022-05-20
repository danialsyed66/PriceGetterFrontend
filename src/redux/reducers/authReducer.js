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

const reducer = (state = {}, { type, payload }) => {
  switch (type) {
    case LOGIN_REQUEST:
    case REGISTER_REQUEST:
    case LOAD_USER_REQUEST:
      return { ...state, loading: true, isAuth: false };

    case LOGIN_SUCCESS:
    case SOCIAL_LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuth: true,
        user: {
          ...payload,
          favouriteIds: payload?.favourites?.map(
            favourite => favourite.product
          ),
        },
      };

    case LOGIN_FAIL:
    case REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        isAuth: false,
        user: null,
        error: payload,
      };

    case SOCIAL_LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: !state.isAuth && payload,
      };

    case LOAD_USER_FAIL:
      return {
        loading: false,
        isAuth: false,
        user: null,
      };

    case LOGOUT_SUCCESS:
      return {
        loading: false,
        isAuth: false,
        user: null,
      };

    case LOGOUT_FAIL:
      return {
        ...state,
      };

    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};

export default reducer;
