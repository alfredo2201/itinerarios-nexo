import { Link } from "react-router";
import BoxBuses from "../../../components/Autobuses/BoxBuses/BoxBuses";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { getAllCompanies } from "../../../services/TransportService";
import type { Company } from "../../../models/Trasportation";



function AdminBusesPage() {
    const [companies, setCompanies] = useState<Company[] | undefined>([]);

    const fetchCompanies = async () => {
        try {
            // Simulación de una llamada a la API
            const data = await getAllCompanies().then(response => {
                if (response && response.data && response.data) {
                    return response.data;
                }
            })
            if(data !== undefined) setCompanies(data);
        } catch (error) {
            console.error("Error fetching companies:", error);
        }
    };

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
        fetchCompanies();
    }, []);


    return (
        <div className="flex flex-col ">
            <div className="flex flex-col md:flex-row md:flex-wrap items-center h-150 pt-15 px-5 gap-5 md:gap-10 justify-center">
                {companies && companies.length > 0 ? (
                    companies.map((company) => (
                        <BoxBuses key={company.UUID} foto={company.image} nombreEmpresa={company.companyName}/>
                    ))
                ) : (
                    <p className="text-gray-500">No hay lineas de autobuses disponibles</p>
                )}                
            </div>
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