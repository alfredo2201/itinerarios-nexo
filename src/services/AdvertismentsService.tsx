import axios from "axios";
import { handleError } from "../helpers/ErrorHandler";
import type { Advertisement } from "../models/Advertisement";
import type { VideoData } from "../interfaces/types";

const URL = import.meta.env.VITE_URL_BASE!
const apiKey = import.meta.env.VITE_API_KEY!
const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET!


export const getVideos = async () => {
    try {
        const response = await axios.get(`${URL}/videos/ads`, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'origin': 'x-requested-with',
                'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error en Advertisments:", error);
        handleError(error);
        // Return a default value or throw to satisfy the return type
        throw error;
    }
}

export const getVideosByRepetitions = async (resolution: number) => {
    try {
        const response = await axios.get(`${URL}/videos/ads/format/${resolution}`, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'origin': 'x-requested-with',
                'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
            }
        });
        return response.data;

    } catch (error) {
        console.error("Error en Advertisments:", error);
        handleError(error);
        throw error;
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
export const getVideosByResolution = async (resolution: string, signal: AbortSignal): Promise<Advertisement[]> => {

    try {
        if (resolution !== '') {
            const response = await axios.get(`${URL}/videos/ads/format/${resolution}`, {
                signal: signal,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'origin': 'x-requested-with',
                    'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
                }
            });            
            return response.data;
        } else {
            return [];
        }
    } catch (error) {
        if (!axios.isCancel(error)) {
            console.error('Error:', error);
            handleError(error);
        }
        return [];
    }
}
//Funcoin para subir videos a Cloudinary
export async function addNewVideo(video: File): Promise<VideoData> {
    try {
        const formData = new FormData();
        formData.append('file', video);
        formData.append('upload_preset', uploadPreset);
        formData.append('api_key', apiKey);
        const response = await axios.post(`${URL}/cloud/upload/video`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Access-Control-Allow-Origin': '*',
                'origin': 'x-requested-with',
                'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error en Advertisments:", error);
        handleError(error);
        // Return a default value or throw to satisfy the return type
        throw error;
    }
}
//Funcion para eliminar videos a Cloudinary
export async function deleteVideo(publicId: string | undefined): Promise<string> {
    try {
        if (publicId == undefined) {
            return "error";
        }

        await axios.delete(`${URL}/cloud/delete/video`, {
            params: {
                publicId: publicId
            },
            headers: {
                'Content-Type': 'multipart/form-data',
                'Access-Control-Allow-Origin': '*',
                'origin': 'x-requested-with',
                'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
            }
        });
        return 'ok';
    } catch (error) {
        console.error("Error en Advertisments:", error);
        handleError(error);
        // Return a default value or throw to satisfy the return type
        throw error;
    }
    //Funcoin para subir videos a Cloudinary
}

//Funcoin para subir videos a Cloudinary
export async function createAdvertisement(data: Advertisement): Promise<VideoData> {
    try {
        const response = await axios.post(`${URL}/videos/ads`, data, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'origin': 'x-requested-with',
                'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error en Advertisments:", error);
        handleError(error);
        // Return a default value or throw to satisfy the return type
        throw error;
    }
}

//Funcoin para hacer la peticion para eliminar anuncios de la base de datos
export async function deletAds(id: string): Promise<VideoData> {
    try {
        const response = await axios.delete(`${URL}/videos/ads/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'origin': 'x-requested-with',
                'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error en Advertisments:", error);
        handleError(error);
        // Return a default value or throw to satisfy the return type
        throw error;
    }
}


