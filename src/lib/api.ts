import axios from 'axios';

export const api = axios.create({
  baseURL: '/api/backend',
  headers: { 'Content-Type': 'application/json' },
  timeout: 30_000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== 'undefined') {
      window.location.assign('/login');
    }
    return Promise.reject(error);
  },
);
