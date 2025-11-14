import { useEffect, useState } from "react"
import type { Itinerary, Trasport } from "../models/Trasportation"
import { handleError } from "../helpers/ErrorHandler"
import { useLocation } from "react-router"
import axios from "axios"
import { getAllItinerariesToDisplays } from "../services/TransportService"
import { getItinerariesByTransport } from "../services/ItineraryService"

export const useItineraries = () => {
    const location = useLocation();
    const [itineraries, setItineraries] = useState<Itinerary[]>([])
    const [displayDoble, setDobleDisplay] = useState<Itinerary[]>([])
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedTransport, setSelectedTransport] = useState<Trasport | null>(null);
    const [isVisible, setIsVisible] = useState(false);



    const limitItineraries = (data: Itinerary[]) => {
        const currentDateTime = new Date();
        return data.filter(item => {
            const departureTime = new Date(item.departureTime);
            departureTime.setHours(
                departureTime.getHours(),
                departureTime.getMinutes(),
                0,
                0
            );
            return departureTime > currentDateTime;
        });
    }

    const loadItineraries = async (transportId: string, transport: Trasport) => {
        if (selectedTransport?._id === transportId) {
            setIsVisible(!isVisible);
            return;
        }

        setSelectedTransport(transport);
        setIsVisible(true);
        setLoading(true);

        try {
            const data = await getItinerariesByTransport(transportId);
            setItineraries(data);
        } catch (err) {
            console.error('Error loading itineraries:', err);
        } finally {
            setLoading(false);
        }
    };

    const reset = () => {
        setIsVisible(false);
        setSelectedTransport(null);
        setItineraries([]);
    };



    const fetchInitialData = async (signal:AbortSignal) => {                
        try {
            setLoading(true);
            if (itineraries.length === 0) {
                const data = await getAllItinerariesToDisplays(signal)
                // Verificar si la petición no fue cancelada antes de actualizar el estado
                if (!signal.aborted && data && data.length > 0) {
                    if (location.pathname === '/vertical-display') {
                        setItineraries(limitItineraries(data))
                    } else {
                        setItineraries(limitItineraries(data).slice(0, 14))
                        if (location.pathname === '/displayExtended') {
                            setDobleDisplay(limitItineraries(data).slice(15, 29))
                        }
                    }
                }
            }
        } catch (error) {
            if (!axios.isCancel(error) && !signal.aborted) {
                handleError(error);
            }
        } finally {
            if (!signal.aborted) {
                setLoading(false);
            }
        }      
    };

    useEffect(() => {
        const intervalo = setInterval(() => {
            if (location.pathname === '/vertical-display') {
                setItineraries(limitItineraries(itineraries))

            } else {
                setItineraries(limitItineraries(itineraries).slice(0, 14))
                if (location.pathname === '/displayExtended') {
                    setDobleDisplay(limitItineraries(itineraries).slice(15, 29))
                }
            }
            // Actualiza cada 10 minutos 
        }, 10 * 60 * 1000)
        return () => clearInterval(intervalo)
    }, [])

    return {
        itineraries,
        displayDoble,
        loading,
        selectedTransport,
        isVisible,
        loadItineraries,
        fetchInitialData,
        reset
    }

}