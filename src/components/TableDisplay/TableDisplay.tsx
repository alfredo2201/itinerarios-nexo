import CellTableDisplay from "./CellTableDisplay";
import { useEffect, useState } from "react";
import { getAllItineraries } from "../../services/TransportService";
import type { ItineraryTable } from "../../interfaces/types";

interface Props {
    typeDisplay: number
}


function TableDisplay({ typeDisplay }: Props) {
    const [itineraries, setItineraries] = useState<ItineraryTable[]>([]);

    useEffect(() => {
        if (typeDisplay != 1) {
            getAllItineraries().then(response => {
                if (response && response.data) {
                    setItineraries(response.data)
                }
            })
        } else {
            getAllItineraries(15, 28).then(response => {
                if (response && response.data) {
                    setItineraries(response.data)
                }
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itineraries]);

    useEffect(() => {
        // Actualiza cada 5 minutos (300000 ms)
        const intervalo = setInterval(() => {
            if (typeDisplay != 1) {
                getAllItineraries().then(response => {
                    if (response && response.data) {
                        setItineraries(response.data)
                    }
                })
            } else {
                getAllItineraries(15, 28).then(response => {
                    if (response && response.data) {
                        setItineraries(response.data)
                    }
                })
            }
        }, 0.5 * 60 * 1000);
        // limpiar el intervalo al desmontar el componente
        return () => clearInterval(intervalo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <>
            <table className="table w-full">
                <thead>
                    <tr className="bg-[#4053AE] text-[#C3D000]">
                        <th className="sm:text-[40px] w-3xs px-3 py-1">Hora</th>
                        <th className="sm:text-[40px] w-xl px-3 py-1">Destino</th>
                        <th className="sm:text-[40px] w-m px-3 py-1">Linea</th>
                        <th className="sm:text-[40px] w-xs px-3 py-1">Número</th>
                        <th className="sm:text-[40px] w-lg px-3 py-1">Observacion</th>
                    </tr>
                </thead>
                <tbody className="h-228">
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