import { formatTimeInSonoraCustom } from "../../../utils/validations";

interface Props {
    horaSalida: Date;
    origen: string;
    destino: string;
    duracion: string;
    diaSalida:Date
}

function RowAutobusesItinerarioComponent({ horaSalida, origen, destino, duracion,diaSalida }: Props) {

    return (
        <tr className="bg-white text-black border-b-1 border-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 transition duration-150 ease-in-out">
            <td className="py-2 text-center text-[13px] sm:text-[14px]">{formatTimeInSonoraCustom(horaSalida)}</td>
            <td className="py-2 text-center text-[13px] sm:text-[14px]">{origen} - {destino}</td>
            <td className="py-2 text-center text-[13px] sm:text-[14px]">{duracion}</td>
            <td className="py-2 text-center text-[13px] sm:text-[14px]">{new Date(diaSalida).getUTCDate()}/{new Date(diaSalida).getUTCMonth()+1}/{new Date(diaSalida).getUTCFullYear()} </td>
        </tr>
    )
}

export default RowAutobusesItinerarioComponent;