// axiosInstance.js
import axios from 'axios';
let SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;

const axiosInstance = axios.create({
  baseURL: SERVER_BASE_URL,
});

export default axiosInstance;
