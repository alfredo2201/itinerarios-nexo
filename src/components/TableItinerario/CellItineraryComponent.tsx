import { formatTimeInSonoraCustom } from "../../utils/validations";

type Props = {
    key?: string,
    departureTime: Date,
    destino?: string,
    autobusImg?: string,
    numero?: string,
    rastreo: string
}
function CellItineraryComponent({ departureTime, destino, autobusImg, numero, rastreo }: Props) {
    return (
        <tr className="bg-[#171717] text-white even:bg-[#023672] ">
            <td className="py-2 text-center text-[10px] md:text-[14px]">
                {formatTimeInSonoraCustom(departureTime)}
            </td>
            <td className="py-2 text-center text-[10px] md:text-[14px]">{destino}</td>
            <td className="font-semibold pt-1 flex items-center justify-center">
                <img src={autobusImg} alt="Logotipo" className="h-4 md:h-6 object-contain md:object-cover" />
            </td>
            <td className="py-2 text-center text-[10px] md:text-[14px]" >{numero}</td>
            <td className="py-2 text-center text-[10px] md:text-[14px] hover:bg-sky-700 cursor-pointer">
                <span title={rastreo} className='w-3/4' >
                    Rastreo
                </span>
            </td>
        </tr>
    )
}
export default CellItineraryComponent;