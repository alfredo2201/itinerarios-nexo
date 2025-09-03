import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import spot from "../../../videos/Spot-Cocacola.mp4"
import DisplayTopBarComponent from "../../components/DisplayTopBar/DisplayTopBarComponent";
import type { ItineraryTable } from "../../interfaces/types";
import { getAllItineraries } from "../../services/TransportService";
import RowVerticalDisplay from "../../components/TableDisplay/RowVerticalDisplay";
import type { Advertisement } from "../../models/Advertisement";
import { useAdvertisement } from "../../hooks/useAdvertisment";
function DisplayVerticalPage() {

    const [itineraries, setItineraries] = useState<ItineraryTable[]>([]);

    const BASE_STEP = 0.1 * 60 * 1000; // 7 minutos en ms

    const { adsWith50Rep, adsWith100Rep, adsWith200Rep } = useAdvertisement();

    const playerRef = useRef(null);
    const [mostrarVideo, setMostrarVideo] = useState(false);
    const [totalReproducido, setTotalReproducido] = useState<number>(0);
    const [currentAds, setCurrentAds] = useState<Advertisement[]>([]);
    const [step, setStep] = useState(0); // contador de pasos de 7 min

    // obtener el grupo que toca en este paso
    const getGroupForStep = (step: number): Advertisement[] | null => {
        if (step % 4 === 0 && adsWith50Rep.length > 0) return adsWith50Rep; // cada 28 min
        if (step % 2 === 0 && adsWith100Rep.length > 0) return adsWith100Rep; // cada 14 min
        if (adsWith200Rep.length > 0) return adsWith200Rep; // cada 7 min
        return null;
    };

    // efecto para alternar tabla / video cada 7 min
    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;
        if (!mostrarVideo) {
            timeout = setTimeout(() => {
                const grupo = getGroupForStep(step + 1);
                if (grupo) {
                    setCurrentAds(grupo);
                    setTotalReproducido(0);
                    setMostrarVideo(true);
                } else {
                    // si no hay nada, solo pasa a la siguiente tabla
                    setStep(prev => prev + 1);
                }
            }, BASE_STEP);
        }
        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mostrarVideo, step]);

    // cuando termina un video
    const handleVideoEnded = () => {
        const siguienteVideo = totalReproducido + 1;

        if (siguienteVideo < currentAds.length) {
            setTotalReproducido(siguienteVideo);
        } else {
            // terminó el grupo → volver a tabla y avanzar un "paso"
            setMostrarVideo(false);
            setStep(prev => prev + 1);
        }
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