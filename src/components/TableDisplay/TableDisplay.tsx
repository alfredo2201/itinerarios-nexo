import type { Itinerary } from "../../models/Trasportation";
import RowTableDisplay from "./RowTableDisplay";

interface Props {
    typeDisplay: number;
    itineraries: Itinerary[];
    displayDoble: Itinerary[];
}

function TableDisplay({ typeDisplay, itineraries, displayDoble }: Props) {
    // Seleccionar los datos según typeDisplay
    const data = typeDisplay === 1 ? itineraries : displayDoble;

    // Número total de filas que queremos mostrar
    const totalRows = 14;

    // Calcular cuántas filas vacías faltan
    const emptyRows = Math.max(0, totalRows - data.length);

    return (
            <table className="table-auto border-collapse w-full bg-black">
                <thead>
                    <tr className="bg-[#4053AE] text-[#C3D000]">
                        <th className="sm:text-[40px] w-3xs px-3 py-1">Hora</th>
                        <th className="sm:text-[40px] w-xl px-3 py-1">Destino</th>
                        <th className="sm:text-[40px] w-m px-3 py-1">Linea</th>
                        <th className="sm:text-[40px] w-xs px-3 py-1">Número</th>
                        <th className="sm:text-[40px] w-lg px-3 py-1">Observacion</th>
                    </tr>
                </thead>
                <tbody className="h-227 border-b-6 ">
                    {/* Filas con datos */}
                    {data.map(item => (
                        <RowTableDisplay
                            key={item._id || ""}
                            departureTime={item.departureTime}
                            destino={item.destination.name}
                            autobusImg={item.company?.image}
                            numero={item.transport ? item.transport.code : "N/A"}
                            estado="Activo"
                        />
                    ))}

                    {/* Filas vacías para completar las 14 */}
                    {Array.from({ length: emptyRows }).map((_, idx) => (
                        <tr key={`empty-${idx}`} className="h-16">
                            <td className="border-t border-gray-700 px-3">&nbsp;</td>
                            <td className="border-t border-gray-700 px-3"></td>
                            <td className="border-t border-gray-700 px-3"></td>
                            <td className="border-t border-gray-700 px-3"></td>
                            <td className="border-t border-gray-700 px-3"></td>
                        </tr>
                    ))}
                </tbody>
            </table>    
    );
}

export default TableDisplay;
