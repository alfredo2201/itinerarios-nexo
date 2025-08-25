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
        <tr className="bg-white text-black border-b-1 border-gray-100">
            <td className="py-2 text-center">{
                horaSalida.hour <= 12 ?
                    <span className="text-[13px] sm:text-[14px]">{horaSalida.hour}:{getMinutesFormat(horaSalida)} A.M</span> :
                    <span className="text-[13px] sm:text-[14px]">{horaSalida.hour - 12}:{getMinutesFormat(horaSalida)} P.M</span>
            }</td>
            <td className="py-2 text-center text-[13px] sm:text-[14px]">{origen} - {destino}</td>
            <td className="py-2 text-center text-[13px] sm:text-[14px]">{duracion}</td>
        </tr>
    )
}

export default RowAutobusesItinerarioComponent;