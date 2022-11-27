import { createSlice } from '@reduxjs/toolkit'


export const userStore = createSlice({
  name: 'token',
  initialState: {
value: null,
  },
  reducers: {

    Login: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const {Login} = userStore.actions
export const dataUser = (state) => state.token.value
export default userStore.reducer