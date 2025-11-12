import axios from "axios";
import { handleError } from "../helpers/ErrorHandler";
import type { Company, PaginatedResponseTransport, Trasport } from "../models/Trasportation";

const URL = import.meta.env.VITE_URL_BASE!

const api = axios.create({
    baseURL: URL,
    withCredentials: true 
})

//Servicio para obtener todos los nombres de las empresas con su logo
export const getAllCompanies = async (): Promise<Company[]> => {
    try {
        const response = await api.get(`/companies`, {
            headers: {
                'Content-Type': 'application/json',              
               
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
        const response = await api.get(`/transports/company/`, {
            params: { companyId: id },
            headers: {
                'Content-Type': 'application/json',               
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
        const response = await api.get(`/itineraries`, {
            signal: signal,
            headers: {
                'Content-Type': 'application/json',            
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
        const response = await api.post(`/transport`, formData, {
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

export const getTransportsForPagination = async (page: number, companyId:string, limit:number): Promise<PaginatedResponseTransport> => {
   try {                
        const response = await api.get(`/transports/pages`, {
            params:{
                page:page,
                limit:limit,
                companyId:companyId
            },
            headers: {
                'Content-Type': 'application/json',
                
            },            
        });
        return response.data;
    } catch (error) {
        console.error("Error en ItineraryService:", error);
        handleError(error);
        throw error;
    }
}