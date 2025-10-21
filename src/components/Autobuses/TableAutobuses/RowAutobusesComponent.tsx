interface Props {
    id: string
    numero?: string;
    estado?: boolean;
    ultimaVista: string;
    toggleItinerarios: (id: string) => void;
}
function RowAutobusesComponent({ id, numero, estado, ultimaVista, toggleItinerarios }: Props) {
    return (
        <tr className="bg-white text-black border-b-1 border-gray-100 hover:bg-gray-200 cursor-pointer transition duration-150 ease-in-out"
            onClick={() => toggleItinerarios(id)}>
            <td className="py-2 text-center">Num.{numero}</td>
            {estado ?
                <td className="w-lg py-3 text-center justify-center transition-transform duration-500 hover:scale-110 sm:w-60">
                    <div className="flex justify-center">
                        <p className="bg-green-400 w-15 py-2 rounded-lg text-green-700 text-[12px] sm:text-[13px] self-center">Activo</p>
                    </div>

                </td> :
                <td className="w-lg py-3 text-center justify-center sm:w-60">
                    <div className="flex justify-center">
                        <p className="bg-red-300 text-red-700 w-15 py-2 rounded-lg text-[12px] sm:text-[13px]">Inactivo</p>
                    </div>

                </td>
            }
            <td className="py-2 text-center text-[12px] sm:text-[14px]">{ultimaVista}</td>
        </tr>
    )
}
export default RowAutobusesComponent;