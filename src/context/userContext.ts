import { createContext, useContext, type Dispatch, type SetStateAction } from "react";
import type { UserResponseDto } from "../models/User";

export interface UserContextType {
  user: UserResponseDto | undefined;
  setUserContext: Dispatch<SetStateAction<UserResponseDto | undefined>>;
  isInitialized: boolean;
  setIsInitialized: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const useAuth = () => useContext(UserContext);
