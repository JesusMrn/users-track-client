import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import { client } from "../../api/client";

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await client.get("http://localhost:3000/users");
  return response;
});

export const addNewUser = createAsyncThunk("users/addNewUser", async (user) => {
  const response = await client.post("http://localhost:3000/users", user);
  return response;
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.fulfilled]: usersAdapter.setAll,
    [addNewUser.fulfilled]: usersAdapter.addOne,
  },
});

export default usersSlice.reducer;

export const { selectAll: selectAllUsers } = usersAdapter.getSelectors(
  (state) => state.users
);
