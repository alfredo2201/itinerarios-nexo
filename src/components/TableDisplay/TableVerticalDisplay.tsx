import type { Itinerary } from "../../models/Trasportation";
import RowVerticalDisplay from "./RowVerticalDisplay";
interface TableVerticalDisplayProps {
    itineraries: Itinerary[];
}
function TableVerticalDisplay({itineraries}: TableVerticalDisplayProps) {    

    return (
        <div className="overflow-y-auto h-auto">
            <table className="w-full">
                <thead>
                    <tr className="bg-[#4053AE] text-[#C3D000]">
                        <th className="text-[15px] sm:text-[24px] w-2xl px-3 py-1">Hora</th>
                        <th className="text-[15px] sm:text-[24px] w-lg px-3 py-1">Destino</th>
                        <th className="text-[15px] sm:text-[24px] w-xl px-3 py-1">Linea</th>
                        <th className="text-[15px] sm:text-[24px] w-2xs px-3 py-1">Número</th>
                    </tr>
                </thead>
                    <tbody>
                        {itineraries.map(item =>
                            <RowVerticalDisplay
                                key={item._id}
                                itinerary={item}
                            >
                            </RowVerticalDisplay>)}
                    </tbody>
            </table>
        </div>

    )
}

export default TableVerticalDisplay;