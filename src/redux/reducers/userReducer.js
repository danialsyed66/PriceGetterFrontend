import {
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_RESET,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_SUCCESS,
  CHANGE_PASSWORD_FAIL,
  CHANGE_PASSWORD_RESET,
  HANDLE_FAVOURITE_REQUEST,
  HANDLE_FAVOURITE_SUCCESS,
  HANDLE_FAVOURITE_FAIL,
  HANDLE_FAVOURITE_RESET,
  GET_FAVOURITES_REQUEST,
  GET_FAVOURITES_SUCCESS,
  GET_FAVOURITES_FAIL,
  CLEAR_ERRORS,
} from '../consts';

const reducer = (state = {}, { type, payload }) => {
  switch (type) {
    case UPDATE_PROFILE_REQUEST:
    case CHANGE_PASSWORD_REQUEST:
    case HANDLE_FAVOURITE_REQUEST:
      return { ...state, loading: true };

    case GET_FAVOURITES_REQUEST:
      return { ...state, gettingFavourites: true };

    case UPDATE_PROFILE_SUCCESS:
    case CHANGE_PASSWORD_SUCCESS:
    case HANDLE_FAVOURITE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: payload.status,
        favourites: state.favourites?.filter(
          favourite => favourite._id !== payload.favouriteId
        ),
      };

    case GET_FAVOURITES_SUCCESS:
      return { ...state, gettingFavourites: false, favourites: payload };

    case UPDATE_PROFILE_FAIL:
    case CHANGE_PASSWORD_FAIL:
    case HANDLE_FAVOURITE_FAIL:
    case GET_FAVOURITES_FAIL:
      return { ...state, loading: false, error: payload };

    case UPDATE_PROFILE_RESET:
    case CHANGE_PASSWORD_RESET:
    case HANDLE_FAVOURITE_RESET:
      return { ...state, isUpdated: false };

    case CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};

export default reducer;
