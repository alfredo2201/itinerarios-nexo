import type { ItinerarioAutobusInterface } from "../../../interfaces/types";

function RowAutobusesItinerarioComponent({ horaSalida, origen, destino, duracion }: ItinerarioAutobusInterface) {
    return (
        <tr className="bg-white text-black border-b-1 border-gray-100">
            <td className="py-2 text-center">{horaSalida}</td>
            <td className="py-2 text-center">{origen} - {destino}</td>
            <td className="py-2 text-center">{duracion}</td>
        </tr>
    )
}

export default RowAutobusesItinerarioComponent;