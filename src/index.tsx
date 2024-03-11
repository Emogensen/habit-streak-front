import React from 'react';
import App from './App.tsx';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store.ts';
import { clearUser, renewToken } from './slices/authSlice.ts';
import { setupAxiosInterceptors } from './api/axiosSetup.ts';

const refreshToken = async (): Promise<string | null> => {
  const resultAction = await store.dispatch(renewToken());
  if (renewToken.fulfilled.match(resultAction)) {
    console.log('token renewed: ', resultAction);
    return resultAction.payload;
  } else if (renewToken.rejected.match(resultAction)) {
    console.error('Error during renewal of token', resultAction.error);
    localStorage.removeItem('userInfo');
    store.dispatch(clearUser());
    return null;
  }
  return null;
};

setupAxiosInterceptors(refreshToken);

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
