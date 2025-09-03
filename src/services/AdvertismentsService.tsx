import { AnunciosData } from "../data/AnunciosData";
import { handleError } from "../helpers/ErrorHandler";
import type { Advertisement } from "../models/Advertisement";

const data: Advertisement[] = AnunciosData

export const getVideos = async () => {
    try {
        return data
    } catch (error) {
        console.error("Error en Advertisments:", error);
        handleError(error);
    }
}

export const getVideosByRepetitions = async (repetition: number) => {
    try {
        const auxData: Advertisement[] = []
        data.map((item) => {
            if (item.repetitions === repetition) auxData.push(item)
        })
        return auxData
            ;

    } catch (error) {
        console.error("Error en Advertisments:", error);
        handleError(error);
    }
}

/**
 * Retrieves a list of advertisments filtered by the specified video resolution.
 *
 * @param resolution - The desired video resolution (format) to filter advertisments by.
 * @returns A promise that resolves to an array of `Advertisment` objects matching the given resolution,
 *          or `null` if the resolution is an empty string.
 * @throws Logs and handles any errors that occur during the process.
 */
export const getVideosByResolution = async (resolution: string) => {
    try {
        if (resolution != '') {
            const auxData: Advertisement[] = []
            data.map((item) => {
                if (item.format === resolution) auxData.push(item)
            })
            return auxData
        } else {
            return null
        }
        ;

    } catch (error) {
        console.error("Error en Advertisments:", error);
        handleError(error);
    }
}
