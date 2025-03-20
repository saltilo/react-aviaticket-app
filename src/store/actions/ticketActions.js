import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "https://aviasales-test-api.kata.academy";

export const fetchSearchId = createAsyncThunk(
  "tickets/fetchSearchId",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/search`);
      if (!response.ok) {
        throw new Error(`Ошибка ${response.status} при получении searchId`);
      }
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
      const response = await fetch(`${BASE_URL}/tickets?searchId=${searchId}`);
      if (!response.ok) {
        throw new Error(`Ошибка ${response.status} при загрузке билетов`);
      }

      const data = await response.json();
      if (!Array.isArray(data.tickets)) {
        throw new Error("Некорректный формат данных: tickets не массив");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
