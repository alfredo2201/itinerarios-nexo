import { useUser } from "./useUser";
import { UserRole } from "../models/User";

export const useUserPermissions = () => {
    const { user } = useUser();
    
    const canEdit = user?.role === UserRole.ADMINISTRADOR || user?.role === UserRole.EDITOR;
    const canView = !!user;
    const isAdmin = user?.role === UserRole.ADMINISTRADOR;
    
    return {
        canEdit,
        canView,
        isAdmin,
        user
    };
};