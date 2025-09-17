import { useEffect, useState } from "react"
import type { Advertisement } from "../models/Advertisement"
import { getVideosByResolution } from "../services/AdvertismentsService"
import { useLocation } from "react-router"
import { handleError } from "../helpers/ErrorHandler"
import axios from "axios"
//Custom Hook para para los anuncios del sistema
export const useAdvertisement = () => {

    const location = useLocation();
    const [advertisements, setAdvertisements] = useState<Advertisement[]>([])
    const [firstGroup, setFirstGroup] = useState<Advertisement[]>([])
    const [secondGroup, setSecondGroup] = useState<Advertisement[]>([])
    const [thirdGroup, setThirdGroup] = useState<Advertisement[]>([])
    const [fourthGroup, setFourthGroup] = useState<Advertisement[]>([])
    const [loading, setLoading] = useState(true)


    //Funcion para separar los anuncios por numero de repeticiones, y los almacena en el grupo que corresponden.
    const splitVideosForRepetitions = (data: Advertisement[]) => {
        const groups: {
            firstBatch: Advertisement[];
            secondBatch: Advertisement[];
            thirdBatch: Advertisement[];
            fourthBatch: Advertisement[]
        } = {
            firstBatch: [],
            secondBatch: [],
            thirdBatch: [],
            fourthBatch: []
        }
        data.map(
            (item) => {
                if (item.repetitions === 50) { // Agrega los videos que se repiten 50 veces en el dia
                    groups.thirdBatch.push(item)
                    groups.fourthBatch.push(item)
                }
                else if (item.repetitions === 100) { // Agrega los videos que se repiten 100 veces en el dia
                    groups.secondBatch.push(item)
                    groups.fourthBatch.push(item)
                }
                else if (item.repetitions === 200) {// Agrega los videos que se repiten 200 en el dia
                    groups.firstBatch.push(item)
                    groups.secondBatch.push(item)
                    groups.thirdBatch.push(item)
                    groups.fourthBatch.push(item)

                }

            }
        );
        setFirstGroup(groups.firstBatch.sort(() => Math.random() - 0.5));
        setSecondGroup(groups.secondBatch.sort(() => Math.random() - 0.5));
        setThirdGroup(groups.thirdBatch.sort(() => Math.random() - 0.5));
        setFourthGroup(groups.fourthBatch.sort(() => Math.random() - 0.5))
    };

    // Función para obtener videos por grupo
    const getVideosForStep = (step: number): Advertisement[] => {
        switch (step) {
            case 1: return firstGroup;      // Solo 200 repeticiones
            case 2: return secondGroup;     // 200 + 100 repeticiones  
            case 3: return thirdGroup;      // 200 + 50 repeticiones
            case 4: return fourthGroup;     // 200 + 100 + 50 repeticiones
            default: return [];
        }
    };

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            try {
                setLoading(true);                
                if (advertisements.length === 0) {
                    let resolution = '';

                    if (location.pathname === '/displays') {
                        resolution = '16:9 Full-HD';
                    } else if (location.pathname === '/displayExtended') {
                        resolution = '21:9 Full-HD';
                    }

                    if (resolution) {
                        const data = await getVideosByResolution(resolution, controller.signal);

                        // Verificar si la petición no fue cancelada antes de actualizar el estado
                        if (!controller.signal.aborted && data && data.length > 0) {
                            setAdvertisements(data);
                            splitVideosForRepetitions(data);
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
    return {
        advertisements,
        firstGroup,
        secondGroup,
        thirdGroup,
        fourthGroup,
        getVideosForStep,
        loading
    }
}
