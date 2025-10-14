import axios from "axios";
//import { user } from "../data/UserData";
import type { UserProfileToken } from "../models/User";
import { handleError } from "../helpers/ErrorHandler";
const api = "localhost:4000/api";

export const loginAPI = async (user: { email: string; password: string }) => {
    try {        
        const data = await axios.post<UserProfileToken>(`http://localhost:4000/api/users/login`,user, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'origin': 'x-requested-with',
                'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
            }
        });
        if(data) return data.data
    } catch (error) {
        console.error("Error en loginAPI:", error);
        handleError(error);
    }
}

export const registerAPI = async (user: { username: string; password: string, email: string }) => {
    try {
        const data = await axios.post<UserProfileToken>(api + 'account/register', user);
        return data
    } catch (error) {
        console.error("Error en loginAPI:", error);
        handleError(error);
    }
}