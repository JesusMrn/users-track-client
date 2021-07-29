import { configureStore } from '@reduxjs/toolkit'

import usersReducer from '../features/users/usersSlice'
import connectionsReducer from '../features/connections/connectionsSlice'

export default configureStore({
  reducer: {
    users: usersReducer,
    connections: connectionsReducer, 
  },
})
