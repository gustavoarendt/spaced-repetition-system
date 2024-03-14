import axios from 'axios';

export const http = axios.create({
  baseURL: 'http://172.28.176.1:5000',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});
