import type { AutobusInterface } from "../../../interfaces/types";
function RowAutobusesComponent({ numero, estadoGps, ultimaVista }: AutobusInterface) {
    return (
        <tr className="bg-white text-black border-b-1 border-gray-100 hover:bg-gray-200 cursor-pointer">
            <td className="py-2 text-center">Num.{numero}</td>
            {estadoGps === "Activo" ?
                <td className="flex py-1 text-center justify-center">
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