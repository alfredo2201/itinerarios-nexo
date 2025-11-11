
import {
    Mail,
    Phone,
    Building2,
    Briefcase,
    Server,
    Bell,
    Activity,
    Settings,
    Lock,
    Shield,
    FileText,
    Upload,
    Download,
    Trash2,
    Calendar,
    Eye,
    Users,
    User as UserIcon
} from "lucide-react";
import { UserRole, Department, InitialView } from "../../../models/User";
import type { User } from "../../../models/User";
import { useEffect, useState } from "react";
import { getUserProfilePageAPI } from "../../../services/AuthService";

export default function ProfileUserPage() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const getRoleBadgeColor = (role: UserRole) => {
        switch (role) {
            case UserRole.ADMINISTRADOR:
                return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
            case UserRole.EDITOR:
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            case UserRole.VISUALIZADOR:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getDepartmentIcon = (dept: Department) => {
        switch (dept) {
            case Department.OPERACIONES:
                return <Briefcase className="w-4 h-4" />;
            case Department.SISTEMAS:
                return <Server className="w-4 h-4" />;
            case Department.MARKETING:
                return <Bell className="w-4 h-4" />;
            default:
                return <Building2 className="w-4 h-4" />;
        }
    };

    const formatDate = (date?: Date) => {
        if (!date) return 'N/A';
        return new Date(date).toLocaleDateString('es-MX', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };
    useEffect(() => {
        console.log("Fetching user profile data...");
        const fetchUserData = async () => {
            const response = await getUserProfilePageAPI();
            const data = response?.data;
            setUser(data!);
            console.log(data)
            setLoading(!loading);

        };

        fetchUserData();
    }, []);

    return (
        <div className="w-full mx-auto p-6 space-y-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
            {/* Header Section */}
            {(loading === false && user) ?
                <>
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                                {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                            </div>

                            <div className="flex-1">
                                <div className="flex flex-wrap items-center gap-3 mb-2">
                                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                        {user.firstName} {user.lastName}
                                    </h1>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRoleBadgeColor(user.role)}`}>
                                        {user.role.toUpperCase()}
                                    </span>
                                    {!user.isActive && (
                                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                                            INACTIVO
                                        </span>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                        <Mail className="w-4 h-4" />
                                        <span>{user.email}</span>
                                        {user.seguridad.isEmailVerified && (
                                            <span className="text-green-600 dark:text-green-400 text-sm font-medium">✓ Verificado</span>
                                        )}
                                    </div>
                                    {user.phone && (
                                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                            <Phone className="w-4 h-4" />
                                            <span>{user.phone}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Información de Empresa */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                Información de Empresa
                            </h2>
                            <div className="space-y-3">
                                {user.empresaInfo.empresa && (
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Empresa</p>
                                        <p className="text-gray-900 dark:text-white font-medium">{user.empresaInfo.empresa}</p>
                                    </div>
                                )}
                                {user.empresaInfo.cargo && (
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Cargo</p>
                                        <p className="text-gray-900 dark:text-white font-medium">{user.empresaInfo.cargo}</p>
                                    </div>
                                )}
                                {user.empresaInfo.departamento && (
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Departamento</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            {getDepartmentIcon(user.empresaInfo.departamento)}
                                            <p className="text-gray-900 dark:text-white font-medium capitalize">
                                                {user.empresaInfo.departamento}
                                            </p>
                                        </div>
                                    </div>
                                )}
                                {user.empresaInfo.acceso_restringido && (
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Acceso Restringido</p>
                                        <div className="flex flex-wrap gap-2">
                                            {user.empresaInfo.empresas_permitidas.map((empresa, index) => (
                                                <span key={index} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs font-medium">
                                                    {empresa}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Actividad */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <Activity className="w-5 h-5 text-green-600 dark:text-green-400" />
                                Actividad
                            </h2>
                            <div className="space-y-3">
                                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <span className="text-gray-600 dark:text-gray-300">Archivos Subidos</span>
                                    <span className="font-bold text-gray-900 dark:text-white text-lg">{user.actividad.archivos_subidos}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <span className="text-gray-600 dark:text-gray-300">Itinerarios Consultados</span>
                                    <span className="font-bold text-gray-900 dark:text-white text-lg">{user.actividad.itinerarios_consultados}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <span className="text-gray-600 dark:text-gray-300">Inicios de Sesión</span>
                                    <span className="font-bold text-gray-900 dark:text-white text-lg">{user.actividad.loginCount}</span>
                                </div>
                                {user.actividad.lastLogin && (
                                    <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Último Acceso</p>
                                        <p className="text-gray-900 dark:text-white text-sm mt-1">{formatDate(user.actividad.lastLogin)}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Preferencias */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <Settings className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                Preferencias
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Tema</p>
                                    <p className="text-gray-900 dark:text-white font-medium capitalize mt-1">{user.preferencias.tema}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Vista Inicial</p>
                                    <p className="text-gray-900 dark:text-white font-medium mt-1">
                                        {user.preferencias.vista_inicial === InitialView.LISTA_ITINERARIOS && 'Lista de Itinerarios'}
                                        {user.preferencias.vista_inicial === InitialView.MAPA && 'Mapa de Rastreo'}
                                        {user.preferencias.vista_inicial === InitialView.ANUNCIOS && 'Anuncios'}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Notificaciones</p>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-sm">
                                            <input
                                                type="checkbox"
                                                checked={user.preferencias.notificaciones.nuevos_archivos}
                                                readOnly
                                                className="rounded text-blue-600"
                                            />
                                            <span className="text-gray-700 dark:text-gray-300">Nuevos Archivos</span>
                                        </label>
                                        <label className="flex items-center gap-2 text-sm">
                                            <input
                                                type="checkbox"
                                                checked={user.preferencias.notificaciones.actualizaciones_sistema}
                                                readOnly
                                                className="rounded text-blue-600"
                                            />
                                            <span className="text-gray-700 dark:text-gray-300">Actualizaciones del Sistema</span>
                                        </label>
                                    </div>
                                </div>
                                {user.preferencias.filtros_guardados.length > 0 && (
                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Filtros Guardados</p>
                                        <p className="text-gray-900 dark:text-white font-medium mt-1">
                                            {user.preferencias.filtros_guardados.length} filtros
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Seguridad */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                <Lock className="w-5 h-5 text-red-600 dark:text-red-400" />
                                Seguridad
                            </h2>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <span className="text-gray-600 dark:text-gray-300">Email Verificado</span>
                                    <span className={`font-semibold ${user.seguridad.isEmailVerified ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                        {user.seguridad.isEmailVerified ? '✓ Sí' : '✗ No'}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <span className="text-gray-600 dark:text-gray-300">Intentos Fallidos</span>
                                    <span className="font-bold text-gray-900 dark:text-white">{user.seguridad.failedLoginAttempts}</span>
                                </div>
                                {user.seguridad.accountLockedUntil && (
                                    <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                        <p className="text-sm text-red-800 dark:text-red-200 font-medium">
                                            Cuenta bloqueada hasta: {formatDate(user.seguridad.accountLockedUntil)}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Permisos */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <Shield className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                            Permisos
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {/* Archivos */}
                            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-blue-600" />
                                    Archivos
                                </h3>
                                <div className="space-y-2 text-sm">
                                    <PermissionItem icon={<Upload className="w-3 h-3" />} label="Subir" allowed={user.permissions.archivos.subir} />
                                    <PermissionItem icon={<Download className="w-3 h-3" />} label="Descargar" allowed={user.permissions.archivos.descargar} />
                                    <PermissionItem icon={<Trash2 className="w-3 h-3" />} label="Eliminar" allowed={user.permissions.archivos.eliminar} />
                                </div>
                            </div>

                            {/* Itinerarios */}
                            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-green-600" />
                                    Itinerarios
                                </h3>
                                <div className="space-y-2 text-sm">
                                    <PermissionItem icon={<Eye className="w-3 h-3" />} label="Ver Todos" allowed={user.permissions.itinerarios.ver_todos} />
                                    <PermissionItem icon={<Eye className="w-3 h-3" />} label="Ver Detalles" allowed={user.permissions.itinerarios.ver_detalles} />
                                    <PermissionItem icon={<FileText className="w-3 h-3" />} label="Buscar/Filtrar" allowed={user.permissions.itinerarios.buscar_filtrar} />
                                </div>
                            </div>

                            {/* Usuarios */}
                            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                    <Users className="w-4 h-4 text-purple-600" />
                                    Usuarios
                                </h3>
                                <div className="space-y-2 text-sm">
                                    <PermissionItem icon={<UserIcon className="w-3 h-3" />} label="Crear" allowed={user.permissions.usuarios.crear} />
                                    <PermissionItem icon={<Settings className="w-3 h-3" />} label="Editar" allowed={user.permissions.usuarios.editar} />
                                    <PermissionItem icon={<Trash2 className="w-3 h-3" />} label="Eliminar" allowed={user.permissions.usuarios.eliminar} />
                                    <PermissionItem icon={<Eye className="w-3 h-3" />} label="Ver Lista" allowed={user.permissions.usuarios.ver_lista} />
                                </div>
                            </div>

                            {/* Sistema */}
                            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                    <Server className="w-4 h-4 text-orange-600" />
                                    Sistema
                                </h3>
                                <div className="space-y-2 text-sm">
                                    <PermissionItem icon={<Settings className="w-3 h-3" />} label="Configuración" allowed={user.permissions.sistema.configuracion} />
                                    <PermissionItem icon={<FileText className="w-3 h-3" />} label="Logs de Archivos" allowed={user.permissions.sistema.logs_archivos} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Fechas */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                            Información de Cuenta
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <p className="text-sm text-gray-500 dark:text-gray-400">Fecha de Creación</p>
                                <p className="text-gray-900 dark:text-white font-medium mt-1">{formatDate(user.createdAt)}</p>
                            </div>
                            {/* <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <p className="text-sm text-gray-500 dark:text-gray-400">Última Actualización</p>
                                <p className="text-gray-900 dark:text-white font-medium mt-1">{formatDate(user.updatedAt)}</p>
                            </div> */}
                        </div>
                    </div>
                </>
                :
                <>
                    <div className="flex items-center justify-center min-h-screen">
                        <p className="text-gray-500 dark:text-gray-400">Cargando perfil...</p>
                    </div>
                </>}

        </div>
    );
}

function PermissionItem({ icon, label, allowed }: { icon: React.ReactNode; label: string; allowed: boolean }) {
    return (
        <div className="flex items-center justify-between py-1">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                {icon}
                <span>{label}</span>
            </div>
            <span className={`font-semibold text-sm ${allowed ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {allowed ? '✓' : '✗'}
            </span>
        </div>
    );
}