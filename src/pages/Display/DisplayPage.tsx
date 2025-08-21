import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import TableDisplay from "../../components/TableDisplay/TableDisplay";
import DisplayTopBarComponent from "../../components/DisplayTopBar/DisplayTopBarComponent";
import { getVideosByRepetitions } from "../../services/AdvertismentsService";
import type { Advertisment } from "../../models/Advertisment";
function DisplayPage() {
    const playerRef = useRef(null)
    const [mostrarVideo, setMostrarVideo] = useState(false);
    const [videos, setVideos] = useState<Advertisment[]>([])
    //Estado para verificar que se han reproducido todos los videos del arreglo
    const [totalReproducido, setTotalReproducido] = useState<number>(0)

    const tiempoTabla = 30 * 1000; // 5 segundos
    const tiempoEsperaAntesDeRepetir =  14 * 1000; // 5 segundos


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

    const handleVideoEnded = () => {
        setTotalReproducido(totalReproducido + 1)
        if (totalReproducido+1 >= videos.length) {
            setTotalReproducido(0)
            setMostrarVideo(false);
        }
         // Volver a mostrar Table
        // Esperar unos segundos y volver a iniciar el ciclo
        setTimeout(() => {
            setMostrarVideo(true); // Esto disparará el video de nuevo si se desea continuar el ciclo
        }, tiempoEsperaAntesDeRepetir);

    };

    useEffect(() => {
        getVideosByRepetitions(100).then((data) => {
            if (data != null || data != undefined) {
                setVideos(data)                
            }
        })
    }, [])

    return (

        <div className="fixed flex flex-col">
            <DisplayTopBarComponent></DisplayTopBarComponent>
            {mostrarVideo && videos.length != 0 ?
                <div className="w-screen justify-center">
                    <ReactPlayer
                        ref={playerRef}
                        src={videos[totalReproducido].fileName}                 
                        playing={true}
                        muted={true}
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