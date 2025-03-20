import { createSlice } from "@reduxjs/toolkit";
import { fetchSearchId, fetchTickets } from "../actions/ticketActions";

const initialState = {
  allTickets: [],
  visibleTickets: [],
  loading: false,
  error: null,
  ticketsCount: 5,
  stop: false,
  searchId: null,
  filters: {
    all: true,
    transfers: { 0: true, 1: true, 2: true, 3: true },
  },
  sortType: "cheapest",
};

const ticketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {
    loadMoreTickets: (state) => {
      state.ticketsCount += 5;
      state.visibleTickets = state.allTickets.slice(0, state.ticketsCount);
    },
    toggleFilter: (state, action) => {
      const filterName = action.payload;
      if (filterName === "all") {
        const allChecked = !state.filters.all;
        state.filters.all = allChecked;
        state.filters.transfers = {
          0: allChecked,
          1: allChecked,
          2: allChecked,
          3: allChecked,
        };
      } else {
        state.filters.transfers[filterName] =
          !state.filters.transfers[filterName];
        state.filters.all = Object.values(state.filters.transfers).every(
          Boolean
        );
      }
    },
    setSortType: (state, action) => {
      state.sortType = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchId.fulfilled, (state, action) => {
        state.searchId = action.payload;
      })
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        const newTickets = action.payload.tickets;

        if (state.allTickets.length >= 10000) {
          state.stop = true;
          state.loading = false;
          return;
        }

        const updatedTickets = [...state.allTickets, ...newTickets].slice(
          0,
          10000
        );
        state.allTickets = updatedTickets;
        state.visibleTickets = updatedTickets.slice(0, state.ticketsCount);

        if (action.payload.stop || updatedTickets.length >= 10000) {
          state.stop = true;
          state.loading = false;
        }
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { loadMoreTickets, toggleFilter, setSortType } =
  ticketSlice.actions;
export default ticketSlice.reducer;
