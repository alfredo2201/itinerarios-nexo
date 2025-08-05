import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import TableDisplay from "../components/TableDisplay/TableDisplay";
import spot from "../../videos/Anuncio 21-9.mp4"
import DisplayTopBarComponent from "../components/DisplayTopBar/DisplayTopBarComponent";



function DisplayExtendedPage() {
    const playerRef = useRef(null)
    const [mostrarVideo, setMostrarVideo] = useState(false);
    const tiempoTabla = 10000; // 10 segundos
    const tiempoEsperaAntesDeRepetir = 10000; // 10 segundos


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
        <div className="flex flex-col">
            <div className=" flex flex-row">
                <DisplayTopBarComponent />
                <DisplayTopBarComponent />
            </div>

            {mostrarVideo ?
                <div className="flex items-center justify-center bg-black">
                    <ReactPlayer src={spot}
                        playing={true}
                        ref={playerRef}
                        muted={true}
                        controls={false}
                        style={{
                            width: "75%",
                            height: 1080,
                            aspectRatio: "21/9",
                        }}
                        onEnded={() => {
                            handleVideoEnded()

                        }} />

                </div>
                :
                <div className="flex flex-row">
                    <TableDisplay /><TableDisplay />
                </div>
            }

        </div>
    )
}

export default DisplayExtendedPage;