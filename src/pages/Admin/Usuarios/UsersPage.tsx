import { useState, useEffect } from "react";
import UserForm from "../../../components/Users/UserForm";
import UserTable from "../../../components/Users/UserTable";
import { UserRole} from "../../../models/User";
import type { UserFilters } from "../../../types/user-filters.types";
import { useDebounce } from "../../../hooks/useDebounce";

function UserPage() {
    const [showModal, setShowModal] = useState(false);    
    const [searchInput, setSearchInput] = useState("");
    const [filters, setFilters] = useState<UserFilters>({
        search: "",
        role: "",
        verificationStatus: ""
    });

    // Debounce search input to avoid too many re-renders
    const debouncedSearch = useDebounce(searchInput, 300);

    // Update filters when debounced search changes
    useEffect(() => {
        setFilters(prev => ({ ...prev, search: debouncedSearch }));
    }, [debouncedSearch]);

    const handleSearchChange = (value: string) => {
        setSearchInput(value);
    };

    const handleRoleFilterChange = (value: string) => {
        setFilters(prev => ({ ...prev, role: value }));
    };

    const handleVerificationFilterChange = (value: string) => {
        setFilters(prev => ({ ...prev, verificationStatus: value }));
    };

    const clearFilters = () => {
        setSearchInput("");
        setFilters({
            search: "",
            role: "",
            verificationStatus: ""
        });
    };
  

    return (
        <div className="w-full h-14/15 p-8 space-y-3 dark:bg-gray-900">
            {/* Barra superior para los filtros y busqueda */}
            <div className="grid grid-cols-1  sm:grid-cols-4 gap-2 items-center">
                <div onClick={() => setShowModal(true)} className="bg-[#023672] text-white h-10 hover:bg-[#4185D4] cursor-pointer rounded-lg  w-40 flex justify-center items-center">
                    <p>Nuevo Usuario</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 sm:col-span-3 gap-2 items-center">
                    {/* Filtros */}
                    <div className="grid grid-cols-2 gap-2">
                        {/* Filtro por rol */}
                        <select 
                            value={filters.role}
                            name="role"
                            onChange={(e) => handleRoleFilterChange(e.target.value)}
                            className="p-2 rounded-md border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                        >
                            <option value="">Todos los roles</option>
                            <option value={UserRole.ADMINISTRADOR}>Administrador</option>
                            <option value={UserRole.EDITOR}>Editor</option>
                            <option value={UserRole.VISUALIZADOR}>Visualizador</option>
                        </select>
                        
                        {/* Filtro por estado de verificación */}
                        <select 
                            value={filters.verificationStatus}
                            name="verification_status"
                            onChange={(e) => handleVerificationFilterChange(e.target.value)}
                            className="p-2 rounded-md border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                        >
                            <option value="">Todos los estados</option>
                            <option value="verified">Verificado</option>
                            <option value="unverified">No Verificado</option>
                        </select>
                        
                        {/* Botón para limpiar filtros */}
                        {(searchInput || filters.role || filters.verificationStatus) && (
                            <button
                                onClick={clearFilters}
                                className="px-3 py-2 text-sm bg-gray-200 text-gray-700 hover:bg-gray-300 rounded-md transition-colors"
                                title="Limpiar filtros"
                            >
                                Limpiar
                            </button>
                        )}
                    </div>
                    
                    {/* Barra de búsqueda */}
                    <div className="bg-white h-10 w-full rounded-lg shadow-lg flex items-center px-3">
                        <input
                            type="text"
                            placeholder="Buscar por nombre, email o empresa..."
                            name="search"
                            value={searchInput}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            className="w-full h-full outline-none"
                        />
                        {searchInput && searchInput !== debouncedSearch && (
                            <div className="ml-2 text-gray-400" title="Buscando...">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
                            </div>
                        )}
                        {searchInput && (
                            <button
                                onClick={() => handleSearchChange("")}
                                className="ml-2 text-gray-400 hover:text-gray-600"
                                title="Limpiar búsqueda"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <UserTable filters={filters}/>
            <UserForm isOpen={showModal} onClose={() => setShowModal(false)} />
        </div>
    )

}

export default UserPage;