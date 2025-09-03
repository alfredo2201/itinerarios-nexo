import type { FlowStep, GroupAvailability } from '../interfaces/types'
import type { Advertisement } from '../models/Advertisement';

// ===== SISTEMA DE PROGRAMACIÓN DE VIDEOS =====
const BASE_SCREEN_TIME: number = 5 * 1000;     // 5 segundos
const DOUBLE_SCREEN_TIME: number = 10 * 1000;  // 10 segundos  
const TRIPLE_SCREEN_TIME: number = 15 * 1000;  // 15 segundos

export default class VideoFlowManager {
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