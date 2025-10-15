import axios from "axios";
import { handleError } from "../helpers/ErrorHandler";
//import type { ItineraryTable } from "../interfaces/types";
//import { convertirHora24, validateShowItinerary } from "../utils/validations";
import type { Company, PaginatedResponseTransport, Trasport } from "../models/Trasportation";

const URL = import.meta.env.VITE_URL_BASE!
//Servicio para obtener todos los nombres de las empresas con su logo
export const getAllCompanies = async (): Promise<Company[]> => {
    try {
        const response = await axios.get(`${URL}/companies`, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'origin': 'x-requested-with',
                'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error en CompaniesService:", error);
        handleError(error);
        throw error;
    }
}

//Servicio para obtener la compañia por su id
export const getTransportsByCompanyId = async (id: string): Promise<Trasport[] | undefined> => {
    try {
        const response = await axios.get(`${URL}/transports/company/`, {
            params: { companyId: id },
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'origin': 'x-requested-with',
                'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error in getCompanyByName:", error);
        handleError(error);
        return undefined;
    }
}

export const getAllItineraries = async (signal: AbortSignal) => {
    try {
        const response = await axios.get(`${URL}/itineraries`, {
            signal: signal,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'origin': 'x-requested-with',
                'Access-Control-Allow-Headers': 
                'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
            }
        });
        return response.data
    } catch (error) {
        if (!axios.isCancel(error)) {
            console.error('Error:', error);
            handleError(error);
        }
        return [];
    }
}


export const createCompany = async (formData: FormData) => {
    try {
        if (!formData) {
            throw new Error("No form data provided");
        }
        const response = await axios.post(`${URL}/transport`, formData, {
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

export const getTransportsForPagination = async (page: number, companyId:string): Promise<PaginatedResponseTransport> => {
   try {                
        const response = await axios.get(`${URL}/transports/pages`, {            
            params:{
                page:page,
                limit:10,
                companyId:companyId
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