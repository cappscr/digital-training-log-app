import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data);

export { fetcher };
