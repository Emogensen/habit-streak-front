import { axiosInstance } from '../api/axiosSetup';

export const validateToken = async (token: string | null): Promise<string | boolean> => {
  try {
    if (!token) {
      return false;
    }

    await axiosInstance.get('auth/token/validate');
    return token;
  } catch (error) {
    console.error('Token validation error: ', error);
    return false;
  }
};
