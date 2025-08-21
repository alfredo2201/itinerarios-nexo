import { dataTrasporte } from "../data/AutobusesData";
import { handleError } from "../helpers/ErrorHandler";
import type { ItineraryTable } from "../interfaces/types";
import { convertirHora24, validateShowItinerary } from "../utils/validations";

//Servicio para obtener todos los nombres de las empresas con su logo
export const getAllCompanies = async () => {
    try {
        return {
            data: dataTrasporte
        };

    } catch (error) {
        console.error("Error en CompaniesService:", error);
        handleError(error);
    }
}

export const getCompanyById = async (id: string) => {
    try {
        const company = dataTrasporte.find(item => item.UUID === id);
        if (!company) {
            throw new Error("Company not found");
        }
        return {
            data: company
        };
    } catch (error) {
        console.error("Error in getCompanyById:", error);
        handleError(error);
    }
}
//Servicio para obtener la compañia por su nombre
export const getTransportByName = async (name: string) => {
    try {
        const company = dataTrasporte.find(item => item.companyName.toLowerCase() === name.toLowerCase());
        if (!company) {
            throw new Error("Company not found");
        }
        return {
            data: company.trasportation
        };
    } catch (error) {
        console.error("Error in getCompanyByName:", error);
        handleError(error);
    }
}

export const getAllItineraries = async () => {
    try {
        const lista: ItineraryTable[] = []
        for (const company of dataTrasporte) {
            for (const transporte of company.trasportation) {
                for (const itinerary of transporte.itinerary) {
                    if(validateShowItinerary(itinerary.departureTime))
                    lista.push({
                        UUID: transporte.UUID,
                        itinerary: itinerary,
                        image: company.image,
                        code: transporte.code,
                        gpsStatus: transporte.gpsStatus
                    });
                }
            }
        }
        //Ordenar por hora de salida
        const data = lista.sort((a, b) => convertirHora24(a.itinerary.departureTime) - convertirHora24(b.itinerary.departureTime));
        return {
            data: data
        };
    } catch (error) {
        console.error("Error in getAllItineraries:", error);
        handleError(error);
    }
}

export const getItinerariesForPagination = async (from: number, to: number) => {
    try {
        const lista: ItineraryTable[] = []
        for (const company of dataTrasporte) {
            for (const transporte of company.trasportation) {
                for (const itinerary of transporte.itinerary) {
                    if(validateShowItinerary(itinerary.departureTime))
                    lista.push({
                        UUID: transporte.UUID,
                        itinerary: itinerary,
                        image: company.image,
                        code: transporte.code,
                        gpsStatus: transporte.gpsStatus
                    });
                }
            }
        }
        //Ordenar por hora de salida
        const data = lista.sort((a, b) => convertirHora24(a.itinerary.departureTime) - convertirHora24(b.itinerary.departureTime));
        return {
            data: data.slice(from, to)
        };
    } catch (error) {
        console.error("Error in getAllItineraries:", error);
        handleError(error);
    }
}

export const getItineraryNumbers = async () => {
    try {
        let itineraryLength: number = 0
        for (const company of dataTrasporte) {
            for (const transporte of company.trasportation) {                
                itineraryLength = itineraryLength + transporte.itinerary.length;
            }
        }
        //Regresa la cantidad de itinerarios del dia
        return { data: itineraryLength }
    } catch (error) {
        console.error("Error in getItineraryNumbers:", error);
        handleError(error);
    }
}