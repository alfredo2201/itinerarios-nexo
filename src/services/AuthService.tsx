import axios from "axios";
import { user } from "../data/UserData";
import type { UserProfileToken } from "../models/User";
import { handleError } from "../helpers/ErrorHandler";
const api = "http://localhost:5167/api";

export const loginAPI = async (data: { username: string; password: string }) => {
    try {
        //const data = await axios.post<UserProfileToken>(api + 'account/login', user);
        if (data.username === user.userName && data.password === user.password) {
            return {data:user}
        }
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