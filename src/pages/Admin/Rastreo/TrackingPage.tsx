import { MapContainer, Popup, TileLayer, Marker } from 'react-leaflet'
import { Menu, MenuButton, MenuItem, MenuRadioGroup } from '@szhsin/react-menu';
import { useState } from 'react';
import '@szhsin/react-menu/dist/index.css';
import ItemListTrackingComponent from "../../../components/Tracking/ItemListTrackingComponent";
import { LineasAutobusesRastreo } from "../../../data/AutobusesData";
import type { LineaAutobusInterface } from "../../../interfaces/types";
import { latLng, LatLng } from 'leaflet';

const data: LineaAutobusInterface[] = LineasAutobusesRastreo.slice(0, 3);
let iterador = 0;
const rows = data.map(linea =>
    linea.camiones.map(camion =>
        <ItemListTrackingComponent
            key={iterador++}
            nombreLinea={linea.nombreEmpresa}
            imagen={linea.imagen}
            direccionOrigen={camion.itinerario[0].direccionOrigen}
            numeroCamion={camion.numero}
            estado={camion.estadoGps}
            ultimaVezVisto={camion.ultimaVista}
            itinerario={camion.itinerario} />
    )
)


function TrackingPage() {
    const posicion:LatLng = latLng(27.4824, -109.9467);
    const [linea, setLinea] = useState('Autobuses')

    return (
        <div className="w-full h-full flex ">
            <div className="w-2/7 h-full p-5 bg-white">
                <div className='flex pb-3 h-9 text-[13px]'>
                    <button className='bg-gray-200 px-7 rounded-tl-lg cursor-pointer hover:bg-gray-400 transition duration-150 ease-in-out'>Activo</button>
                    <button className='bg-gray-200 px-7 rounded-tr-lg cursor-pointer hover:bg-gray-400 transition duration-150 ease-in-out'>Inactivo</button>
                </div>
                <div className='flex gap-5 pb-3'>
                    <div className='w-1/2 border-[#E3E3E3] rounded-lg border-1 p-2 cursor-pointer'>
                        <Menu menuButton={<MenuButton>{linea}</MenuButton>} >
                            <MenuRadioGroup
                                value={linea}
                                onRadioChange={(e) => {
                                    setLinea(e.value)
                                }
                                }>
                                <MenuItem type="radio" value="Tufesa" >
                                    Tufesa
                                </MenuItem>
                                <MenuItem type="radio" value="Albatros">
                                    Albatros
                                </MenuItem>
                                <MenuItem type="radio" value="Elite">
                                    Elite
                                </MenuItem>
                            </MenuRadioGroup>
                        </Menu>
                    </div>
                    <input className='w-1/2 border-[#E3E3E3] rounded-lg border-1 p-2' type="text" />
                </div>
                <div className='max-h-180 mix-h-100 overflow-auto'>
                    {rows}
                </div>
            </div>
            <div className="w-5/7 h-full">
                <MapContainer center={posicion} zoom={15} scrollWheelZoom={false} doubleClickZoom={true} >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={[27.4824, -109.9467]}>
                        <Popup>
                            Central Camionera Ciudad Obregon
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    )
}

export default TrackingPage;