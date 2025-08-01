interface ItinerarioDisplayProps {
    key: string,
    hora: string,
    destino: string,
    autobusImg: string,
    numero: string,
    estado: string
}

function CellTableDisplay({ hora, destino, autobusImg, numero, estado }: ItinerarioDisplayProps) {
    return (
        <tr className="bg-[#171717] text-white h-13 w-screen even:bg-[#023672] ">
            <td className="text-[#C3D000] text-[24px] font-bold py-2 text-center">{hora}</td>
            <td className="text-[24px] font-semibold py-2 text-center">{destino}</td>
            <td className="text-[24px] font-semibold pt-1 flex items-center justify-center">
                <img src={autobusImg} alt="Logotipo" className="h-10 " />
            </td>
            <td className="text-[24px] font-bold py-2 text-center" >{numero}</td>
            <td className="text-[24px] font-semibold text-center">
                <div className="flex items-center justify-center">
                    <span className="m">{estado}</span>
                    {estado === 'A Tiempo' ?
                        <span className="bg-green-500 w-6 h-6 rounded-full mx-4"></span>
                        : <span className="bg-red-500 w-6 h-6 rounded-full mx-4"></span>
                    }
                </div>
            </td>
        </tr>
    )
}
export default CellTableDisplay;