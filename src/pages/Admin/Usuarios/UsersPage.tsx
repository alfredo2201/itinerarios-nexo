function UserPage() {
    return (
        <div className="h-full w-full p-8 space-y-3">
            <div className="flex gap-3">
                <div className="bg-[#023672] text-white h-10 hover:bg-gray-200 cursor-pointer rounded-lg  w-40 flex justify-center items-center">
                    <p>Nuevo Usuario</p>
                </div>
                    <div className="bg-[#023672] text-white h-10 hover:bg-gray-200 cursor-pointer rounded-lg  w-40 flex justify-center items-center">
                    <p>Eliminar Usuario</p>
                </div>
            </div>
            {/* Tabla para visualizar los usuarios */}
            <div className="bg-white h-6/7 w-full rounded-xl rounded-r-xl  shadow-2xl p-3">
                <table className="min-w-full table-auto">   
                    <thead className="justify-between">
                        <tr className="bg-gray-200 w-full">
                            <th className="w-1/5 py-2">
                                <span className="text-gray-600">Nombre</span>
                            </th>
                            <th className="w-1/5 py-2">
                                <span className="text-gray-600">Correo</span>
                            </th>
                            <th className="w-1/5 py-2">
                                <span className="text-gray-600">Rol</span>
                            </th>
                            <th className="w-1/5 py-2">
                                <span className="text-gray-600">Estatus</span>
                            </th>
                            <th className="w-1/5 py-2">
                                <span className="text-gray-600">Acciones</span>
                            </th>
                        </tr>
                    </thead>
                </table>
            </div>

        </div>
    )

}

export default UserPage;