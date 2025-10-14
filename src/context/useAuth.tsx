import { useEffect, useState } from "react";
import type { UserProfile } from "../models/User"
import { useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { loginAPI, registerAPI } from "../services/AuthService";
import axios from "axios";
import { UserContext } from "./userContext";
import NotFoundPage from "../pages/NotFoundPage";
import { flushSync } from "react-dom";

type Props = { children: React.ReactNode };

export function UserProvider({ children }: Props) {
    const navigate = useNavigate();
    const location = useLocation();
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isInitialized, setIsInitialized] = useState<boolean>(false);

    useEffect(() => {
        const initializeAuth = () => {
            const storedUser = localStorage.getItem("user");
            const storedToken = localStorage.getItem("token");

            if (storedUser && storedToken) {
                setUser(JSON.parse(storedUser));
                setToken(JSON.parse(storedToken)); // Nota: parse el token también
                axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(storedToken)}`;

                // Solo redirigir si estamos en una ruta pública
                if (["/", "/login", "/register"].includes(location.pathname)) {
                    navigate("/dashboard/itinerary");
                }
            }

            setIsInitialized(true);
        };

        initializeAuth();
    }, []);

    const registerUser = async (email: string, username: string, password: string) => {
        await registerAPI({ email, username, password }).then((data) => {
            if (data) {
                localStorage.setItem("token", JSON.stringify(data.data));
                const userObj = {
                    userName: data?.data.user.firstName + data?.data.user.lastName,
                    email: data?.data.user.email
                }
                localStorage.setItem("user", JSON.stringify(userObj));
                flushSync(() => {
                    setUser(userObj);
                    setToken(data?.data.token);
                });
                toast.success("Usuario registrado correctamente");
                navigate("/login");
            }
        }).catch((error: unknown) => {
            console.error("Error en el registro:", error);
            toast.error("Error al registrar el usuario");
        })
    }

    const loginUser = async (email: string, password: string) => {
        try {
            const data = await loginAPI({ email, password })
            if (data) {
                localStorage.setItem("token", JSON.stringify(data.token));
                const userObj = {
                    userName: data?.user.firstName + " " + data?.user.lastName,
                    email: data?.user.email
                }
                localStorage.setItem("user", JSON.stringify(userObj));
                flushSync(() => {
                    setUser(userObj);
                    setToken(data?.token);
                });
                setTimeout(() => {
                    navigate("/dashboard");
                }, 800);
            }
        } catch (error) {
            console.error("Error en el registro:", error);
            toast.error("Error al registrar el usuario");
        }
    }


    const isLoggedIn = () => {
        return !!(user && token);
    }

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setToken(null);
        delete axios.defaults.headers.common['Authorization'];
        navigate("/login");
    }

    // Rutas que no requieren autenticación
    const publicRoutes = ["/", "/login", "/register"];
    const isPublicRoute = publicRoutes.includes(location.pathname);
    const isAuthenticated = !!(user && token);

    // Mostrar loading hasta que se inicialice
    if (!isInitialized) {
        return <div>Loading...</div>;
    }

    // Mostrar contenido si es ruta pública O si está autenticado
    const shouldShowContent = isPublicRoute || isAuthenticated;

    return (
        <UserContext.Provider value={{ user, token, registerUser, loginUser, logout, isLoggedIn }}>
            {shouldShowContent ? children : <NotFoundPage />}
        </UserContext.Provider>
    )

}



