import {
  SET_FILTERS_REQUEST,
  SET_FILTERS_SUCCESS,
  UPDATE_FILTERS_SUCCESS,
} from '../consts';

export const setFilters = filters => dispatch => {
  dispatch({
    type: SET_FILTERS_REQUEST,
  });

  dispatch({
    type: SET_FILTERS_SUCCESS,
    payload: { page: 1, ...filters },
  });
};

export const updateFilters = filters => dispatch => {
  dispatch({
    type: UPDATE_FILTERS_SUCCESS,
    payload: filters,
  });
};
