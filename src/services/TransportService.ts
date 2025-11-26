import axios from "axios";
import { handleError } from "../helpers/ErrorHandler";
import type { Company, PaginatedResponseTransport, Transport } from "../models/Trasportation";
import type { TransportOptions } from "../types/transports.types";
import { AxiosConnect } from "../constants/services.constants";

const api = AxiosConnect

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
export const getTransportsByCompanyId = async (id: string): Promise<Transport[] | undefined> => {
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

export const getAllItinerariesToDisplays = async (signal: AbortSignal) => {
    try {
        const response = await api.get(`/itineraries/toDisplays`, {
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

export const getTransportsForPagination = async (page: number, companyId:string, limit:number, options?:TransportOptions): Promise<PaginatedResponseTransport> => {
   try {                
        const response = await api.get(`/transports/pages`, {
            params:{
                page:page,
                limit:limit,
                companyId:companyId,
                orderBy: options?.orderBy,
                code: options?.searchTerm
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