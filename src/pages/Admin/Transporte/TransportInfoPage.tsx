import RowAutobusesComponent from "../../../components/Autobuses/TableAutobuses/RowAutobusesComponent";
import RowAutobusesItinerarioComponent from "../../../components/Autobuses/TableAutobusesItinerario/RowAutobusesItinerarioComponent";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
//import { getItinerariesByCompany } from "../../../services/ItineraryService";
import { getTransportsByCompanyId } from "../../../services/TransportService";
import { getCompanyById } from "../../../services/CompanyService";
import type { Company, Itinerary, Trasport } from "../../../models/Trasportation";
import { getItinerariesByTransport } from "../../../services/ItineraryService";

function BusInfoPage() {
    const location = useLocation();
    const query = location.search;
    //Estado para guardar el itinerario del autobus seleccionado
    const [itinerario, setItinerario] = useState<Itinerary[]>([]);
    const [trasportData, setTrasportData] = useState<Trasport[]>([]);
    const [logo, setLogo] = useState<string>('');
    //Estado para guardar el id del autobus seleccionado
    const [idSelected, setIdSelected] = useState<string | null>(null);
    //Estado para ver si hay que mostrar la tabla de itinerarios
    const [isVisibleItinerarios, setIsVisibleItinerarios] = useState(false);

    const [loading, setLoading] = useState<Boolean>(true)

    //Funcion para cambiar la visibilidad de la tabla de itinerarios
    const toggleItinerarios = (id: string) => {
        //el id seleccionado es el mismo que el que ya esta seleccionado, se oculta la tabla
        if (idSelected === id) {
            setIsVisibleItinerarios(!isVisibleItinerarios);
        } else {
            //Se guarda el id seleccionado y se busca el itinerario del autobus con ese id
            setIdSelected(id);
            setLoading(true)
            setIsVisibleItinerarios(true);
            getItinerariesByTransport(id).then()
                .then((res) => {
                    console.log('Itinerarios ->', res)
                    setItinerario(res)
                    setLoading(false)
                })
        }

    }

    // useEffect para traer todo los datos de el autobus seleccionado
    useEffect(() => {
        getTransportsByCompanyId(query.slice(11)).then(response => {
            if (response) {
                const transportData = response;
                getCompanyById(query.slice(11)).then((response: Company) => {
                    if (response) {
                        setLogo(response.image)
                    }
                    // Verificar que la empresa tenga camiones
                    if (transportData && transportData.length > 0) {
                        setTrasportData(transportData);
                    } else {
                        console.error("No hay camiones disponibles para esta empresa.");
                    }
                }).catch(error => {
                    console.error("Error al obtener los datos de la empresa:", error);
                })

            } else {
                console.error("No se encontraron datos de la empresa.");
            }
        }).catch(error => {
            console.error("Error al obtener los datos de la empresa:", error);
        })
    }, []);

    return (
        <div className="h-auto py-4 overflow-auto px-5">
            <div className="mb-5 flex justify-center sm:justify-start px-7">
                <img src={logo} alt="" className="h-15 " />
            </div>

            {/*El cuerpo del estado de los transporte */}
            <div className="flex flex-col sm:flex-row w-full h-auto gap-5 px-5 pb-5">
                <div className="bg-white w-full w-1/2 h-180 rounded-lg p-8 shadow-xl/10">
                    <h2 className="text-base font-bold pb-2">Estado de Autobuses</h2>
                    <div className="w-full bg-white max-h-130 min-h-100 rounded-lg overflow-auto ">

                        <table className="table-auto md:table-fixed">
                            <thead>
                                <tr className="bg-[#E9F0F8] text-black w-full">
                                    <th className="w-2xs p-2 ">Numero</th>
                                    <th className="w-lg p-2 ">Estado</th>
                                    <th className="w-2xs p-2 ">Ultima vez visto</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    trasportData.map(item => (
                                        <RowAutobusesComponent
                                            key={item._id}
                                            id={item._id || ''}
                                            numero={item.code}
                                            estadoGps={item.gpsStatus}
                                            ultimaVista={item.lastSeen}
                                            toggleItinerarios={toggleItinerarios} />
                                    ))
                                }
                            </tbody>
                        </table>

                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-center px-4 py-6">
                        <div className="text-sm text-slate-500">
                            Mostrando <b>1-10</b> de 50
                        </div>
                        <div className="flex space-x-1">
                            <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                                Prev
                            </button>
                            <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-white bg-slate-800 border border-slate-800 rounded hover:bg-slate-600 hover:border-slate-600 transition duration-200 ease">
                                1
                            </button>
                            <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                                2
                            </button>
                            <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                                3
                            </button>
                            <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                                Next
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-white w-full w-1/2 h-180 rounded-lg p-8 shadow-xl/10">
                    <h2 className="text-base font-bold pb-1 pt-2">Itinerarios de Hoy</h2>
                    <div className="w-full bg-white max-h-130 min-h-100 rounded-lg overflow-auto ">

                        {
                            isVisibleItinerarios ?
                                <>
                                    <table className="table-auto md:table-fixed">
                                        <thead>
                                            <tr className="bg-[#E9F0F8] text-black w-full">
                                                <th className="w-2xs p-2 ">Hora de salida</th>
                                                <th className="w-lg p-2 ">Ruta</th>
                                                <th className="w-2xs p-2 ">Duracion</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {loading ?
                                                <tr>
                                                    <td colSpan={3}>
                                                        <div className="flex justify-center items-center h-100 pt-15 px-5 gap-5 md:gap-10">
                                                            <div className="loader ease-linear rounded-full border-8 border-t-8 border-blue-200 h-32 w-32"></div>
                                                        </div>
                                                    </td>
                                                </tr>

                                                :
                                                <>
                                                    {
                                                        itinerario.map(item => (
                                                            <RowAutobusesItinerarioComponent
                                                                key={item._id}
                                                                horaSalida={item.departureTime}
                                                                origen={item.origin.name}
                                                                destino={item.destination.name}
                                                                duracion={`${Math.floor(item.estimatedDuration / 3600000).toString().padStart(2, '0')}` +
                                                                    `h${Math.floor((item.estimatedDuration % 3600000) / 60000).toString().padStart(2, '0')}m`} />
                                                        ))
                                                    }
                                                </>
                                            }

                                        </tbody>
                                    </table>
                                </>
                                :
                                <></>
                        }
                        {!isVisibleItinerarios ? <>
                        </> :
                            <div className="flex flex-col sm:flex-row justify-between px-4 py-6">
                                <div className="text-sm text-slate-500">
                                    Mostrando <b>1-10</b> de 50
                                </div>
                                <div className="flex space-x-1">
                                    <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                                        Prev
                                    </button>
                                    <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-white bg-slate-800 border border-slate-800 rounded hover:bg-slate-600 hover:border-slate-600 transition duration-200 ease">
                                        1
                                    </button>
                                    <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                                        2
                                    </button>
                                    <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                                        3
                                    </button>
                                    <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                                        Next
                                    </button>
                                </div>
                            </div>

                        }
                    </div>
                </div>

            </div>
        </div>
    )
}

export default BusInfoPage;