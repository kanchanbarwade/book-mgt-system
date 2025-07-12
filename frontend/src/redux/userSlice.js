import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  email: '',
  role: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      const { name, email, role } = action.payload;
      state.name = name;
      state.email = email;
      state.role = role;
    },
    clearUser: (state) => {
      state.name = '';
      state.email = '';
      state.role = '';
    }
  }
});

export const { setUserDetails, clearUser } = userSlice.actions;
export default userSlice.reducer;
