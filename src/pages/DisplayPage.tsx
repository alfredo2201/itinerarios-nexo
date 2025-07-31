import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import TableDisplay from "../components/TableDisplay/TableDisplay";
import { MediaController } from "media-chrome/react";
import spot from "../../videos/Spot-Cocacola.mp4"
import DisplayTopBarComponent from "../components/DisplayTopBar/DisplayTopBarComponent";



function DisplayPage() {

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
        <div className="fixed flex flex-col">
            <DisplayTopBarComponent></DisplayTopBarComponent>
            {mostrarVideo ?
                <div className="w-screen justify-center">
                    <MediaController style={{
                        width: "100%",
                        aspectRatio: "16/9",
                    }}>

                        <ReactPlayer
                            src={spot}
                            playing={true}
                            muted={true}
                            controls={false}
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                            onEnded={() => {
                                handleVideoEnded()

                            }} />
                    </MediaController>
                </div>
                :
                <TableDisplay />
            }

        </div>
    )
}

export default DisplayPage;