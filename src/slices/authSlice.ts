import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { axiosInstance, setAuthToken } from '../api/axiosSetup';
import axios from 'axios';

export type User = {
  email: string;
  password: string;
};

export type NewUser = User & {
  name: string;
};

export type ErrorResponse = {
  message: string;
  code: number;
};

type UserInfo = {
  id: string;
  name: string;
  email: string;
};

type AuthApiState = {
  userInfo?: UserInfo | null;
  status: 'idle' | 'loading' | 'failed';
  error: ErrorResponse | null;
};

const initialState: AuthApiState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo') as string)
    : null,
  status: 'idle',
  error: null
};

export const login = createAsyncThunk<UserInfo, User, { rejectValue: ErrorResponse }>(
  'login',
  async (data: User, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('auth/login', data);
      const { accessToken, user } = response.data;

      localStorage.setItem('userInfo', JSON.stringify(user));
      setAuthToken(accessToken);

      return user;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue({
          message: error.response.data.message,
          code: error.response.status
        });
      } else {
        return rejectWithValue({ message: 'An unexpected error occurred', code: 500 });
      }
    }
  }
);

export const register = createAsyncThunk<UserInfo, NewUser, { rejectValue: ErrorResponse }>(
  'register',
  async (data: NewUser, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('auth/register', data);
      const { accessToken, user } = response.data;

      localStorage.setItem('userInfo', JSON.stringify(user));
      setAuthToken(accessToken);

      return user;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue({
          message: error.response.data.message,
          code: error.response.status
        });
      } else {
        return rejectWithValue({ message: 'An unexpected error occurred', code: 500 });
      }
    }
  }
);

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

export const renewToken = createAsyncThunk('renewToken', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('auth/token/renew');
    const { accessToken } = response.data;

    setAuthToken(accessToken);

    return accessToken;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMsg = error.response?.data.message ?? 'Token renewal failed';
      const errorCode = error.response?.status ?? 500;
      return rejectWithValue({ message: errorMsg, code: errorCode });
    }
    return rejectWithValue({ message: 'An unexpected error occurred', code: 500 });
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearUser(state) {
      state.userInfo = null;
    }
  },
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
        state.error = action.payload as ErrorResponse;
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
        state.error = action.payload as ErrorResponse;
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
        state.error = {
          message: action.error.message ?? 'Logout failed',
          code: 500
        } as ErrorResponse;
      })
      .addCase(renewToken.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(renewToken.fulfilled, (state) => {
        state.status = 'idle';
        state.error = null;
      })
      .addCase(renewToken.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as ErrorResponse;
      });
  }
});

export const { clearUser } = authSlice.actions;
export default authSlice.reducer;
