
import { useEffect, useRef, useState } from "react";
import TableDisplay from "../../components/TableDisplay/TableDisplay";
import ReactPlayer from "react-player";
import DisplayTopBarComponent from "../../components/DisplayTopBar/DisplayTopBarComponent";
import { useAdvertisement } from "../../hooks/useAdvertisment";
import type { Advertisement } from "../../models/Advertisement";

// ===== TIPOS DE TYPESCRIPT =====
interface GroupAvailability {
    has200: boolean;
    has100: boolean;  
    has50: boolean;
    hasAll: boolean;
}

interface FlowStep {
    group: number;
    duration: number;
}

// ===== SISTEMA DE PROGRAMACIÓN DE VIDEOS =====
const BASE_SCREEN_TIME: number = 5 * 1000;     // 5 segundos
const DOUBLE_SCREEN_TIME: number = 10 * 1000;  // 10 segundos  
const TRIPLE_SCREEN_TIME: number = 15 * 1000;  // 15 segundos

class VideoFlowManager {
    public initialized: boolean;
    private available: GroupAvailability;
    private flowPattern: FlowStep[];
    private patternIndex: number;

    constructor() {
        this.initialized = false;
        this.available = {
            has200: false,
            has100: false,
            has50: false,
            hasAll: false
        };
        this.flowPattern = [];
        this.patternIndex = 0;
    }
    
    initialize(getVideosForStep: (step: number) => Advertisement[]): void {
        // Determinar disponibilidad basado en tus grupos
        this.available = {
            has200: getVideosForStep(1).length > 0,    // firstGroup (solo 200)
            has100: getVideosForStep(2).length > 0,    // secondGroup (200+100) 
            has50: getVideosForStep(3).length > 0,     // thirdGroup (200+50)
            hasAll: getVideosForStep(4).length > 0     // fourthGroup (200+100+50)
        };
        
        // Determinar patrón según disponibilidad con tiempos específicos
        this.flowPattern = this.determineFlowPattern();
        this.patternIndex = 0;
        this.initialized = true;
    }
    
    private determineFlowPattern(): FlowStep[] {
        const { has200, has100, has50 } = this.available;
        
        // ESCENARIO 1: Cuando hay todos los anuncios (Happy Path)
        if (has200 && has100 && has50) {
            return [
                { group: 1, duration: BASE_SCREEN_TIME },      // Arreglo1(5s)
                { group: 2, duration: BASE_SCREEN_TIME },      // Arreglo2(5s)
                { group: 3, duration: BASE_SCREEN_TIME },      // Arreglo3(5s)
                { group: 2, duration: BASE_SCREEN_TIME },      // Arreglo2(5s)
                { group: 1, duration: BASE_SCREEN_TIME },      // Arreglo1(5s)
                { group: 4, duration: BASE_SCREEN_TIME }       // Arreglo4(5s)
            ];
        }
        // ESCENARIO 2: Cuando faltan los videos de 200 rep
        else if (!has200 && has100 && has50) {
            return [
                { group: 2, duration: DOUBLE_SCREEN_TIME },    // Arreglo2(10s)
                { group: 3, duration: BASE_SCREEN_TIME },      // Arreglo3(5s)
                { group: 2, duration: BASE_SCREEN_TIME },      // Arreglo2(5s)
                { group: 4, duration: DOUBLE_SCREEN_TIME }     // Arreglo4(10s)
            ];
        }
        // ESCENARIO 3: Cuando solo hay de 100 repeticiones
        else if (!has200 && has100 && !has50) {
            return [
                { group: 2, duration: DOUBLE_SCREEN_TIME },    // Arreglo2(10s)
                { group: 2, duration: DOUBLE_SCREEN_TIME },    // Arreglo2(10s)
                { group: 4, duration: DOUBLE_SCREEN_TIME }     // Arreglo4(10s)
            ];
        }
        // ESCENARIO 4: Cuando faltan los videos de 200 y 100 rep (solo 50)
        else if (!has200 && !has100 && has50) {
            return [
                { group: 3, duration: TRIPLE_SCREEN_TIME },    // Arreglo3(15s)
                { group: 4, duration: TRIPLE_SCREEN_TIME }     // Arreglo4(15s)
            ];
        }
        else {
            // Casos no contemplados en la imagen
            return [];
        }
    }
    
