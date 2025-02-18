import { configureStore } from "@reduxjs/toolkit";
import sortReducer from "./reducers/sortReducer";
import filterReducer from "./reducers/filterReducer";

const store = configureStore({
  reducer: {
    sort: sortReducer,
    filters: filterReducer,
  },
});

export default store;
