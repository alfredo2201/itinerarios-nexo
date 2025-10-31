import toast from "react-hot-toast";
import { getAllUsersAPI } from "../../services/AuthService";
import { UserRole, type UserResponseDto } from "../../models/User";
import { useEffect, useState } from "react";
import { useUser } from "../../hooks/useUser";

export default function UserTable() {
    const { user } = useUser();
    const [users, setUser] = useState<UserResponseDto[]>()
    // Peticion para obtener la lista de usuarios de la base de datos
    async function getAllUsers() {
        try {
            if (user?.role === UserRole.ADMINISTRADOR) {
                const data = await getAllUsersAPI();
                if (data) {
                    setUser(data.data.users)
                    return data;
                }
            }
        } catch (error) {
            console.error("Error busqueda de informacion:", error);
            toast.error("Error al obtener a los usuarios");
        }
    }

    useEffect(() => {
        getAllUsers();
    }, [])
    return (
        <>
            {/* Tabla para visualizar los usuarios */}
            <div className="bg-white h-6/7 w-full rounded-xl rounded-r-xl  shadow-2xl p-3">
                <div className="min-w-full px-5 py-3">
                    <div className="flex bg-gray-200 w-full py-2 px-4 rounded-t-xl">
                        <div className="w-1/5 px-2 ">
                            <span className="text-gray-600 ">Nombre</span>
                        </div>
                        <div className="w-1/5 px-2 text-center">
                            <span className="text-gray-600 ">Correo</span>
                        </div>
                        <div className="w-1/5 px-2 text-center">
                            <span className="text-gray-600 ">Rol</span>
                        </div>
                        <div className="w-1/5 px-2 text-center">
                            <span className="text-gray-600 ">Estatus</span>
                        </div>
                        <div className="w-1/5 px-2 text-center">
                            <span className="text-gray-600 ">Actividad</span>
                        </div>
                    </div>
                    {/* Aquí puedes mapear los usuarios para mostrar las filas */}
                    {users?.map((u) => (
                        <div key={u.id} className="flex border-b border-gray-200  w-full py-2 px-4 items-center">
                            <div className="w-1/5 px-2">{`${u.firstName} ${u.lastName}`}</div>
                            <div className="w-1/5 px-2 ">{u.email}</div>
                            <div className="w-1/5 px-2 text-center">{u.role}</div>
                            <div className="w-1/5 px-2 text-center">{u.isActive ? "Activo" : "Inactivo"}</div>
                            <div className="w-1/5 px-2 items-center text-center">
                                <button className="bg-[#023672] text-white px-3 py-1 rounded-lg hover:bg-blue-600">
                                    Ver Actividades
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}