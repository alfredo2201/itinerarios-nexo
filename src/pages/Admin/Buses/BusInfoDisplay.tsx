import RowAutobusesComponent from "../../../components/Autobuses/TableAutobuses/RowAutobusesComponent";
import TableAutobusesComponent from "../../../components/Autobuses/TableAutobusesComponent";
import RowAutobusesItinerarioComponent from "../../../components/Autobuses/TableAutobusesItinerario/RowAutobusesItinerarioComponent";
import { EstadoAutobus, ItinerariosAutobus } from "../../../data/AutobusesData";
import type { AutobusInterface, ItinerarioAutobusInterface } from "../../../interfaces/types";
import foto from '../../../img/albatros_logotipo.png'
const data: AutobusInterface[] = EstadoAutobus.slice(0, 4);
const dataItinerario: ItinerarioAutobusInterface[] = ItinerariosAutobus.slice(0,3)

const rows = data.map(item =>
    <RowAutobusesComponent key={item.key} numero={item.numero} estadoGps={item.estadoGps} ultimaVista={item.ultimaVista} itinerario={[]} />
)

const rowsItinerario = dataItinerario.map(item => 
    <RowAutobusesItinerarioComponent key={item.key} horaSalida={item.horaSalida} 
        origen={item.origen} destino={item.destino} duracion={item.duracion} />
)
function BusInfoPage(){
    return (
    <div className="p-10">
        <div className="mb-3">
            <img src={foto} alt="" className="h-15 "/>
        </div>
        <div className="flex flex-row w-full h-100 gap-5 ">
            <div className="w-full bg-white max-h-200 min-h-150 rounded-lg p-8 overflow-auto shadow-xl/10 ">
                <h2 className="text-base font-bold">Estado de Autobuses</h2>
                <TableAutobusesComponent title1="Numero de Camion" title2="Estado del GPS" title3="Ultima vez visto" rowArray={rows}></TableAutobusesComponent>
            </div>
            
            <div className="bg-white w-full rounded-lg p-8 shadow-xl/10">
                 <h2 className="text-base font-bold">Itinerarios de Hoy</h2>
                 <TableAutobusesComponent title1="Hora de Salida" title2="Ruta" title3="Duracion" rowArray={rowsItinerario}></TableAutobusesComponent>
            </div>
        </div>
    </div>)
}

export default BusInfoPage;