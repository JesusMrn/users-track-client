import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import { client } from "../../api/client";

const chartsAdapter = createEntityAdapter();

const initialState = chartsAdapter.getInitialState();

export const fetchCartsStats = createAsyncThunk(
  "charts/fetchChartsStats",
  async () => {
    const response = await client.get("http://localhost:3000/users/get/stats");
    return response;
  }
);

const chartsSlice = createSlice({
  name: "charts",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCartsStats.fulfilled]: chartsAdapter.setAll,
  },
});

export default chartsSlice.reducer;

export const { selectAll: selectAllCharts } = chartsAdapter.getSelectors(
  (state) => state.charts
);
