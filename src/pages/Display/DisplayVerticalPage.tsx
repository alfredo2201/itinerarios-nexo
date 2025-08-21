import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import spot from "../../../videos/Spot-Cocacola.mp4"
import DisplayTopBarComponent from "../../components/DisplayTopBar/DisplayTopBarComponent";
import type { ItineraryTable } from "../../interfaces/types";
import { getAllItineraries } from "../../services/TransportService";
import RowVerticalDisplay from "../../components/TableDisplay/RowVerticalDisplay";
function DisplayVerticalPage() {


    const playerRef = useRef(null)
    const [mostrarVideo, setMostrarVideo] = useState(false);
    const [itineraries, setItineraries] = useState<ItineraryTable[]>([]);
    const tiempoTabla = 5000; // 5 segundos
    const tiempoEsperaAntesDeRepetir = 5000; // 5 segundos

    //UseEffect para cambiar entre componente de video y de la tabla de itinerarios
    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;
        if (!mostrarVideo) {
            // Mostrar componente Table durante cierto tiempo
            timeout = setTimeout(() => {
                setMostrarVideo(false);
            }, tiempoTabla)
        }
        return () => clearTimeout(timeout);
    }, [mostrarVideo]);

    const handleVideoEnded = () => {
        setMostrarVideo(false); // Volver a mostrar Table
        // Esperar unos segundos y volver a iniciar el ciclo
        setTimeout(() => {
            setMostrarVideo(true); // Esto disparará el video de nuevo si se desea continuar el ciclo
        }, tiempoEsperaAntesDeRepetir);
    };

    useEffect(() => {
        getAllItineraries().then(response => {
            if (response && response.data) {
                setItineraries(response.data)
            }
        })
    }, []);



    return (

        <div className="fixed flex flex-col bg-black">
            <DisplayTopBarComponent></DisplayTopBarComponent>
            {mostrarVideo ?
                <div className="w-screen justify-center">
                    <ReactPlayer
                        ref={playerRef}
                        src={spot}
                        playing={true}
                        muted={false}
                        controls={false}
                        style={{
                            width: "100%",
                            height: "100%",
                            aspectRatio: "16/9",
                        }}
                        onEnded={() => {
                            handleVideoEnded()
                        }} />
                </div>
                :
                <table className="table-wrp block max-h-213 overflow-y-auto ">
                    <thead>
                        <tr className="bg-[#4053AE] text-[#C3D000] w-full ">
                            <th className="text-[13px] sm:text-[24px] w-3xs px-3 py-1">Hora</th>
                            <th className="text-[13px] sm:text-[24px] w-lg px-3 py-1">Destino</th>
                            <th className="text-[13px] sm:text-[24px] w-lg px-3 py-1">Linea</th>
                            <th className="text-[13px] sm:text-[24px] w-xs px-3 py-1">Número</th>                            
                        </tr>
                    </thead>
                    <tbody className="overflow-y-auto">
                        {itineraries.map(item =>
                            <RowVerticalDisplay
                                key={item.UUID}
                                departureTime={item.itinerary.departureTime}
                                destination={item.itinerary.destination}
                                image={item.image}
                                code={item.code ? item.code : 'N/A'}
                                companyName={item.gpsStatus}                                
                                state={item.gpsStatus}
                                transport={item.itinerary}
                                />)}
                                
                    </tbody>
                </table>
            }
        </div>
    )
}

export default DisplayVerticalPage;