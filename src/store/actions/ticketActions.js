import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSearchId = createAsyncThunk(
  "tickets/fetchSearchId",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://aviasales-test-api.kata.academy/search"
      );
      if (!response.ok) throw new Error("Ошибка при получении searchId");
      const data = await response.json();
      return data.searchId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTickets = createAsyncThunk(
  "tickets/fetchTickets",
  async (searchId, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`
      );
      if (!response.ok) throw new Error("Ошибка при получении билетов");
      const data = await response.json();
      if (!Array.isArray(data.tickets))
        throw new Error("Полученные билеты не массив!");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
