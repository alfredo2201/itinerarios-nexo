import { useItineraries } from "../../hooks/useItineraries";
import CellTableDisplay from "./CellTableDisplay";

interface Props {
    typeDisplay: number
}
function TableDisplay({ typeDisplay }: Props) {

    const { itineraries,displayDoble } = useItineraries();

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
                    {typeDisplay == 1 ?
                        <>
                            {itineraries.map(item =>
                                <CellTableDisplay
                                    key={item._id || ''}
                                    departureTime={item.departureTime}
                                    destino={item.destination.name}
                                    autobusImg={item.company?.image}
                                    numero={item.transport ? item.transport.code : 'N/A'}
                                    estado='Activo'
                                />)}
                        </> :
                        <>
                        {displayDoble.map(item =>
                                <CellTableDisplay
                                    key={item._id || ''}
                                    departureTime={item.departureTime}
                                    destino={item.destination.name}
                                    autobusImg={item.company?.image}
                                    numero={item.transport ? item.transport.code : 'N/A'}
                                    estado='Activo'
                                />)}
                        </>
                    }
                </tbody>
            </table>
        </>

    )
}

export default TableDisplay;