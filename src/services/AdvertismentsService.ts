import axios from "axios";
import { handleError } from "../helpers/ErrorHandler";
import type { Advertisement } from "../models/Advertisement";
import type { VideoData } from "../types/types";
import { AxiosConnect } from "../constants/services.constants";

const apiKey = import.meta.env.VITE_API_KEY!
const uploadPreset = import.meta.env.VITE_UPLOAD_PRESET!
const api = AxiosConnect

export const getVideos = async () => {
    try {
        const response = await api.get(`/videos/ads`, {
            headers: {
                'Content-Type': 'application/json',
               
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error en Advertisments:", error);
        handleError(error);
        throw error;
    }
}

export const getVideosByRepetitions = async (resolution: number) => {
    try {
        const response = await api.get(`/videos/ads/format/${resolution}`, {
            headers: {
                'Content-Type': 'application/json',
               
            }
        });
        return response.data;

    } catch (error) {
        console.error("Error en Advertisments:", error);
        handleError(error);
        throw error;
    }
}

export const getVideosByCompanyName = async (companyName: string) => {
    try {
        const response = await api.get(`/videos/ads/company/`, {
            params: {
                companyName: companyName
            },
            headers: {
                'Content-Type': 'application/json',
               
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
 * Recupera una lista de anuncios filtrados por la resolución de video especificada.
 *
 * @param resolution - La resolución de video (formato) deseada para filtrar los anuncios.
 * @returns Una promesa que resuelve a un arreglo de objetos `Advertisment` que coinciden con la resolución dada,
 *          o `null` si la resolución es una cadena vacía.
 * @throws Registra y maneja cualquier error que ocurra durante el proceso.
 */
export const getVideosByResolution = async (resolution: string, signal: AbortSignal): Promise<Advertisement[]> => {

    try {
        if (resolution !== '') {
            const response = await api.get(`/videos/ads/format/${resolution}`, {
                signal: signal,
                headers: {
                    'Content-Type': 'application/json',
                   
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

/**
 * Sube un nuevo archivo de video al almacenamiento en la nube a través de la API.
 *
 * @param video - El archivo de video que se va a subir.
 * @returns Una promesa que resuelve con los datos del video subido.
 * @throws Lanzará un error si la subida falla.
 *
 * @remarks
 * Esta función envía una solicitud POST al endpoint `/cloud/upload/video`,
 * incluyendo el archivo de video y las credenciales requeridas en un payload multipart/form-data.
 *
 */
export async function addNewVideo(video: File): Promise<VideoData> {
    try {
        const formData = new FormData();
        formData.append('file', video);
        formData.append('upload_preset', uploadPreset);
        formData.append('api_key', apiKey);
        const response = await api.post(`/cloud/upload/video`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
               
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

        await api.delete(`/cloud/delete/video`, {
            params: {
                publicId: publicId
            },
            headers: {
                'Content-Type': 'multipart/form-data',
               
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
        const response = await api.post(`/videos/ads`, data, {
            headers: {
                'Content-Type': 'application/json',
               
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
        const response = await api.delete(`/videos/ads/${id}`, {
            headers: {
                'Content-Type': 'application/json',
               
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


