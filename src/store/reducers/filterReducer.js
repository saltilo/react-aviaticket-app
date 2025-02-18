import { SET_FILTERS, TOGGLE_FILTER } from "../actions/filterActions";

const initialState = {
  all: true,
  noTransfers: true,
  oneTransfer: true,
  twoTransfers: true,
  threeTransfers: true,
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILTERS:
      return { ...state, ...action.payload };

    case TOGGLE_FILTER:
      const updatedFilters = {
        ...state,
        [action.payload]: !state[action.payload],
      };

      if (action.payload === "all") {
        return {
          all: !state.all,
          noTransfers: !state.all,
          oneTransfer: !state.all,
          twoTransfers: !state.all,
          threeTransfers: !state.all,
        };
      } else {
        const allFiltersChecked =
          updatedFilters.noTransfers &&
          updatedFilters.oneTransfer &&
          updatedFilters.twoTransfers &&
          updatedFilters.threeTransfers;

        return {
          ...updatedFilters,
          all: allFiltersChecked,
        };
      }

    default:
      return state;
  }
};

export default filterReducer;
