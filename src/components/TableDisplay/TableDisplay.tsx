import CellTableDisplay from "./CellTableDisplay";
import { useEffect, useState } from "react";
import { getAllItineraries } from "../../services/TransportService";
import type { ItineraryTable } from "../../interfaces/types";


function TableDisplay() {
    const [itineraries, setItineraries] = useState<ItineraryTable[]>([]);

    useEffect(() => {
        getAllItineraries().then(response => {
            if (response && response.data) {
                setItineraries(response.data)
            }
        })
    }, [itineraries]);

    useEffect(() => {
        // Actualiza cada 5 minutos (300000 ms)
        const intervalo = setInterval(() => {
            getAllItineraries().then(response => {
                if (response && response.data) {
                    setItineraries(response.data)
                }
            })
        }, 0.5 * 60 * 1000);
        // limpiar el intervalo al desmontar el componente
        return () => clearInterval(intervalo);
    }, []);


    return (
        <>
            <table className="table">
                <thead>
                    <tr className="bg-[#4053AE] text-[#C3D000] w-full ">
                        <th className="sm:text-[24px] w-3xs px-3 py-1">Hora</th>
                        <th className="sm:text-[24px] w-lg px-3 py-1">Destino</th>
                        <th className="sm:text-[24px] w-lg px-3 py-1">Linea</th>
                        <th className="sm:text-[24px] w-xs px-3 py-1">Número</th>
                        <th className="sm:text-[24px] w-lg px-3 py-1">Observacion</th>
                    </tr>
                </thead>
                <tbody>
                    {itineraries.map(item =>
                        <CellTableDisplay
                            key={item.itinerary.UUID}
                            departureTime={item.itinerary.departureTime}
                            destino={item.itinerary.destination}
                            autobusImg={item.image}
                            numero={item.code ? item.code : 'N/A'}
                            estado={item.gpsStatus} />)}
                </tbody>
            </table>
        </>

    )
}

export default TableDisplay;