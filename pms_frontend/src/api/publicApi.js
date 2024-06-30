import axios from "axios";
import { BACKEND_URL } from "../utility/constants";

const publicApi = axios.create({ 
    baseURL: BACKEND_URL,
    withCredentials: true
});

export default publicApi
