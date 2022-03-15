import { SET_FILTERS, UPDATE_FILTERS } from '../consts';

export const setFilters = filters => dispatch => {
  dispatch({
    type: SET_FILTERS,
    payload: filters,
  });
};

export const updateFilters = filters => dispatch => {
  dispatch({
    type: UPDATE_FILTERS,
    payload: filters,
  });
};
