import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance } from '../api/axiosSetup';

type UserInfo = {
  id: string;
  name: string;
  email: string;
};

type UserProfileData = {
  name: string;
  email: string;
};

type UserApiState = {
  userInfo?: UserInfo | null;
  userProfileData?: UserProfileData | null;
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
};

const initialState: UserApiState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo') as string)
    : null,
  userProfileData: undefined,
  status: 'idle',
  error: null
};

export const getUser = createAsyncThunk('profile', async (userId: string) => {
  const response = await axiosInstance.get(`users/${userId}`);

  return response.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userProfileData = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Get user profile data failed';
      });
  }
});

export default userSlice.reducer;
