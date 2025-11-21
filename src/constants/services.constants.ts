import axios from "axios";
const URL = import.meta.env.VITE_URL_BASE!

export const AxiosConnect = axios.create({
    baseURL: URL,
    withCredentials: true 
})