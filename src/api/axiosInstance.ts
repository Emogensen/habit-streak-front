// import axios from 'axios';
// import getRuntimeConfig from '../config';
// import { renewToken } from '../slices/authSlice';
// import store from '../store';

// const { api } = getRuntimeConfig();

// const axiosInstance = axios.create({
//   baseURL: api,
//   withCredentials: true
// });

// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     // const dispatch = useAppDispatch();

//     const originalRequest = error.config;
//     if (
//       error.response.status === 401 &&
//       error.response.data.message === 'Invalid Token' &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;
//       await store.dispatch(renewToken());

//       const newToken = localStorage.getItem('token');
//       setAuthToken(newToken);
//       originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

//       return axiosInstance(originalRequest);
//     }
//     return Promise.reject(error);
//   }
// );

// const setAuthToken = (token: string | null) => {
//   if (token) {
//     axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//   } else {
//     delete axiosInstance.defaults.headers.common['Authorization'];
//   }
// };

// const token = localStorage.getItem('token');

// if (token) {
//   setAuthToken(token);
// }

// export { axiosInstance, setAuthToken };
