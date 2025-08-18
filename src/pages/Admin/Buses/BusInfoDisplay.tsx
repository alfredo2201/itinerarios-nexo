import RowAutobusesComponent from "../../../components/Autobuses/TableAutobuses/RowAutobusesComponent";
import RowAutobusesItinerarioComponent from "../../../components/Autobuses/TableAutobusesItinerario/RowAutobusesItinerarioComponent";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { getTransportByName } from "../../../services/TransportService";
import type { ItineraryInterface, Trasportation } from "../../../models/Trasportation";

function BusInfoPage() {
    const location = useLocation();
    const { foto, nombreEmpresa } = location.state || {};
    //Estado para guardar el itinerario del autobus seleccionado
    const [itinerario, setItinerario] = useState<ItineraryInterface[]>([]);
    const [trasportData, setTrasportData] = useState<Trasportation[]>([]);
    //Estado para guardar el id del autobus seleccionado
    const [idSelected, setIdSelected] = useState<string | null>(null);
    //Estado para ver si hay que mostrar la tabla de itinerarios
    const [isVisibleItinerarios, setIsVisibleItinerarios] = useState(false);



    //Funcion para cambiar la visibilidad de la tabla de itinerarios
    const toggleItinerarios = (id: string) => {
        //So el id seleccionado es el mismo que el que ya esta seleccionado, se oculta la tabla
        if (idSelected === id) {
            setIsVisibleItinerarios(!isVisibleItinerarios);
            setItinerario([])
            setIdSelected(null);
        } else {
            //Si no hay ningun id seleccionado, se muestra la tabla
            if (idSelected == null) {
                setIsVisibleItinerarios(!isVisibleItinerarios);
            }
            //Se guarda el id seleccionado y se busca el itinerario del autobus con ese id
            setIdSelected(id);
            const selectedAutobus = trasportData.find(item => item.UUID === id);
            //Verificar que selectedAutobus no sea undefined
            if (selectedAutobus) {
                //Se actualiza el estado del itinerario con el itinerario del autobus seleccionado
                setItinerario(selectedAutobus.itinerary.slice(0, 5));
            }

        }

    }

    // useEffect para traer todo los datos de el autobus seleccionado
    useEffect(() => {
        getTransportByName(nombreEmpresa).then(response => {
            if (response && response.data) {
                const companyData = response.data;
                // Verificar que la empresa tenga camiones
                if (companyData && companyData.length > 0) {
                    setTrasportData(companyData);
                } else {
                    console.error("No hay camiones disponibles para esta empresa.");
                }
            } else {
                console.error("No se encontraron datos de la empresa.");
            }
        }).catch(error => {
            console.error("Error al obtener los datos de la empresa:", error);
        })
    }, [nombreEmpresa]);

    return (
        <div className="h-full p-10 overflow-auto">
            <div className="mb-3">
                <img src={foto} alt="" className="h-15 " />
            </div>
            <div className="flex flex-col sm:flex-row w-full h-100 gap-5 ">
                <div className="w-full bg-white max-h-200 min-h-150 rounded-lg p-8 overflow-auto shadow-xl/10 ">
                    <h2 className="text-base font-bold">Estado de Autobuses</h2>
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
                                    <RowAutobusesComponent key={item.UUID} id={item.UUID} numero={item.code} estadoGps={item.gpsStatus} ultimaVista={item.lastSeen} toggleItinerarios={toggleItinerarios} />
                                ))
                            }
                        </tbody>
                    </table>
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

                <div className="bg-white w-full h-auto rounded-lg p-8 shadow-xl/10">
                    <h2 className="text-base font-bold">Itinerarios de Hoy</h2>
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
                                        {
                                            itinerario.map(item => (
                                                <RowAutobusesItinerarioComponent key={item.UUID} horaSalida={item.departureTime}
                                                    origen={item.origin} destino={item.destination} duracion={item.duration} />
                                            ))
                                        }
                                    </tbody>
                                </table>
                                <div className="flex justify-between items-center px-4 py-6">
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
                            </>
                            :
                            <></>
                    }

                </div>
            </div>
        </div>
    )
}

export default BusInfoPage;