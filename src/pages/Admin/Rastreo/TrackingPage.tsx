import { MapContainer, Popup, TileLayer, Marker } from 'react-leaflet'
import AsideListComponent from '../../../components/Tracking/AsideListComponent';


function TrackingPage() {

    return (
        <div className="w-full h-full flex #bg-[#04386c]">
            <div className="w-1/4 h-full p-5 bg-white">
                <AsideListComponent></AsideListComponent>
            </div>
            <div className="w-3/4 h-full">
                <MapContainer  center={[27.4824, -109.9467]} zoom={15} scrollWheelZoom={false} doubleClickZoom={true} >
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