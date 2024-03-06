import React from 'react';
import App from './App.tsx';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store.ts';
import { renewToken } from './slices/authSlice.ts';
import { setupAxiosInterceptors } from './api/axiosSetup.ts';

const getToken = (): string | null => localStorage.getItem('token');

const refreshToken = async (): Promise<string | null> => {
  try {
    const resultAction = await store.dispatch(renewToken());
    const newToken = resultAction.payload?.accessToken;
    if (newToken) {
      localStorage.setItem('token', newToken);
      return newToken;
    }
    return null;
  } catch (error) {
    console.error('Error during renewal of token');
    return null;
  }
};

setupAxiosInterceptors(getToken, refreshToken);

const container = document.getElementById('root')!;

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
