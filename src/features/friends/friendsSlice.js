import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter,
  } from '@reduxjs/toolkit';
  
  import { client } from '../../api/client'
  
  const friendsAdapter = createEntityAdapter()
  
  const initialState = friendsAdapter.getInitialState()
  
  export const fetchFriendsByUserId = createAsyncThunk('friends/fetchFriends', async (userId) => {
    const response = await client.get('http://localhost:3000/users/'.concat(userId).concat('/connections'));
    return response;
  });

  const friendsSlice = createSlice({
    name: 'friends',
    initialState,
    reducers: {},
    extraReducers: {
      [fetchFriendsByUserId.fulfilled]: friendsAdapter.setAll,
    },
  });
  
  export default friendsSlice.reducer;
  
  export const {
    selectAll: selectAllFriends,
  } = friendsAdapter.getSelectors((state) => state.friends);
  