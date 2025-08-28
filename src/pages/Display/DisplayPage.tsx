import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import TableDisplay from "../../components/TableDisplay/TableDisplay";
import DisplayTopBarComponent from "../../components/DisplayTopBar/DisplayTopBarComponent";
import { useAdvertisement } from "../../hooks/useAdvertisment";
import type { Advertisement } from "../../models/Advertisement";
function DisplayPage() {

    const { adsWith50Rep, adsWith100Rep, adsWith200Rep } = useAdvertisement();

    const playerRef = useRef(null)
    const [mostrarVideo, setMostrarVideo] = useState(false);
    //Estado para verificar que se han reproducido todos los videos del arreglo
    const [totalReproducido, setTotalReproducido] = useState<number>(0)
    const [turn, setTurn] = useState(1);
    const [currentAds, setCurrentAds] = useState<Advertisement[]>([])
    const tiempoTabla = 7 * 60 * 1000; // Cada 7 minutos minumo
    const tiempoEsperaAntesDeRepetir = 7 * 60 * 1000; // Cada 7 minutos

    //UseEffect para cambiar entre componente de video y de la tabla de itinerarios
    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;
        if (!mostrarVideo) {
            // Mostrar componente Table durante cierto tiempo
            timeout = setTimeout(() => {
                setMostrarVideo(true);
            }, tiempoTabla)
        }
        return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mostrarVideo]);

    useEffect(() => {
        setCurrentAds(adsWith200Rep)
    }, [adsWith200Rep])

    const handleVideoEnded = () => {
        setTotalReproducido(totalReproducido + 1)
        if (totalReproducido + 1 >= currentAds.length) {
            if (turn === 1) {
                setTurn(turn + 1)
                setCurrentAds(adsWith100Rep)
            } else if (turn === 2) {
                setTurn(turn + 1)
                setCurrentAds(adsWith50Rep)
            } else if (turn === 3) {
                setTurn(1)
                setCurrentAds(adsWith200Rep)
            }
            setTotalReproducido(0)
            setMostrarVideo(false);
        }
        setTimeout(() => {
            setMostrarVideo(true); // Esto disparará el video de nuevo si se desea continuar el ciclo
        }, tiempoEsperaAntesDeRepetir);

    };

    return (

        <div className="fixed flex flex-col">
            <DisplayTopBarComponent></DisplayTopBarComponent>
            {mostrarVideo ?
                <div className="w-screen justify-center">
                    <ReactPlayer
                        ref={playerRef}
                        src={currentAds[totalReproducido].URL}
                        playing={true}
                        muted={false}
                        volume={0.5}
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
                <TableDisplay />
            }
        </div>
    )
}

export default DisplayPage;