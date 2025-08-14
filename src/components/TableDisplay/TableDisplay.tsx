import CellTableDisplay from "./CellTableDisplay";
import { useEffect, useState } from "react";
import { getAllItineraries } from "../../services/TransportService";
import type { ItineraryTable } from "../../interfaces/types";


    function TableDisplay() {
        const [itineraries, setItineraries] = useState<ItineraryTable[]>([]);

        //const loadData =() => {

        //}

        useEffect(() => {
            getAllItineraries().then(response => {
                if (response && response.data) {
                    setItineraries(response.data)                    
                }
            })
        }, []);


        return (
            <>
                <table className="table-auto">
                    <thead>
                        <tr className="bg-[#4053AE] text-[#C3D000] w-screen ">
                            <th className="text-[24px] w-3xs px-3 py-1">Hora</th>
                            <th className="text-[24px] w-lg px-3 py-1">Destino</th>
                            <th className="text-[24px] w-lg px-3 py-1">Autobus</th>
                            <th className="text-[24px] w-xs px-3 py-1">Número</th>
                            <th className="text-[24px] w-lg px-3 py-1">Observacion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itineraries.map(item =>
                        <CellTableDisplay
                            key={item.UUID}
                            hora={item.departureTime}
                            destino={item.destination}
                            autobusImg={item.image}
                            numero={item.code ? item.code : 'N/A'}
                            estado={item.gpsStatus} />)}
                    </tbody>
                </table>
            </>

        )
    }

export default TableDisplay;