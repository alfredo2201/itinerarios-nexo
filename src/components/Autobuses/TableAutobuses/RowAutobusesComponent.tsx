interface Props {
    id:string
    numero?: string;
    estadoGps: string;
    ultimaVista: string;
    toggleItinerarios: (id:string) => void;
}
function RowAutobusesComponent({ id, numero, estadoGps, ultimaVista, toggleItinerarios }: Props) {
    return (
        <tr className="bg-white text-black border-b-1 border-gray-100 hover:bg-gray-200 cursor-pointer transition duration-150 ease-in-out"
            onClick={() => toggleItinerarios(id) }>
            <td className="py-2 text-center">Num.{numero}</td>
            {estadoGps === "Activo" ?
                <td className="flex py-1 text-center justify-center transition-transform duration-500 hover:scale-110">
                    <p className="bg-green-400 w-1/4 py-2 rounded-lg text-green-700">{estadoGps}</p>
                </td> :
                <td className="flex py-1 text-center justify-center">
                    <p className="bg-red-300 text-red-700 w-1/4 py-2 rounded-lg">{estadoGps}</p>
                </td>
            }
            <td className="py-2 text-center">{ultimaVista}</td>
        </tr>
    )
}
export default RowAutobusesComponent;