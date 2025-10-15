import RowAutobusesComponent from "../../../components/Autobuses/TableAutobuses/RowAutobusesComponent";
import RowAutobusesItinerarioComponent from "../../../components/Autobuses/TableAutobusesItinerario/RowAutobusesItinerarioComponent";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
//import { getItinerariesByCompany } from "../../../services/ItineraryService";
import { getTransportsForPagination } from "../../../services/TransportService";
import { getCompanyById } from "../../../services/CompanyService";
import type { Company, Itinerary, PaginatedResponseTransport, Trasport } from "../../../models/Trasportation";
import { getItinerariesByTransport } from "../../../services/ItineraryService";
import { usePagination } from "../../../hooks/usePagination";
import { Pagination } from "../../../components/Pagination/Pagination";
import SpinnerSvg from "../../../components/SpinnerSvg";

function BusInfoPage() {
    const location = useLocation();
    const query = location.search;

    const { ITEMS_FOR_PAGE,
        numberArray,
        numberPagination,
        calculatePagination,
        setNumberArrayState,
        setterPage, page } = usePagination();
    //Estado para guardar el itinerario del autobus seleccionado
    const [itinerario, setItinerario] = useState<Itinerary[]>([]);
    const [transportData, setTrasportData] = useState<Trasport[]>([]);
    const [logo, setLogo] = useState<string>('');
    //Estado para guardar el id del autobus seleccionado
    const [idSelected, setIdSelected] = useState<string | null>(null);
    //Estado para ver si hay que mostrar la tabla de itinerarios
    const [isVisibleItinerarios, setIsVisibleItinerarios] = useState(false);
    const [loading, setLoading] = useState<Boolean>(true)
    const [transport, setTransport] = useState<Trasport>()

    //Funcion para cambiar la visibilidad de la tabla de itinerarios
    const toggleItinerarios = (id: string) => {
        //el id seleccionado es el mismo que el que ya esta seleccionado, se oculta la tabla
        if (idSelected === id) {
            setIsVisibleItinerarios(!isVisibleItinerarios);
        } else {
            //Se guarda el id seleccionado y se busca el itinerario del autobus con ese id
            setIdSelected(id);
            setLoading(true)
            setTransport(transportData.find((t) => t._id === id))
            setIsVisibleItinerarios(true);
            getItinerariesByTransport(id).then()
                .then((res) => {
                    setItinerario(res)
                    setLoading(false)
                })
        }        
    }

    const getInformation = async (numberPage: number) => {
        try {
            const response = await getTransportsForPagination(numberPage, query.slice(11));
            if (response.data?.pagination.totalDocuments !== undefined && response.data.pagination.totalPages) {
                setNumberArrayState(response.data.pagination.totalDocuments);
                calculatePagination(response.data.pagination.totalPages);
            }
            const data: PaginatedResponseTransport = response;
            return data;
        } catch (error) {
            console.error("Error fetching itineraries:", error);
            return undefined;
        }
    };

    useEffect(() => {
        getInformation(page).then((response) => {
            if (response?.success) {
                if (response.data?.transports !== undefined) {
                    setTrasportData(response.data.transports)
                };
            }

        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [numberPagination, page]);

    // useEffect para traer todo los datos de el autobus seleccionado
    useEffect(() => {
        getTransportsForPagination(1, query.slice(11)).then(response => {
            if (response.success) {
                const transportData = response.data.transports;
                setNumberArrayState(response.data.pagination.totalDocuments);
                calculatePagination(response.data.pagination.totalPages);
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
        <div className="h-auto pt-4 px-5">
            <div className="mb-5 flex justify-center justify-start sm:justify-between px-7">
                <img src={logo} alt="" className="h-10 2xl:h-15" />
                <button
                    className="bg-[#023672] hover:bg-[#4185D4] px-8 rounded-lg text-white cursor-pointer transition-transform duration-200 hover:scale-102"
                >Subir itinerarios</button>
            </div>

            {/*El cuerpo del estado de los transporte */}
            <div className="flex flex-col sm:flex-row w-full h-auto gap-5 px-5 pb-5">
                <div className="bg-white w-full w-1/2 h-120 2xl:h-180 rounded-lg p-8 shadow-xl/10">
                    <h2 className="text-base text-[16px] 2xl:text-[20px] font-bold pb-2 pl-3">Estado del transporte</h2>
                    <div className={`flex justify-center ${transportData.length <= 0 ? 'items-center' : ''} w-full bg-white h-70 2xl:h-130 rounded-lg overflow-auto scrollbar-hide`}>
                        {transportData.length <= 0 ?
                            <SpinnerSvg size={100} className="text-blue-100 sefl-center" /> :
                            <table className="table-auto md:table-fixed">
                                <thead>
                                    <tr className="bg-[#A3C0E2] text-black w-full">
                                        <th className="text-[13px] 2xl:text-[16px] w-2xs p-2 ">Numero</th>
                                        <th className="text-[13px] 2xl:text-[16px] w-lg p-2 ">Estado</th>
                                        <th className="text-[13px] 2xl:text-[16px] w-2xs p-2 ">Ultima vez visto</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        transportData.map(item => (
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
                        }
                    </div>
                    <div className="flex flex-col sm:flex-row justify-between items-center px-4 py-6">
                        {transportData.length > 0 ?
                            <>
                                <div className="text-sm text-slate-500">
                                    <span>Mostrando </span>
                                    <b>
                                        {1 + ITEMS_FOR_PAGE * (page - 1)}-
                                        {ITEMS_FOR_PAGE * page > numberArray
                                            ? numberArray
                                            : ITEMS_FOR_PAGE * page}
                                    </b>{" "}
                                    de {numberArray}
                                </div>
                                <Pagination
                                    page={page}
                                    setPage={setterPage}
                                    numberPagination={numberPagination}
                                />
                            </>
                            :
                            <>
                            </>
                        }
                    </div>
                </div>

                <div className="bg-white w-full w-1/2 h-120 2xl:h-180 rounded-lg p-8 shadow-xl/10">
                    <h2 className="text-[16px] 2xl:text-[20px] text-base font-bold pb-1 pt-2 pl-3">Itinerarios de Hoy</h2>

                    {isVisibleItinerarios && (
                        <div key="animation-container" className="space-y-4 animate-fade-in">
                            {/* Tabla de itinerarios */}
                            <div className="w-full bg-white h-35 2xl:h-80 rounded-lg overflow-auto scrollbar-hide animate-slide-down">
                                <div
                                    className="w-full bg-white h-35 2xl:h-80 rounded-lg overflow-auto scrollbar-hide animate-slide-down"
                                >
                                    <table className="table-auto md:table-fixed">
                                        <thead>
                                            <tr className="bg-[#A3C0E2] text-black w-full">
                                                <th className="text-[13px] 2xl:text-[16px] w-2xs p-2">Hora de salida</th>
                                                <th className="text-[13px] 2xl:text-[16px] w-lg p-2">Ruta</th>
                                                <th className="text-[13px] 2xl:text-[16px] w-2xs p-2">Duracion</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {loading ? (
                                                <tr className="h-65">
                                                    <td colSpan={3}>
                                                        <div className="flex justify-center">
                                                            <SpinnerSvg size={100} className="text-blue-100 sefl-center" />
                                                        </div>
                                                    </td>
                                                </tr>
                                            ) : (
                                                <>
                                                    {itinerario.map(item => (
                                                        <RowAutobusesItinerarioComponent
                                                            key={item._id}
                                                            horaSalida={item.departureTime}
                                                            origen={item.origin.name}
                                                            destino={item.destination.name}
                                                            duracion={
                                                                `${Math.floor(item.estimatedDuration / 3600000).toString().padStart(2, '0')}` +
                                                                `h${Math.floor((item.estimatedDuration % 3600000) / 60000).toString().padStart(2, '0')}m`
                                                            }
                                                        />
                                                    ))}
                                                </>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div
                                className="h-35 2xl:h-50 mt-5 rounded-lg px-4 py-2 shadow-inner bg-[#F3F6F9] animate-slide-down animation-delay-100"
                            >
                                <p className="text-[16px] font-bold text-center">Informacion adicional</p>
                                <div className="text-[13px] justify-center flex flex-col gap-1 pt-2">
                                    <p><span className="font-bold">Registro:</span> {transport?.registration}</p>
                                    <p><span className="font-bold">Codigo:</span> {transport?.code}</p>
                                    <p><span className="font-bold">Codigo GPS:</span> {transport?.gpsCode == ''? 'Sin GPS':transport?.gpsCode}</p>
                                    <p><span className="font-bold">GPS Estatus:</span> {transport?.gpsStatus === 'inactive'? 'Inactivo':'Activo'}</p>        
                                    <p><span className="font-bold">Estado:</span> {transport?.isActive ? 'Activo':'Inactivo'}</p>
                                    <p><span className="font-bold">Ultima vez visto:</span> {transport?.lastSeen != null ? new Date(transport?.lastSeen).toLocaleString() : 'Sin informacion'}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default BusInfoPage;