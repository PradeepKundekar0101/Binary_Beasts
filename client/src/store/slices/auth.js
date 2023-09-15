import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null,token:null },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      return state;
    },
    setToken:(state,action) =>{
      state.token = action.payload
      return state;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser,setToken, logout } = authSlice.actions;
export default authSlice.reducer;

