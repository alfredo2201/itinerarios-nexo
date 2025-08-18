import type { ItinerarioProps } from '../../interfaces/types';
function CellItineraryComponent({ hora, destino, autobusImg, numero, rastreo }: ItinerarioProps) {
    return (
        <tr className="bg-[#171717] text-white even:bg-[#023672] ">
            <td className="py-2 text-center">{hora}</td>
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