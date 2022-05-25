import { SET_FILTERS, UPDATE_FILTERS } from '../consts';
import arraysEqual from '../../utils/arrayEquals';

export const setFilters = filters => dispatch => {
  try {
    dispatch({
      type: SET_FILTERS,
      payload: filters,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateFilters = filters => (dispatch, getState) => {
  try {
    const { filters: prevFilters } = getState();

    let newReq = false;

    if (filters.page === 1) newReq = true;
    if (prevFilters?.query !== filters?.query) newReq = true;
    if (prevFilters?.onSale !== filters?.onSale) newReq = true;
    if (prevFilters?.leastRating !== filters?.leastRating) newReq = true;
    if (prevFilters?.price?.[0] !== filters?.price?.[0]) newReq = true;
    if (prevFilters?.price?.[1] !== filters?.price?.[1]) newReq = true;
    if (prevFilters?.discount?.[0] !== filters?.discount?.[0]) newReq = true;
    if (prevFilters?.discount?.[1] !== filters?.discount?.[1]) newReq = true;
    if (!arraysEqual(prevFilters?.sellers, filters?.sellers)) newReq = true;
    if (!arraysEqual(prevFilters?.categories, filters?.categories))
      newReq = true;
    if (!arraysEqual(prevFilters?.sort, filters?.sort)) newReq = true;

    if (newReq) filters.page = 1;

    dispatch({
      type: UPDATE_FILTERS,
      payload: { ...filters, newReq },
    });
  } catch (err) {
    console.log(err);
  }
};
