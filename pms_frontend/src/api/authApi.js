import axios from "axios";
import { ACCESS_TOKEN, BACKEND_URL } from "../utility/constants";

const authApi = axios.create({ 
    baseURL: BACKEND_URL,
    withCredentials: true
});

authApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


export default authApi;