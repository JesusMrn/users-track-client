import { configureStore } from '@reduxjs/toolkit'

import usersReducer from '../features/users/usersSlice'
import connectionsReducer from '../features/connections/connectionsSlice'
import friendsReducer from '../features/friends/friendsSlice'

export default configureStore({
  reducer: {
    users: usersReducer,
    connections: connectionsReducer, 
    friends: friendsReducer,
  },
})
