import axios from "axios";
import { handleError } from "../helpers/ErrorHandler";
//import type { ItineraryTable } from "../interfaces/types";
//import { convertirHora24, validateShowItinerary } from "../utils/validations";
import type { Itinerary, PaginatedResponse } from "../models/Trasportation";

const URL = import.meta.env.VITE_URL_BASE!
export const getItinerariesByCompany = async (companyId: string): Promise<Itinerary[]> => {
    try {
        // Simulamos una llamada a una API con un retraso
        await new Promise(resolve => setTimeout(resolve, 500));
        const response = await axios.get(`${URL}/itineraries/company/`, {
            params: { companyId },
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'origin': 'x-requested-with',
                'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
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
        const response = await axios.get(`${URL}/itineraries/transport`, {
            params: { transportId },
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'origin': 'x-requested-with',
                'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
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
        const response = await axios.get(`${URL}/itineraries/pages`, {            
            params:{
                page:page,
                limit:14
            },
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'origin': 'x-requested-with',
                'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
            },            
        });
        return response.data;
    } catch (error) {
        console.error("Error en ItineraryService:", error);
        handleError(error);
        throw error;
    }
}


