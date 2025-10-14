
import { useEffect, useRef, useState } from "react";
import TableDisplay from "../../components/TableDisplay/TableDisplay";
import ReactPlayer from "react-player";
import DisplayTopBarComponent from "../../components/DisplayTopBar/DisplayTopBarComponent";
import { useAdvertisement } from "../../hooks/useAdvertisment";
import type { Advertisement } from "../../models/Advertisement";
import VideoFlowManager from "../../classes/VideoFlowManager";
import { useLocation } from "react-router";
import { useItineraries } from "../../hooks/useItineraries";

// Instancia global del manager
const flowManager: VideoFlowManager = new VideoFlowManager();

const DisplayPage: React.FC = () => {
    const location = useLocation()
    const playerRef = useRef(null);

    const { loading, firstGroup, secondGroup, thirdGroup, fourthGroup, getVideosForStep } = useAdvertisement();
    const { itineraries,displayDoble } = useItineraries();
    const [mostrarVideo, setMostrarVideo] = useState<boolean>(false);
    const [currentAds, setCurrentAds] = useState<Advertisement[]>([]);
    const [totalReproducido, setTotalReproducido] = useState<number>(0);
    //const [currentStep, setCurrentStep] = useState<number>(0);

    // Cuando termina un video
    const handleVideoEnded = (): void => {
        if (totalReproducido + 1 < currentAds.length) {
            setTotalReproducido(totalReproducido + 1);
        } else {
           // console.log(`🏁 Grupo ${currentStep} completado, volviendo a tabla`);
            setMostrarVideo(false);
            setTotalReproducido(0);
        }
    };

    // useEffect principal - controla el flujo pantalla/video
    useEffect(() => {
        if (loading) return;

        let timeout: ReturnType<typeof setTimeout>;

        if (!mostrarVideo) {
            // Inicializar el manager si es necesario
            if (!flowManager.initialized) {
                flowManager.initialize(getVideosForStep);
            }

            // Si no hay videos disponibles, mostrar solo tabla
            if (flowManager.getCurrentState().pattern.length === 0) {
                console.log('❌ No hay videos disponibles en ningún grupo');
                return;
            }

            // ✨ CAMBIO PRINCIPAL: Ahora usa el tiempo específico del paso actual
            const tiempo: number = flowManager.getCurrentTableTime();
            timeout = setTimeout(() => {
                const nextStep = flowManager.getNextStep();

                if (nextStep !== null) {
                    const videos: Advertisement[] = getVideosForStep(nextStep.group);
                    if (videos.length > 0) {
                        setCurrentAds(videos);
                        //setCurrentStep(nextStep.group);
                        setMostrarVideo(true);
                        setTotalReproducido(0);
                    } else {
                        console.warn(`⚠️  Grupo ${nextStep.group} sin videos, reinicializando...`);
                        flowManager.reset();
                    }
                } else {
                    console.log('❌ No hay próximo grupo disponible');
                }
            }, tiempo);
        }

        return () => {
            if (timeout) {
                clearTimeout(timeout);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mostrarVideo, loading]);

    // Detectar cambios en los arrays para reinicializar si es necesario
    useEffect(() => {
        if (!loading && flowManager.initialized) {
            // Reinicializar si cambia la disponibilidad
            const hasChanged =
                (firstGroup.length > 0) !== flowManager.getCurrentState().available.has200 ||
                (secondGroup.length > 0) !== flowManager.getCurrentState().available.has100 ||
                (thirdGroup.length > 0) !== flowManager.getCurrentState().available.has50 ||
                (fourthGroup.length > 0) !== flowManager.getCurrentState().available.hasAll;

            if (hasChanged) {
                console.log('🔄 Detectado cambio en disponibilidad, reinicializando...');
                flowManager.reset();
            }
        }
    }, [firstGroup, secondGroup, thirdGroup, fourthGroup, loading]);

    if (loading) {
        return (
            <div className="fixed flex flex-col">
                <DisplayTopBarComponent />
                <h1 className="text-[40px] text-white bg-black font-sans text-center font-semibold w-screen h-screen">CARGANDO PAGINA...</h1>
            </div>
        );
    }

    return (

        <div className="flex flex-col w-screen">
            {/*Valida si esta en la pantalla principal*/}
            {location.pathname == '/displays' ? <>
                <DisplayTopBarComponent />
                {mostrarVideo ? (                
                    <div className=" h-245 justify-center bg-black">
                        {/*Si deseo poner en pantalla completa solo pongo -> fixed */}
                        <ReactPlayer
                            ref={playerRef}
                            src={currentAds[totalReproducido].URL}
                            playing={true} 
                            muted={true}
                            volume={0.5}
                            controls={false}
                            style={{
                                width: "100%",
                                height: "100%",
                                aspectRatio: "16/9",
                            }}
                            onEnded={() => handleVideoEnded()}
                        />

                    </div>
                ) : (
                    <TableDisplay typeDisplay={1} itineraries={itineraries} displayDoble={displayDoble}/>
                )}
            </> : <>
                {/*En caso de esta el el videowall */}
                <div className="flex flex-row gap-2 justify-center bg-black">
                    <DisplayTopBarComponent />
                    <DisplayTopBarComponent />
                </div>
                {mostrarVideo ? (
                    <div className=" flex h-245 justify-center bg-black overflow-hidden">
                        <ReactPlayer
                            ref={playerRef}
                            src={currentAds[totalReproducido].URL}
                            playing={true}
                            muted={true}
                            volume={0.5}
                            controls={false}
                            style={{
                                width: "100%",
                                height: "100%",
                                aspectRatio:"32:9"
                            }}
                            onEnded={() => handleVideoEnded()}
                        />

                    </div>
                ) : (
                    <div className="flex flex-row w-full gap-2 justify-center bg-black">
                        <TableDisplay typeDisplay={1} itineraries={itineraries} displayDoble={displayDoble}/>
                        <TableDisplay typeDisplay={2} itineraries={itineraries} displayDoble={displayDoble}/>
                    </div>
                )}
            </>}

        </div>
    );
};

export default DisplayPage;