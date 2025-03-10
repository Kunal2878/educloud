import { createSlice } from '@reduxjs/toolkit'

const dataSlice = createSlice({
  name: 'userData',
  initialState: {
    mob:'',
    role:'',
    user:[]

  },
  reducers: {
    setData: (state,action) => {
   state.user=action.payload

    },
    setRole: (state,action) => {
      // state.id = action.payload.id,
      state.role = action.payload
    },
    setUser:(state,action) => {
      state.user=action.payload
    }
   
  },
})

export const {setData,setRole,setUser} = dataSlice.actions
export default dataSlice.reducer