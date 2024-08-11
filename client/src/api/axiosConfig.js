import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://66b72c817f7b1c6d8f1b1fd6.mockapi.io/',
  headers: {
    'Content-Type': 'application/json',
  }
});

export default axiosInstance;
