import type { Hour } from "../../../interfaces/types";
import { getMinutesFormat } from "../../../utils/validations";

interface Props {
    horaSalida: Hour;
    origen: string;
    destino: string;
    duracion: string;
}

function RowAutobusesItinerarioComponent({ horaSalida, origen, destino, duracion }: Props) {
    return (
        <tr className="bg-white text-black border-b-1 border-gray-100" onClick={() => {
            console.log("Click en fila de itinerario");
        }}>
            <td className="py-2 text-center">{
                horaSalida.hour <= 12 ?
                    <span>{horaSalida.hour}:{getMinutesFormat(horaSalida)} A.M</span> :
                    <span>{horaSalida.hour - 12}:{getMinutesFormat(horaSalida)} P.M</span>
            }</td>
            <td className="py-2 text-center">{origen} - {destino}</td>
            <td className="py-2 text-center">{duracion}</td>
        </tr>
    )
}

export default RowAutobusesItinerarioComponent;