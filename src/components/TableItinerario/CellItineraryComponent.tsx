import type { Hour } from "../../interfaces/types";
import { getMinutesFormat } from "../../utils/validations";

type Props = {
    key: string,
    departureTime: Hour,
    destino: string,
    autobusImg: string,
    numero?: string,
    rastreo: string
}
function CellItineraryComponent({ departureTime, destino, autobusImg, numero, rastreo }: Props) {
    return (
        <tr className="bg-[#171717] text-white even:bg-[#023672] ">
            <td className="py-2 text-center">
                {departureTime.hour <= 12 ?
                    <span>{departureTime.hour}:{getMinutesFormat(departureTime)} A.M</span> :
                    <span>{departureTime.hour - 12}:{getMinutesFormat(departureTime)} P.M</span>
                }
            </td>
            <td className="py-2 text-center">{destino}</td>
            <td className="text-[13px] font-semibold pt-1 flex items-center justify-center">
                <img src={autobusImg} alt="Logotipo" className="h-6 " />
            </td>
            <td className="py-2 text-center" >{numero}</td>
            <td className="py-2 text-center hover:bg-sky-700 cursor-pointer">
                <span title={rastreo} className='w-3/4' >
                    Rastreo
                </span>
            </td>
        </tr>
    )
}
export default CellItineraryComponent;