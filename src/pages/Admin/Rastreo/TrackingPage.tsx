import { MapContainer, Popup, TileLayer, Marker } from 'react-leaflet'
import AsideListComponent from '../../../components/Tracking/AsideListComponent';
import { Menu, MenuButton, MenuItem, MenuRadioGroup } from '@szhsin/react-menu';
import { useState } from 'react';
import '@szhsin/react-menu/dist/index.css';

function TrackingPage() {
    const [linea, setLinea] = useState('Autobuses')

    return (
        <div className="w-full h-full flex ">
            <div className="w-1/4 h-full p-5 bg-white">
                <div className='flex pb-3 h-9 text-[13px]'>
                    <button className='bg-gray-200 px-7 rounded-tl-lg cursor-pointer hover:bg-gray-400'>Activo</button>
                    <button className='bg-gray-200 px-7 rounded-tr-lg cursor-pointer hover:bg-gray-400'>Inactivo</button>
                </div>
                <div className='flex gap-5'>
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
                <AsideListComponent></AsideListComponent>
            </div>
            <div className="w-3/4 h-full">
                <MapContainer center={[27.4824, -109.9467]} zoom={15} scrollWheelZoom={false} doubleClickZoom={true} >
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