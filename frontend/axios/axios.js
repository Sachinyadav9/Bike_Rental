import axios from 'axios';
import { UNSAFE_AwaitContextProvider } from 'react-router-dom';

const axiosInstance = axios.create({
    baseURL : import.meta.env.VITE_API_URL || 'http://localhost:5001/api/auth',
    withCredentials : true
});

export default axiosInstance;