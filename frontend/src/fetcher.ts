import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data);

export { fetcher };
