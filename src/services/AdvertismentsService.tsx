import { AnunciosData } from "../data/AnunciosData";
import { handleError } from "../helpers/ErrorHandler";
import type { Advertisment } from "../models/Advertisment";


const data: Advertisment[] = AnunciosData

export const getVideos = async () => {
    try {
        return data
        ;

    } catch (error) {
        console.error("Error en Advertisments:", error);
        handleError(error);
    }
}

export const getVideosByRepetitions = async (repetition:number) => {
    try {
        const auxData: Advertisment[] = []
        data.map((item)=>{            
             if(item.repetitions === repetition) auxData.push(item)
        })
        return auxData
        ;

    } catch (error) {
        console.error("Error en Advertisments:", error);
        handleError(error);
    }
}

export const getVideosByResolution = async (resolution:string) => {
    try {
        const auxData: Advertisment[] = []
        data.map((item)=>{            
             if(item.format === resolution) auxData.push(item)
        })
        return auxData
        ;

    } catch (error) {
        console.error("Error en Advertisments:", error);
        handleError(error);
    }
}
