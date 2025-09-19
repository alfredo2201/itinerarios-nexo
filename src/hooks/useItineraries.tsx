import { useEffect, useState } from "react"
import type { Itinerary } from "../models/Trasportation"
import { handleError } from "../helpers/ErrorHandler"
import { useLocation } from "react-router"
import axios from "axios"
import { getAllItineraries } from "../services/TransportService"

export const useItineraries = () => {
    const location = useLocation();

    const [itineraries, setItineraries] = useState<Itinerary[]>([])
    const [displayDoble, setDobleDisplay] = useState<Itinerary[]>([])

    const [loading, setLoading] = useState<boolean>();


    const limitItineraries = (data: Itinerary[]) => {
        const listItienraires: Itinerary[] = []
        data.map((item) => {
            const hour = new Date(item.departureTime).getUTCHours();
            const minutes =  new Date(item.departureTime).getUTCMinutes();
            item.departureTime = new Date(new Date(item.departureTime).setHours(hour,minutes))            
            if (item.departureTime > new Date()) {
                listItienraires.push(item)
            }
        })
        return listItienraires;
    }


    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            try {
                setLoading(true);
                if (itineraries.length === 0) {
                    const data = await getAllItineraries(controller.signal)
                    // Verificar si la petición no fue cancelada antes de actualizar el estado
                    if (!controller.signal.aborted && data && data.length > 0) {
                        if (location.pathname === '/vertical-display') {
                            setItineraries(limitItineraries(data))
                            return
                        } else {
                            setItineraries(limitItineraries(data).slice(0, 14))
                            if (location.pathname === '/displayExtended') {
                                setDobleDisplay(limitItineraries(data).slice(15, 29))
                            }
                        }
                    }
                }
            } catch (error) {
                if (!axios.isCancel(error) && !controller.signal.aborted) {
                    handleError(error);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchData();       

        return () => {
            controller.abort();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const intervalo = setInterval(() => {
            if (location.pathname === '/vertical-display') {
                setItineraries(limitItineraries(itineraries))
                return
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
        loading
    }

}