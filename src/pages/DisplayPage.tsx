import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import TableDisplay from "../components/TableDisplay/TableDisplay";
import spot from "../../videos/Spot-Cocacola.mp4"
import DisplayTopBarComponent from "../components/DisplayTopBar/DisplayTopBarComponent";

function DisplayPage() {
    const playerRef = useRef(null)
    const [mostrarVideo, setMostrarVideo] = useState(false);
    const tiempoTabla = 5000; // 5 segundos
    const tiempoEsperaAntesDeRepetir = 5000; // 5 segundos


    //UseEffect para cambiar entre componente de video y de la tabla de itinerarios
    useEffect(() => {
        let timeout: number;

        if (!mostrarVideo) {
            // Mostrar componente Table durante cierto tiempo
            timeout = setTimeout(() => {
                setMostrarVideo(true);
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

    return (
        <div className="fixed flex flex-col">
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
                <TableDisplay />
            }
        </div>
    )
}

export default DisplayPage;