import { Navigate, Outlet } from "react-router";
import { UserRole } from "../models/User";
import { useUser } from "../hooks/useUser";

// Definimos el tipo de las props del componente
interface ProtectedRouteProps {
  allowedRoles: UserRole[];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user, isLoading, isInitialized } = useUser();
  if (isLoading || !isInitialized) {
    return <div>Cargando...</div>;
  } 
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}