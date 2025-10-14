export type UserProfileToken = {
    user:User;
    token: string;
}
export type UserProfile = {
    userName: string;
    email: string;
}

export enum UserRole {
    ADMINISTRADOR = "administrador",
    EDITOR = "editor", 
    VISUALIZADOR = "visualizador"
}

export enum Theme {
    LIGHT = "light",
    DARK = "dark"
}

export enum InitialView {
    LISTA_ITINERARIOS = "itineraries",
    MAPA = "tracking",
    ANUNCIOS = "advertisements"
}

export enum Department {
    OPERACIONES = "operaciones",
    ADMINISTRACION = "administracion",
    SISTEMAS = "sistemas",
    MARKETING = "marketing",
    GERENCIA = "gerencia"
}

export interface UserPermissions {
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
}

export interface CompanyInfo {
    empresa?: string;
    cargo?: string;
    departamento?: Department;
    acceso_restringido: boolean;
    empresas_permitidas: string[];
}
export interface UserPreferences {
    tema: Theme;
    vista_inicial: InitialView;
    filtros_guardados: SavedFilter[];
    notificaciones: {
        nuevos_archivos: boolean;
        actualizaciones_sistema: boolean;
    };
}
export interface SavedFilter {
    nombre: string;
    filtros: {
        empresa?: string;
        ruta?: string;
        fecha_desde?: Date;
        fecha_hasta?: Date;
    };
}

export interface UserActivity {
    archivos_subidos: number;
    ultimo_archivo_subido?: Date;
    itinerarios_consultados: number;
    ultima_consulta?: Date;
    lastLogin?: Date;
    loginCount: number;
}

export interface UserSecurity {
    isEmailVerified: boolean;
    emailVerificationToken?: string;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
    failedLoginAttempts: number;
    accountLockedUntil?: Date;
}
export interface User {
    _id?: string;
    email: string;
    password: string; // Opcional en queries, requerido en creación
    firstName: string;
    lastName: string;
    phone?: string;
    role: UserRole;
    permissions: UserPermissions;
    empresaInfo: CompanyInfo;
    preferencias: UserPreferences;
    actividad: UserActivity;
    seguridad: UserSecurity;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}