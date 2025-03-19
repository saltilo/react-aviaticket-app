import { SET_FILTERS, TOGGLE_FILTER } from "../actions/filterActions";

const initialState = {
  all: true,
  transfers: { 0: true, 1: true, 2: true, 3: true },
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTERS:
      return { ...state, ...action.payload };

    case TOGGLE_FILTER:
      const updatedFilters = {
        ...state,
        transfers: {
          ...state.transfers,
          [action.payload]: !state.transfers[action.payload],
        },
      };

      const allFiltersChecked = Object.values(updatedFilters.transfers).every(
        Boolean
      );
      updatedFilters.all = allFiltersChecked;

      return updatedFilters;

    default:
      return state;
  }
};

export default filterReducer;
