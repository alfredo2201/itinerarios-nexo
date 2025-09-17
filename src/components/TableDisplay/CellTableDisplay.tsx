import { formatTimeInSonoraCustom} from "../../utils/validations";

interface ItinerarioDisplayProps {    
    departureTime: Date,
    destino?: string,
    autobusImg?: string,
    numero?: string,
    estado?: string
}

function CellTableDisplay({ departureTime, destino, autobusImg, numero, estado }: ItinerarioDisplayProps) {

    return (
        <tr className="bg-[#171717] text-white h-13 w-screen even:bg-[#023672] ">
            <td className="text-[#C3D000] sm:text-[36px] font-bold  text-center">
                {formatTimeInSonoraCustom(departureTime)}
            </td>
            <td className="sm:text-[36px] font-semibold  text-center">{destino}</td>
            <td className="flex flex-col font-semibold items-center justify-center h-full ">
                <img src={autobusImg} alt="Logotipo" className="sm:h-10" />
            </td>
            <td className="sm:text-[36px] font-bold text-center" >{numero}</td>
            {estado != null || estado != undefined ?
                <td className="sm:text-[36px] font-semibold text-center">
                    <div className="flex items-center justify-center">
                        <span className="text-[30px]">{estado === 'Activo' ? 'A tiempo' : 'Retrasado'}</span>
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