// import { Middleware } from '@reduxjs/toolkit';
// import { renewToken } from '../slices/authSlice';
// import { setAuthToken } from '../api/axiosInstance';

// export const refreshTokenMiddleware: Middleware = (store) => (next) => async (action) => {
//   if (action.type.endsWith('rejected') && action.error.message === 'Invalid Token') {
//     try {
//       const response = await store.dispatch(renewToken()).unwrap();
//       const { accessToken } = response;

//       localStorage.setItem('token', accessToken);
//       setAuthToken(accessToken);

//       store.dispatch(action.meta.arg);
//     } catch (error) {
//       console.error('Error refreshing token:', error);
//     }
//   } else {
//     return next(action);
//   }
// };
