import { combineReducers } from "@reduxjs/toolkit";
import filterReducer from "./reducers/filterReducer";
import sortReducer from "./reducers/sortReducer";
import ticketReducer from "./reducers/ticketReducer";

const rootReducer = combineReducers({
  filters: filterReducer,
  sort: sortReducer,
  tickets: ticketReducer,
});

export default rootReducer;
