import { useItineraries } from "../../hooks/useItineraries";
import RowVerticalDisplay from "./RowVerticalDisplay";
function TableVerticalDisplay() {

    const { itineraries } = useItineraries();
    return (
        <>
            <table className="table w-full">
                <thead>
                    <tr className="bg-[#4053AE] text-[#C3D000]">
                            <th className="text-[13px] sm:text-[24px] w-3xs px-3 py-1">Hora</th>
                            <th className="text-[13px] sm:text-[24px] w-lg px-3 py-1">Destino</th>
                            <th className="text-[13px] sm:text-[24px] w-lg px-3 py-1">Linea</th>
                            <th className="text-[13px] sm:text-[24px] w-xs px-3 py-1">Número</th>                     
                    </tr>
                </thead>
                <tbody className="h-228">
                    {itineraries.map(item =>
                        <RowVerticalDisplay
                            key={item._id}
                            itinerary={item}
                        >
                        </RowVerticalDisplay>)}
                </tbody>
            </table>
        </>

    )
}

export default TableVerticalDisplay;