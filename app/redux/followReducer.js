import { createSlice } from '@reduxjs/toolkit'

export const followSlice = createSlice({
  name: 'following',
  initialState:{
    following:[],
  },
  reducers: {
    RemoveFollowing: (state,action) => {
      state.following = action.payload;
    },
    AddFollowing:(state,action) =>{
      state.following.push(action.payload)
    }
  },
})

export const { RemoveFollowing,AddFollowing} = followSlice.actions

export default followSlice.reducer
