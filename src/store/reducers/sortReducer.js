import { SET_SORT_TYPE } from "../actions/sortActions";

const initialState = {
  sortType: "cheapest",
};

const sortReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SORT_TYPE:
      return {
        ...state,
        sortType: action.payload,
      };
    default:
      return state;
  }
};

export default sortReducer;
