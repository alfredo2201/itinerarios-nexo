import type { CompanyInfo, Department, UserPermissions, UserPreferences, UserRole } from "../models/User";

export type FormDataUser = {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: UserRole;
    permissions: {
        archivos: {
            subir: boolean;
            eliminar: boolean;
            descargar: boolean;
        };
        itinerarios: {
            ver_todos: boolean;
            ver_detalles: boolean;
            buscar_filtrar: boolean;
        };
        usuarios: {
            crear: boolean;
            editar: boolean;
            eliminar: boolean;
            ver_lista: boolean;
        };
        sistema: {
            configuracion: boolean;
            logs_archivos: boolean;
        };
    };
    empresaInfo: {
        empresa?: string;
        cargo?: string;
        departamento?: Department;
        acceso_restringido: boolean;
        empresas_permitidas: string[];
    };
};

export interface UpdateUserDto {
    email?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    role?: UserRole;
    permissions?:UserPermissions;
    empresaInfo?: CompanyInfo;
    preferencias?: UserPreferences;
    isActive?: boolean;
}