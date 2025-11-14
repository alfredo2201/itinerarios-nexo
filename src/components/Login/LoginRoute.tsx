import { Navigate } from "react-router";
import LoginPage from "../../pages/Admin/LoginPage";
import { useUser } from "../../hooks/useUser";

function LoginRoute() {
    const { user, isLoading } = useUser();
    if (isLoading) return <div className="dark:bg-gray-900 bg-white h-full flex items-center justify-center">Cargando...</div>;
    if (user) return <Navigate to="/dashboard/itinerary" replace />;
    return (
        <LoginPage />
    );
}

export default LoginRoute;