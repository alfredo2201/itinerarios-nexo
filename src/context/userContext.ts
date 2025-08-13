import { createContext, useContext } from "react";
import type { UserProfile } from "../models/User";

type UserContextType = {
    user: UserProfile | null;
    token: string | null;
    registerUser: (email: string, username: string, password: string) => void;
    loginUser: (username: string, password: string) => void;
    logout: () => void;
    isLoggedIn: () => boolean;
}



export const UserContext = createContext<UserContextType>({} as UserContextType);

export const useAuth = () => useContext(UserContext);
