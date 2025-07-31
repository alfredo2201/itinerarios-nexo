import type { ItinerarioProps } from "./ItinerarioData";


function TableCellCustom({hora, destino, autobusImg, numero, rastreo }: ItinerarioProps) {
    return (
        <tr className="bg-[#171717] text-white">
            <td className="py-2 text-center">{hora}</td>
            <td className="py-2 text-center">{destino}</td>
            <td className="py-2 text-center">{autobusImg}</td>
            <td className="py-2 text-center" >{numero}</td>
            <td className="py-2 text-center hover:bg-sky-700">
               <a href="" title={rastreo} >
                Rastreo
                </a> 
            </td>
        </tr>
    )
}
export default TableCellCustom;