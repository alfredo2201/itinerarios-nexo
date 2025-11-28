import toast from "react-hot-toast";
import { UserRole, type User } from "../../models/User";
import { useEffect, useState, useMemo } from "react";
import { useUser } from "../../hooks/useUser";
import { deleteUserAPI, getAllUsersAPI } from "../../services/UsersServices";
import type { UserFilters } from "../../types/user-filters.types";
import Swal from "sweetalert2";
import { useUserPermissions } from "../../hooks/useUserPermissions";
import { useNavigate } from "react-router";

interface UserTableProps {
    filters: UserFilters;
}

export default function UserTable({ filters }: UserTableProps) {
    const navigate = useNavigate();
    const { user } = useUser();
    const { isAdmin } = useUserPermissions()
    const [users, setUser] = useState<User[]>([])
    const [loading, setLoading] = useState(true);

    // Filtrar usuarios basado en los filtros aplicados
    const filteredUsers = useMemo(() => {
        if (!users) return [];

        return users.filter(u => {
            // Solo mostrar usuarios activos
            if (!u.isActive) return false;

            // Filtro por búsqueda de texto
            if (filters.search) {
                const searchTerm = filters.search.toLowerCase();
                const fullName = `${u.firstName} ${u.lastName}`.toLowerCase();
                const email = u.email.toLowerCase();
                const empresa = u.empresaInfo.empresa?.toLowerCase() || '';

                const matchesSearch =
                    fullName.includes(searchTerm) ||
                    email.includes(searchTerm) ||
                    empresa.includes(searchTerm);

                if (!matchesSearch) return false;
            }

            // Filtro por rol
            if (filters.role && u.role !== filters.role) {
                return false;
            }

            // Filtro por estado de verificación
            if (filters.verificationStatus) {
                const isVerified = u.seguridad.isEmailVerified;
                if (filters.verificationStatus === 'verified' && !isVerified) {
                    return false;
                }
                if (filters.verificationStatus === 'unverified' && isVerified) {
                    return false;
                }
            }

            return true;
        });
    }, [users, filters]);

    // Peticion para obtener la lista de usuarios de la base de datos
    async function getAllUsers() {
        try {
            setLoading(true);
            if (user?.role === UserRole.ADMINISTRADOR) {
                const data = await getAllUsersAPI();
                if (data) {
                    setUser(data.data.users || [])
                    return data;
                }
            }
        } catch (error) {
            console.error("Error busqueda de informacion:", error);
            toast.error("Error al obtener a los usuarios");
        } finally {
            setLoading(false);
        }
    }

    const handleDeleteUser = async (userId: string | undefined) => {
        if (!userId) return;

        Swal.fire({
            title: '¿Estás seguro?',
            text: "Esta acción no se puede deshacer.",
            icon: 'warning',

            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await toast.promise(
                        deleteUserAPI(userId),
                        {
                            loading: 'Eliminando usuario...',
                            success: <b>Usuario eliminado!</b>,
                            error: <b>No se pudo eliminar el usuario.</b>,
                        }
                    );
                    // Refresh the user list after successful deletion
                    await getAllUsers();
                } catch (error) {
                    console.error("Error deleting user:", error);
                }
            }
        })
    }

    const handleEditUser = (u: User) => {
        // Lógica para editar el usuario
        navigate('/dashboard/users/edit', { state: { user: u } });
    }

    useEffect(() => {
        getAllUsers();
    }, [])

    return (
        <>
            {/* Contador de resultados */}
            <div className="bg-white rounded-lg shadow-sm p-3 mb-3 dark:bg-gray-700">
                <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-300">
                    <span>
                        {loading ? (
                            "Cargando usuarios..."
                        ) : (
                            <>
                                Mostrando {filteredUsers.length} de {users.length} usuarios
                                {(filters.search || filters.role || filters.verificationStatus) && (
                                    <span className="ml-2 text-blue-600">(filtrado)</span>
                                )}
                            </>
                        )}
                    </span>
                    {filteredUsers.length > 0 && !loading && (
                        <span className="text-xs">
                            {filters.role && `Rol: ${filters.role} • `}
                            {filters.verificationStatus && `Estado: ${filters.verificationStatus === 'verified' ? 'Verificado' : 'No Verificado'} • `}
                            {filters.search && `Búsqueda: "${filters.search}"`}
                        </span>
                    )}
                </div>
            </div>

            {/* Tabla para visualizar los usuarios */}
            <div className="bg-white h-6/8 sm:h-6/7 w-full rounded-xl rounded-r-xl  shadow-2xl p-3 dark:bg-gray-700 overflow-y-auto scrollbar-hide">
                <table className="min-w-full px-5 py-3">
                    <thead>
                        <tr className="bg-gray-200 w-full py-2 px-4 rounded-t-xl dark:bg-gray-600">
                            <th className="w-1/6 h-10 px-2 text-gray-600 text-left dark:text-gray-300">Empresa</th>
                            <th className="w-1/6 h-10 px-2 text-gray-600 text-left dark:text-gray-300">Nombre</th>
                            <th className="w-1/6 h-10 px-2 text-gray-600 text-left dark:text-gray-300">Email</th>
                            <th className="w-1/6 h-10 px-2 text-gray-600 text-left dark:text-gray-300">Rol</th>
                            <th className="w-1/6 h-10 px-2 text-gray-600 text-left dark:text-gray-300">Estado</th>
                            <th className="w-1/6 h-10 px-2 text-gray-600 text-left dark:text-gray-300">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={6} className="text-center py-8">
                                    <div className="flex justify-center items-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                        <span className="ml-2 text-gray-500">Cargando usuarios...</span>
                                    </div>
                                </td>
                            </tr>
                        ) : filteredUsers.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="text-center py-8 text-gray-500 dark:text-gray-300">
                                    {users.length === 0
                                        ? "No hay usuarios registrados"
                                        : "No se encontraron usuarios que coincidan con los filtros aplicados"
                                    }
                                </td>
                            </tr>
                        ) : (
                            filteredUsers.map((u) => (
                                <tr key={u._id} className="border-b border-gray-200 w-full py-2 px-4 items-center dark:border-gray-600">
                                    <td className="w-1/6 h-10 px-2 dark:text-gray-300">{u.empresaInfo.empresa}</td>
                                    <td className="w-1/6 h-10 px-2 dark:text-gray-300">{`${u.firstName} ${u.lastName}`}</td>
                                    <td className="w-1/6 h-10 px-2 dark:text-gray-300">{u.email}</td>
                                    <td className="w-1/6 h-10 px-2 dark:text-gray-300">{`${u.role.charAt(0).toUpperCase()}${u.role.slice(1)}`}</td>
                                    <td className="w-1/6 h-10 px-2 py-3">
                                        <div className="flex flex-row ">
                                            {u.seguridad.isEmailVerified ?
                                                <div className="p-1 h-auto w-content bg-green-500 text-white text-center rounded-md">
                                                    <p>Verificado</p>
                                                </div>
                                                :
                                                <div className="p-1 h-auto w-content bg-red-500 text-white text-center rounded-md">
                                                    <p>No Verificado</p>
                                                </div>
                                            }
                                        </div>
                                    </td>
                                    <td className="w-1/6 h-10 px-2 py-3 gap-2">
                                        <div className="flex flex-row gap-3 ">
                                            <button className="bg-[#023672] text-white px-2 py-1 rounded-md hover:bg-blue-600 cursor-pointer"
                                                onClick={() => handleEditUser(u)}
                                            >
                                                Editar
                                            </button>
                                            {isAdmin && (
                                                <button
                                                    onClick={() => handleDeleteUser(u._id)}
                                                    className="bg-[#BF3115] text-white px-2 py-1 rounded-md hover:bg-[#D63C1A] cursor-pointer">
                                                    Eliminar
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}