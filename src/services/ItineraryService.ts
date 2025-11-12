import axios from "axios";
import { handleError } from "../helpers/ErrorHandler";
import type { Itinerary, PaginatedResponse } from "../models/Trasportation";

const URL = import.meta.env.VITE_URL_BASE!
const api = axios.create({
    baseURL: URL,
    withCredentials: true 
})
export const getItinerariesByCompany = async (companyId: string): Promise<Itinerary[]> => {
    try {
        // Simulamos una llamada a una API con un retraso
        await new Promise(resolve => setTimeout(resolve, 500));
        const response = await api.get(`/itineraries/company`, {
            params: { companyId },
            headers: {
                'Content-Type': 'application/json',
               
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error en ItineraryService:", error);
        handleError(error);
        throw error;
    }
}

export const getItinerariesByTransport = async (transportId: string): Promise<Itinerary[]> => {
    try {
        // Simulamos una llamada a una API con un retraso
        await new Promise(resolve => setTimeout(resolve, 500));
        const response = await api.get(`/itineraries/transport`, {
            params: { transportId },
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                
               
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error en ItineraryService:", error);
        handleError(error);
        throw error;
    }
}

export const getItinerariesForPagination = async (page: number): Promise<PaginatedResponse> => {
    try {
        const response = await api.get(`/itineraries/pages`, {
            params: {
                page: page,
                limit: 10
            },
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                
               
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error en ItineraryService:", error);
        handleError(error);
        throw error;
    }
}

// Guardar Itinerario de una compañía
export const saveItineraryForCompany = async (data: FormData): Promise<{ message: string }> => {
    try {
        const response = await api.post(`/itineraries/company/add`, data, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Access-Control-Allow-Origin': '*',
                
               
            },
        });
        return response.data;
    }
    catch (error) {
        console.error("Error en ItineraryService:", error);
        handleError(error);
        throw error;
    }

}


