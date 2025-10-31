import { formatTimeInSonoraCustom } from "../../../utils/validations";

interface Props {
    horaSalida: Date;
    origen: string;
    destino: string;
    duracion: string;
}

function RowAutobusesItinerarioComponent({ horaSalida, origen, destino, duracion }: Props) {

    return (
        <tr className="bg-white text-black border-b-1 border-gray-100">
            <td className="py-2 text-center text-[13px] sm:text-[14px]">{formatTimeInSonoraCustom(horaSalida)}</td>
            <td className="py-2 text-center text-[13px] sm:text-[14px]">{origen} - {destino}</td>
            <td className="py-2 text-center text-[13px] sm:text-[14px]">{duracion}</td>
        </tr>
    )
}

export default RowAutobusesItinerarioComponent;