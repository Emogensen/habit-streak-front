import { axiosInstance } from '../api/axiosSetup';

export const validateToken = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }

    await axiosInstance.get('auth/token/validate');

    return true;
  } catch (error) {
    console.error('Token validation error: ', error);
    return false;
  }
};
