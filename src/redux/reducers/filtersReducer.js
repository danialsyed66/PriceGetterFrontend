import { SET_FILTERS, UPDATE_FILTERS } from '../consts';

const reducer = (state = {}, { type, payload }) => {
  switch (type) {
    case SET_FILTERS:
      return { ...state, filters: payload };

    case UPDATE_FILTERS:
      return {
        ...state,
        filters: { ...state.filters, ...payload },
      };

    default:
      return state;
  }
};

export default reducer;
