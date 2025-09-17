import { Link } from "react-router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import BoxBuses from "../../../components/Autobuses/BoxBuses/BoxBuses";
import { getAllCompanies } from "../../../services/CompanyService";
import type { Company } from "../../../models/Trasportation";



function AdminBusesPage() {
    const [companies, setCompanies] = useState<Company[] | undefined>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const formSuccess = sessionStorage.getItem('formSuccess');
        if (formSuccess === 'true') {
            toast.success(
                <span>
                    <b>Agregado correctamente</b>
                    <p>Se agrego una nueva linea de autobuses a la base de datos</p>
                </span>,
                {
                    duration: 4000,
                    position: "bottom-right"
                }
            );
            sessionStorage.removeItem('formSuccess');
        }
    }, []);
    //UseEffect para obtener los datos de las lineas de autobuses
    useEffect(() => {
        const fetchData = async () => {
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
        fetchData();
    }, []);


    return (
        <div className="flex flex-col ">
            <>
                {loading ?
                    <>
                        <div className="flex justify-center items-center h-150 pt-15 px-5 gap-5 md:gap-10">
                            <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
                        </div>
                    </> :
                    <div className="flex flex-col md:flex-row md:flex-wrap items-center h-150 pt-15 px-5 gap-5 md:gap-10 justify-center">
                        {companies && companies.length > 0 ? (
                            companies.map((company) => (
                                <BoxBuses key={company._id} foto={company.image} id={company._id}/>
                            ))
                        ) : (
                            <p className="text-gray-500">No hay lineas de autobuses disponibles</p>
                        )}
                    </div>
                }
            </>

            <div className="flex justify-end pr-10">
                <button
                    className="bg-[#023672] text-white w-1/8 h-10 rounded-lg justify-end min-w-30 hover:bg-[#0251B3] cursor-pointer transition duration-150 ease-in-out">
                    <Link to={"/transports_info/add"}>Agregar</Link>
                </button>
            </div>
        </div>

    )
}

export default AdminBusesPage;