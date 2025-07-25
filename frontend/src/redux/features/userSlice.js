import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
};

export const userSlice = createSlice({
  initialState,
  name: 'userSlice',
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    logout: (state, action) => {
      state.user = null;
      localStorage.clear();
    },
  },
});

export default userSlice.reducer;

export const { setUser, setIsAuthenticated, setLoading, logout } =
  userSlice.actions;
