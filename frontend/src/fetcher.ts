import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

const fetcher = (url: string) => apiClient.get(url).then((res) => res.data);

export { apiClient, fetcher };
