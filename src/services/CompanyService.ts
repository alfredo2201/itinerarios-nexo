import { handleError } from "../helpers/ErrorHandler";
import type { Company } from "../models/Trasportation";
import type { CompanyResponse } from "../types/types";
import { AxiosConnect } from "../constants/services.constants";

const api = AxiosConnect

export const insertNewCompanyAndInfo = async (data:FormData): Promise<CompanyResponse> => {
     try {
        const response = await api.post(`/companies`,data ,{
            headers: {
                'Content-Type': 'multipart/form-data',                               
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error en CompaniesService:", error);
        handleError(error);
        throw error;
    }
}
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

export const getCompanyById = async (id: string): Promise<Company> => {
    try {
        const response = await api.get(`/company/`, {
            params: { id },
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

export const getCompanyByName = async (companyName: string | string[]): Promise<Company[]> => {
    const companies = JSON.stringify(companyName)
    try {
        const response = await api.get(`/company/name`, {
            params: { companies: companies },
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