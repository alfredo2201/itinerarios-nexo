import { Link } from "react-router";
import { useEffect, useState } from "react";
import BoxBuses from "../../../components/Autobuses/BoxBuses/BoxBuses";
import { getAllCompanies, getCompanyByName } from "../../../services/CompanyService";
import type { Company } from "../../../models/Trasportation";
import SpinnerSvg from "../../../components/SpinnerSvg";
import { useUser } from "../../../hooks/useUser";
import { UserRole } from "../../../models/User";



function AdminBusesPage() {
    const { user } = useUser();
    const [companies, setCompanies] = useState<Company[] | undefined>([]);
    const [loading, setLoading] = useState(true);

    // Función para obtener las empresas permitidas para el usuario desde la API
    const fetchAllowedCompanies = async () => {
        try {
            setLoading(true);
            const allowedCompaniesIds = user?.empresaInfo.empresas_permitidas;
            if (!allowedCompaniesIds || allowedCompaniesIds.length === 0) {
                setCompanies([]);
                return;
            }
            const allCompanies = await getCompanyByName(allowedCompaniesIds[0]);
            setCompanies([allCompanies]);
        } catch (error) {
            console.error("Error fetching allowed companies:", error);
            setCompanies([]);
        } finally {
            setLoading(false);
        }
    };

    const fetchDataAdmin = async () => {
        try {
            setLoading(true); // Asegúrate de que loading esté en true al inicio        
            const data = await getAllCompanies();

            if (data && Array.isArray(data)) { // Validación más específica
                setCompanies(data);
            } else {
                console.warn("No companies data received or invalid format");
                setCompanies([]); // Establece array vacío como fallback
            }
        } catch (error) {
            console.error("Error fetching companies:", error);
            setCompanies([]); // Array vacío en caso de error
        } finally {
            setLoading(false); // Siempre actualiza loading al final
        }
    };

    //UseEffect para obtener los datos de las lineas de autobuses
    useEffect(() => {
        if (user?.role === UserRole.ADMINISTRADOR) {
            fetchDataAdmin();
        } else {
            fetchAllowedCompanies();
        }
    }, []);


    return (
        <>
            <>
                {loading ?

                    <div className="flex justify-center items-center h-150 pt-15 px-5 gap-5 md:gap-10 dark:bg-gray-900">
                        <SpinnerSvg size={100} className="text-blue-600" />
                    </div>
                    :
                    <div className="flex flex-col md:flex-row md:flex-wrap items-center h-5/6 2xl:h-150 py-15 px-5 gap-5 md:gap-10 justify-center dark:bg-gray-900 overflow-y-auto scrollbar-hide">
                        {companies && companies.length > 0 ? (
                            companies.map((company) => (
                                <BoxBuses key={company._id} foto={company.image} id={company._id} />
                            ))
                        ) : (
                            <p className="text-gray-500">No hay lineas de autobuses disponibles</p>
                        )}
                    </div>
                }
            </>

            {user?.role === UserRole.ADMINISTRADOR && (
                <div className="flex justify-end items-center pr-10 h-1/6 dark:bg-gray-900">
                    <button
                        className="bg-[#023672] text-white w-1/8 h-10 rounded-lg justify-end min-w-30 hover:bg-[#0251B3] cursor-pointer transition duration-150 ease-in-out">
                        <Link to={"/dashboard/transports_info/add"}>Agregar</Link>
                    </button>
                </div>
            )}
        </>

    )
}

export default AdminBusesPage;