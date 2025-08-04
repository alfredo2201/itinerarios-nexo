import ItemListTrackingComponent from "./ItemListTrackingComponent";
import { LineasAutobusesRastreo } from "../../data/AutobusesData";
import type { LineaAutobusInterface } from "../../interfaces/types";
const data:LineaAutobusInterface[] = LineasAutobusesRastreo.slice(0,3);
let iterador = 0;
const rows = data.map(linea =>
    linea.camiones.map(camion =>
            <ItemListTrackingComponent 
    key={iterador++}
    nombreLinea={linea.nombreEmpresa} 
    imagen={linea.imagen} 
    direccionOrigen="Campeche 928, Cortinas 1 Secc, 85160 Cdad. Obregón, Son." 
    numeroCamion={camion.numero} 
    estado={camion.estadoGps}
    ultimaVezVisto={camion.ultimaVista} />
    )
)
function AsideListComponent(){
    return (
        <>{rows}</>     
    )
}

export default AsideListComponent;