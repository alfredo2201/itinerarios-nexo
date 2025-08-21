import type { Hour } from "../../interfaces/types";
import { getMinutesFormat } from "../../utils/validations";

interface ItinerarioDisplayProps {
    key: string,
    departureTime: Hour,
    destino: string,
    autobusImg: string,
    numero: string,
    estado?: string
}

function CellTableDisplay({ departureTime, destino, autobusImg, numero, estado }: ItinerarioDisplayProps) {

    return (
        <tr className="bg-[#171717] text-white h-13 w-screen even:bg-[#023672] ">
            <td className="text-[#C3D000] sm:text-[24px] font-bold py-2 text-center">
                {departureTime.hour <= 12 ?
                    <span>{departureTime.hour}:{getMinutesFormat(departureTime)} A.M</span> :
                    <span>{departureTime.hour - 12}:{getMinutesFormat(departureTime)} P.M</span>
                }
            </td>
            <td className="sm:text-[24px] font-semibold py-2 text-center">{destino}</td>
            <td className="font-semibold pt-1 flex items-center justify-center">
                <img src={autobusImg} alt="Logotipo" className="sm:h-10 " />
            </td>
            <td className="sm:text-[24px] font-bold py-2 text-center" >{numero}</td>
            {estado != null || estado != undefined ?
                <td className="sm:text-[24px] font-semibold text-center">
                    <div className="flex items-center justify-center">
                        <span className="m">{estado}</span>
                        {estado === 'Activo' ?
                            <span className="bg-green-500 sm:w-6 sm:h-6 rounded-full mx-4"></span>
                            : <span className="bg-red-500 sm:w-6 sm:h-6 rounded-full mx-4"></span>
                        }
                    </div>
                </td>
                :
                <></>
            }

        </tr>
    )
}
export default CellTableDisplay;