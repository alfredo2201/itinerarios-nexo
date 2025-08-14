import { useEffect, useState } from "react";
import type { UserProfile } from "../models/User"
import { useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { loginAPI, registerAPI } from "../services/AuthService";
import axios from "axios";
import NotFoundPage from "../pages/NotFoundPage";
import { UserContext } from "./userContext";

type Props = { children: React.ReactNode };

export function UserProvider({ children }: Props) {
    const navigate = useNavigate();
    const location = useLocation();
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<UserProfile | null>(null);
    const [isReady, setIsReady] = useState<boolean>(false);

    useEffect(() => {
        const user = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (user && token) {
            setUser(JSON.parse(user));
            setToken(token);
            setIsReady(true);
            axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(token)}`;
        } else {
            setIsReady(false);
        }
    }, []);

    const registerUser = async (email: string, username: string, password: string) => {
        await registerAPI({ email, username, password }).then((data) => {
            if (data) {
                localStorage.setItem("token", JSON.stringify(data.data));
                const userObj = {
                    userName: data?.data.userName,
                    email: data?.data.email
                }
                localStorage.setItem("user", JSON.stringify(userObj));
                setUser(userObj);
                setToken(data?.data.token);
                toast.success("Usuario registrado correctamente");
                navigate("/login");
            }
        }).catch((error: unknown) => {
            console.error("Error en el registro:", error);
            toast.error("Error al registrar el usuario");
        })
    }

    const loginUser = async (username: string, password: string) => {
        await loginAPI({username, password }).then((data) => {
               if (data) {
                   localStorage.setItem("token", JSON.stringify(data.data));
                   const userObj = {
                       userName: data?.data.userName,
                       email: data?.data.email
                   }
                   localStorage.setItem("user", JSON.stringify(userObj));
                   setUser(userObj);
                   setToken('data?.data.token');
                   toast.success("Usuario registrado correctamente");
                   navigate("/itinerary");
               }
           }).catch((error: unknown) => {
               console.error("Error en el registro:", error);
               toast.error("Error al registrar el usuario");
           })
    }

    const isLoggedIn = () => {
        return isReady;
    }

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.clear();
        setUser(null);
        setToken(null);
        navigate("/login");
    }

    return (
        <UserContext.Provider value={{ user, token, registerUser, loginUser, logout, isLoggedIn }}>
            {(isReady || location.pathname == "/login") ? children : <NotFoundPage />}
        </UserContext.Provider>
    )

}



