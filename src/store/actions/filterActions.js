export const SET_FILTERS = "SET_FILTERS";
export const TOGGLE_FILTER = "TOGGLE_FILTER";

export const setFilters = (filters) => ({
  type: SET_FILTERS,
  payload: filters,
});

export const toggleFilter = (filterName) => ({
  type: TOGGLE_FILTER,
  payload: filterName,
});
