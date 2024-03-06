import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance, setAuthToken } from '../api/axiosSetup';

export type User = {
  email: string;
  password: string;
};

export type NewUser = User & {
  name: string;
};

type UserInfo = {
  id: string;
  name: string;
  email: string;
};

type AuthApiState = {
  userInfo?: UserInfo | null;
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
};

const initialState: AuthApiState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo') as string)
    : null,
  status: 'idle',
  error: null
};

export const login = createAsyncThunk('login', async (data: User) => {
  console.log('login started');
  const response = await axiosInstance.post('auth/login', data);
  const { accessToken, user } = response.data;

  localStorage.setItem('token', accessToken);
  localStorage.setItem('userInfo', JSON.stringify(user));
  setAuthToken(accessToken);

  return user;
});

export const register = createAsyncThunk('register', async (data: NewUser) => {
  const response = await axiosInstance.post('auth/register', data);
  const { accessToken, user } = response.data;

  localStorage.setItem('token', accessToken);
  localStorage.setItem('userInfo', JSON.stringify(user));
  setAuthToken(accessToken);

  return user;
});

export const logout = createAsyncThunk('logout', async () => {
  try {
    await axiosInstance.post('auth/logout', {});
  } catch (error) {
    console.error('Logout error: ', error);
  }

  localStorage.removeItem('userInfo');
  localStorage.removeItem('token');
  setAuthToken(null);

  return { success: true };
});

export const renewToken = createAsyncThunk('renewToken', async () => {
  try {
    const response = await axiosInstance.post('auth/token/renew');

    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<UserInfo>) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Login failed';
      })
      .addCase(register.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<UserInfo>) => {
        state.status = 'idle';
        state.userInfo = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Registration failed';
      })
      .addCase(logout.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = 'idle';
        state.userInfo = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message ?? 'Logout failed';
      })
      .addCase(renewToken.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(renewToken.fulfilled, (state) => {
        state.status = 'idle';
        state.error = null;
      })
      .addCase(renewToken.rejected, (state) => {
        state.status = 'failed';
        state.error = 'Token renewal failed';
      });
  }
});

export default authSlice.reducer;
