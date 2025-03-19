import { combineReducers } from "@reduxjs/toolkit";
import filterReducer from "./filterReducer";
import sortReducer from "./sortReducer";
import ticketReducer from "./ticketReducer";

const rootReducer = combineReducers({
  filters: filterReducer,
  sort: sortReducer,
  tickets: ticketReducer,
});

export default rootReducer;
