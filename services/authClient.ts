import axios from 'axios';
import { useAuthStore } from '@/store/authStore';
import Cookies from 'js-cookie';

export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';

const authClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

authClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().clearToken();
      Cookies.remove('authToken');
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const fetcher = async (url: string) => {
  try {
    const response = await authClient.get(url);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const err = new Error('An error occurred while fetching the data.');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (err as any).info = error.response?.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (err as any).status = error.response?.status;
      throw err;
    }
    throw error;
  }
};

export default authClient;
