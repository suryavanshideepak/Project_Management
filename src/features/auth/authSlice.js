import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginUserFromFirebase } from '../../services/authService';

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const userCredential = await loginUserFromFirebase(email, password);
      const userData = userCredential.user;
      localStorage.setItem('userDetails', JSON.stringify(userData));
      return userData; 
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem('userDetails'); 
    },
    setUser: (state, action) => {
      state.user = action.payload;  
    },
  },

  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
  },
});

export const {  logout, setUser } = authSlice.actions;
export default authSlice.reducer;