    getNextStep(): { group: number, duration: number } | null {
        if (this.flowPattern.length === 0) return null;
        
        const nextStep = this.flowPattern[this.patternIndex];
        this.patternIndex = (this.patternIndex + 1) % this.flowPattern.length;
        
        return nextStep;
    }
    
    // NUEVA FUNCIÓN: Obtiene el tiempo actual de la tabla según el paso actual
    getCurrentTableTime(): number {
        if (this.flowPattern.length === 0) return BASE_SCREEN_TIME;
        
        const currentStep = this.flowPattern[this.patternIndex];
        return currentStep.duration;
    }
    
    // FUNCIÓN ANTERIOR MANTENIDA PARA COMPATIBILIDAD (ahora delegada)
    getTableTime(): number {
        return this.getCurrentTableTime();
    }
    
    reset(): void {
        this.initialized = false;
        this.flowPattern = [];
        this.patternIndex = 0;
        this.available = {
            has200: false,
            has100: false,
            has50: false,
            hasAll: false
        };
    }
    
    getCurrentState() {
        return {
            available: this.available,
            pattern: this.flowPattern.map(step => step.group),
            flowPattern: this.flowPattern,
            index: this.patternIndex,
            tableTime: this.getCurrentTableTime(),
            currentStep: this.flowPattern[this.patternIndex] || null
        };
    }
    
    // NUEVA FUNCIÓN: Para debug más detallado
    getDetailedState() {
        const currentStep = this.flowPattern[this.patternIndex] || null;
        return {
            ...this.getCurrentState(),
            nextStep: currentStep,
            totalSteps: this.flowPattern.length,
            completedCycles: Math.floor(this.patternIndex / this.flowPattern.length)
        };
    }
}

// Instancia global del manager
const flowManager: VideoFlowManager = new VideoFlowManager();

const DisplayPage: React.FC = () => {
    const playerRef = useRef(null);
    
    const { loading, firstGroup, secondGroup, thirdGroup, fourthGroup } = useAdvertisement();

    const [mostrarVideo, setMostrarVideo] = useState<boolean>(false);
    const [currentAds, setCurrentAds] = useState<Advertisement[]>([]);
    const [totalReproducido, setTotalReproducido] = useState<number>(0);
    const [currentStep, setCurrentStep] = useState<number>(0);

    // Función para obtener videos por grupo
    const getVideosForStep = (step: number): Advertisement[] => {
        switch (step) {
            case 1: return firstGroup;      // Solo 200 repeticiones
            case 2: return secondGroup;     // 200 + 100 repeticiones  
            case 3: return thirdGroup;      // 200 + 50 repeticiones
            case 4: return fourthGroup;     // 200 + 100 + 50 repeticiones
            default: return [];
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
                        setCurrentStep(nextStep.group);
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

    // Cuando termina un video
    const handleVideoEnded = (): void => {
        if (totalReproducido + 1 < currentAds.length) {
            setTotalReproducido(totalReproducido + 1);
        } else {
            console.log(`🏁 Grupo ${currentStep} completado, volviendo a tabla`);
            setMostrarVideo(false);
            setTotalReproducido(0);
        }
    };

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
                <h1>CARGANDO PAGINA...</h1>
            </div>
        );
    }

    return (
        <div className="fixed flex flex-col">
            <DisplayTopBarComponent />
            
            {mostrarVideo ? (
                <div className="w-screen justify-center">
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
                        onEnded={()=>handleVideoEnded()}
                    />
                
                </div>
            ) : (
                <TableDisplay />
            )}
        </div>
    );
};

export default DisplayPage;