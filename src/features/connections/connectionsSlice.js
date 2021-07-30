import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import { client } from "../../api/client";

const connectionsAdapter = createEntityAdapter({
  sortComparer: (a, b) =>
    b.user === a.user && b.userFriendWith === a.userFriendWith,
});

const initialState = connectionsAdapter.getInitialState({
  status: "idle",
  error: null,
});

export const fetchConnections = createAsyncThunk(
  "connections/fetchConnections",
  async () => {
    const response = await client.get("http://localhost:3000/connections");
    return response;
  }
);

export const addNewConnection = createAsyncThunk(
  "connections/addNewConnection",
  async (connection) => {
    const response = await client.post(
      "http://localhost:3000/connections",
      connection
    );
    return response;
  }
);

const connectionsSlice = createSlice({
  name: "connections",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchConnections.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchConnections.fulfilled]: (state, action) => {
      state.status = "succeeded";
      connectionsAdapter.upsertMany(state, action.payload);
    },
    [fetchConnections.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
    [addNewConnection.fulfilled]: connectionsAdapter.addOne,
  },
});

export default connectionsSlice.reducer;

export const { selectAll: selectAllConnections } =
  connectionsAdapter.getSelectors((state) => state.connections);
