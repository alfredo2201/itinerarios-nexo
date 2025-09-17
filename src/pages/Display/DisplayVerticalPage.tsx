import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import spot from "../../../videos/Spot-Cocacola.mp4"
import DisplayTopBarComponent from "../../components/DisplayTopBar/DisplayTopBarComponent";
import type { Advertisement } from "../../models/Advertisement";
import { useAdvertisement } from "../../hooks/useAdvertisment";
import VideoFlowManager from "../../classes/VideoFlowManager";
import TableVerticalDisplay from "../../components/TableDisplay/TableVerticalDisplay";

// Instancia global del manager
const flowManager: VideoFlowManager = new VideoFlowManager();
function DisplayVerticalPage() {
    const playerRef = useRef(null);

    const { loading, firstGroup, secondGroup, thirdGroup, fourthGroup, getVideosForStep } = useAdvertisement();

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

                <h1 className="text-[30px] font-sans text-center font-semibold bg-gray-300 w-full h-screen">CARGANDO PAGINA...</h1>
            </div>
        );
    }
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

                <TableVerticalDisplay></TableVerticalDisplay>

            }
        </div>
    )
}

export default DisplayVerticalPage;