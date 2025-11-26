import { useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import type { UserResponseDto } from "../models/User";
import { getProfileAPI } from "../services/AuthService";

type Props = { children: React.ReactNode };

export function UserProvider({ children }: Props) {  
  const [user, setUser] = useState<UserResponseDto | undefined>(undefined);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const init = async () => {
      try {
        const userData = await getProfileAPI();
        if (userData != null && userData.data != null) {
          setUser(userData.data);
          setDarkMode(userData.data.preferencias?.tema === 'dark');
        }
      } catch {
        setUser(undefined);

      } finally {        
        setIsInitialized(true);
        setIsLoading(false);
      }
    };
    init();
  }, []);
  return (
    <UserContext.Provider
      value={{
        user,
        setUserContext: setUser,
        isInitialized,
        setIsInitialized,
        isLoading,
        setIsLoading,
        darkMode
      }}
    >
      {children}
    </UserContext.Provider>
  );
}