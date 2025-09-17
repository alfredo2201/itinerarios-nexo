import axios from "axios";
import { handleError } from "../helpers/ErrorHandler";
import type { Company } from "../models/Trasportation";

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

export const getCompanyById = async (id: string): Promise<Company> => {
    try {
        const response = await axios.get(`${URL}/companies/`, {
            params: { id },
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'origin': 'x-requested-with',
                'Access-Control-Allow-Headers': 'POST, GET, PUT, DELETE, OPTIONS, HEAD, Authorization, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Access-Control-Allow-Origin',
            }
        });
        return response.data[0];
    } catch (error) {
        console.error("Error en CompaniesService:", error);
        handleError(error);
        throw error;
    }
}