import axios from "axios";
import type { User, UserProfileToken, UserResponseDto } from "../models/User";
import { handleError } from "../helpers/ErrorHandler";
import type { FormDataUser } from "../types/user.types";
const URL = import.meta.env.VITE_URL_BASE!
const api = axios.create({
    baseURL: URL,
    withCredentials: true 
})

export const registerUserAPI = async (formData: FormDataUser) => {
    try {
        const response = await api.post(`/users`, formData, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'origin': 'x-requested-with',
                'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error en UserService:", error);
        handleError(error);
        throw error;
    }
}

export const loginAPI = async (user: { email: string; password: string }) => {
    try {        
        const data = await api.post<UserProfileToken>(`/login`,user, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'origin': 'x-requested-with',
                'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
            },
        });
        if(data) return data.data.user
    } catch (error) {
        console.error("Error en loginAPI:", error);
        handleError(error);
    }
}
export const logoutAPI = async () => {
    try {        
        const data = await api.post<UserResponseDto>(`/logout`, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'origin': 'x-requested-with',
                'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
            },
        });
        if(data) return data
    } catch (error) {
        console.error("Error en loginAPI:", error);
        handleError(error);
    }
}

export const getProfileAPI = async () => {
    try {
        const response = await api.get<UserResponseDto>(`/user/`, {            
            headers: {                  
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'origin': 'x-requested-with',
                'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
            }
        });                
        if (response.status == 401) return undefined;
        return response
    } catch (error) {
        if (
            typeof error === "object" &&
            error !== null &&
            "response" in error &&
            typeof (error as any).response === "object" &&
            (error as any).response !== null &&
            "status" in (error as any).response &&
            (error as any).response.status === 401
        ) {
            return undefined;
        }
        handleError(error);
        return null
    }       
}

export const getUserProfilePageAPI = async () => {
    try {
        const response = await api.get<User>(`/user/profile`, {            
            headers: {                  
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'origin': 'x-requested-with',
                'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
            }
        });                
        if (response.status == 401) return undefined;
        return response
    } catch (error) {
        if (
            typeof error === "object" &&
            error !== null &&
            "response" in error &&
            typeof (error as any).response === "object" &&
            (error as any).response !== null &&
            "status" in (error as any).response &&
            (error as any).response.status === 401
        ) {
            return undefined;
        }
        handleError(error);
        return null
    }       
}

