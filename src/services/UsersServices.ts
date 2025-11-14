import axios from "axios";
import { handleError } from "../helpers/ErrorHandler";
import type { PaginatedUsersResponseForAdmin, UserResponseDto } from "../models/User";
const URL = import.meta.env.VITE_URL_BASE!
const api = axios.create({
    baseURL: URL,
    withCredentials: true 
})

// Get All users (Admin)
export const getAllUsersAPI = async () => {
    try {
        const data = await api.get<PaginatedUsersResponseForAdmin>(`/users`,{
            headers: {                  
                'Content-Type': 'application/json',
            }
        });
        return data
    } catch (error) {
        console.error("Error en getAllUsersAPI:", error);
        handleError(error);
    }   
}

// Delete User (Admin)      
export const deleteUserAPI = async (userId: string) => {
    try {
        const data = await api.delete<UserResponseDto>(`/users/${userId}`, {
            headers: {
              'Content-Type': 'application/json', 
            }
        });
        return data
    } catch (error) {
        console.error("Error en deleteUserAPI:", error);
        handleError(error);
    }
}

// Update User (Admin)  
export const updateUserAPI = async (userId: string, userData: any) => {
    try {
        const data = await api.put<UserResponseDto>(`/users/${userId}`, userData, {
            headers: {
                'Content-Type': 'application/json',            
            }
        });
        return data
    } catch (error) {
        console.error("Error en updateUserAPI:", error);
        handleError(error);
    }   
}