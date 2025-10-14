import { MapContainer, Popup, TileLayer, Marker, useMap } from 'react-leaflet'
import { Menu, MenuButton, MenuItem, MenuRadioGroup } from '@szhsin/react-menu';
import { useEffect, useState } from 'react';
import '@szhsin/react-menu/dist/index.css';
import L, { LatLng } from 'leaflet';


interface UpdateViewProps {
    position: LatLng;
}

// Este componente actualiza la vista del mapa
const UpdateView: React.FC<UpdateViewProps> = ({ position }) => {
    const map = useMap();
    map.setView([position.lat, position.lng], map.getZoom());
    return null;
};


function TrackingPage() {
    //const [transport, setTransport] = useState<Company[] | undefined>([])
    const [linea, setLinea] = useState('Autobuses')
    const [ubicacion, setUbicacion] = useState<LatLng>(new LatLng(27.4824, -109.9467)); // Ubicación inicial (Obregon,Sonora)
    const [gpsStatus, setGpsStatus] = useState("")
    const [error, setError] = useState("");
    const [markerName, setMarkerName] = useState("Central Camionera Ciudad Obregon")

    // Ícono personalizado opcional
    const customIcon = new L.Icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
    });

    // const showTransportMap = (id: string, name: string, code?: string) => {   
    //     setError('')     
    //     setMarkerName(name + " Num:" + code)
    //     setUbicacion(new LatLng(27.283239, -109.672311))
    // }

    const changeStatus = (status: string) => {
        setGpsStatus(status)
    }

    useEffect(() => {   
        // setTransport(data)
        // if (gpsStatus != '') {
        //     if (transport == undefined) return
        //     const aux: Company[] = data
        //         .map(company => ({
        //             ...company,
        //             trasportation: company.trasportation.filter(
        //                 transport => transport.gpsStatus.toLowerCase() === gpsStatus
        //             )
        //         }))
        //         .filter(company => company.trasportation.length > 0);
        //     setTransport(aux)
        // }
    }, [gpsStatus])

    return (
        <div className="w-full h-full flex ">
            <div className="w-2/7 h-full p-5 bg-white">
                <div className='flex pb-3 h-9 text-[13px]'>
                    <button className='bg-gray-200 px-7 rounded-tl-lg cursor-pointer hover:bg-gray-400 transition duration-150 ease-in-out' onClick={() => changeStatus('')}>Todos</button>
                    <button className='bg-gray-200 px-7  cursor-pointer hover:bg-gray-400 transition duration-150 ease-in-out' onClick={() => changeStatus('activo')}>Activo</button>
                    <button className='bg-gray-200 px-7 rounded-tr-lg cursor-pointer hover:bg-gray-400 transition duration-150 ease-in-out' onClick={() => changeStatus('inactivo')}>Inactivo</button>
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
                <div className='max-h-180 mix-h-100 overflow-y-scroll scrollbar-hide'>
                    {/*
                    {
                        transport?.map(linea =>
                            linea.trasportation.map(camion =>
                                <ItemListTrackingComponent
                                    id={camion.UUID}
                                    key={camion.UUID}
                                    nombreLinea={linea.companyName}
                                    imagen={linea.image}
                                    direccionOrigen={camion.itinerary[0].originAddress}
                                    numeroCamion={camion.code}
                                    estado={camion.gpsStatus}
                                    ultimaVezVisto={camion.lastSeen}
                                    itinerario={camion.itinerary[0]}
                                    showTransport={showTransportMap}
                                />
                            )
                        )}
                        */}
                </div>
            </div>
            <div className="w-5/7 h-full">
                {error && <p>Error: {error}</p>}

                <MapContainer center={ubicacion} zoom={15} scrollWheelZoom={false} doubleClickZoom={true} >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <UpdateView position={ubicacion} />
                    <Marker position={ubicacion} icon={customIcon}>
                        <Popup>
                            {markerName}
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>

        </div>
    )
}

export default TrackingPage;