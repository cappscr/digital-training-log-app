import axios from 'axios';
import { getAccessToken } from '@/lib/auth';

const apiClient = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const fetcher = (url: string) => apiClient.get(url).then((res) => res.data);

export { apiClient, fetcher };
