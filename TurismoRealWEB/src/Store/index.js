import { configureStore } from '@reduxjs/toolkit'
import  userReducer from './userStore'

export default configureStore({
  reducer: {token : userReducer},
})