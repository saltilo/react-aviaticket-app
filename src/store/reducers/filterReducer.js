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
      const filterName = action.payload;

      if (filterName === "all") {
        const newAllValue = !state.all;

        return {
          all: newAllValue,
          transfers: {
            0: newAllValue,
            1: newAllValue,
            2: newAllValue,
            3: newAllValue,
          },
        };
      } else {
        const updatedTransfers = {
          ...state.transfers,
          [filterName]: !state.transfers[filterName],
        };

        const allChecked = Object.values(updatedTransfers).every(Boolean);

        return {
          all: allChecked,
          transfers: updatedTransfers,
        };
      }

    default:
      return state;
  }
};

export default filterReducer;
