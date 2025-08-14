interface Props{
    horaSalida:string;
    origen:string;
    destino:string;
    duracion:string;
}

function RowAutobusesItinerarioComponent({ horaSalida, origen, destino, duracion}: Props) {
    return (
        <tr className="bg-white text-black border-b-1 border-gray-100" onClick={()=>{
            console.log("Click en fila de itinerario");
        }}>
            <td className="py-2 text-center">{horaSalida}</td>
            <td className="py-2 text-center">{origen} - {destino}</td>
            <td className="py-2 text-center">{duracion}</td>
        </tr>
    )
}

export default RowAutobusesItinerarioComponent;