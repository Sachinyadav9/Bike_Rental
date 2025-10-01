import axios from 'axios';
import { UNSAFE_AwaitContextProvider } from 'react-router-dom';

const axiosInstance = axios.create({
    baseURL : "http://localhost:5001/api/auth",
    withCredentials : true
});

export default axiosInstance;