import axios from 'axios';
import getRuntimeConfig from '../config';

const { api } = getRuntimeConfig();

const axiosInstance = axios.create({
  baseURL: api,
  withCredentials: true
});

const setAuthToken = (token: string | null) => {
  if (token) {
    localStorage.setItem('token', token);
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};

export { axiosInstance, setAuthToken };

type TokenRenewCallback = () => Promise<string | null>;

export const setupAxiosInterceptors = (onTokenRenew: TokenRenewCallback) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (
        error.response?.status === 401 &&
        (error.response?.data?.message === 'Invalid Token' ||
          error.response?.data?.message === 'No token provided') &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        const newToken = await onTokenRenew();

        if (newToken) {
          localStorage.setItem('token', newToken);
          originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        }

        return axiosInstance(originalRequest);
      }
      return Promise.reject(error);
    }
  );
};
