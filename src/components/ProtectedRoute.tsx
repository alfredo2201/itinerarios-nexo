import { Navigate, Outlet } from "react-router";
import { UserRole } from "../models/User";
import { useUser } from "../hooks/useUser";
import nexo from '../../src/assets/Logo-empresa.png';
import { useEffect, useState } from "react";

// Definimos el tipo de las props del componente
interface ProtectedRouteProps {
  allowedRoles: UserRole[];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user, isLoading, isInitialized } = useUser();


  // Agregar un delay mínimo de 1 segundo
  const [minLoadingTime, setMinLoadingTime] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinLoadingTime(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (minLoadingTime || isLoading || !isInitialized) {
    return( 
    <div className="dark:bg-gray-900 h-screen w-full bg-white flex items-center justify-center dark:text-white">
      <div className="text-center">
        <img 
          src={nexo} 
          alt="Logo Nexo" 
          className="inline-flex items-center justify-center h-32 mb-6 animate-bounce"
        />   
      </div>
    </div>)
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}