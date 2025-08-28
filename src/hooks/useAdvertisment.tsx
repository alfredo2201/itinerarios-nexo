import { useEffect, useState } from "react"
import type { Advertisement } from "../models/Advertisement"
import { getVideosByResolution } from "../services/AdvertismentsService"
import { useLocation } from "react-router"
import { useCallback } from "react"
//Custom Hook para para los anuncios del sistema
export const useAdvertisement = () => {

    const location = useLocation();
    const [advertisements, setAdvertisements] = useState<Advertisement[]>([])
    const [adsWith50Rep, setAdsWith50Rep] = useState<Advertisement[]>([])
    const [adsWith100Rep, setAdsWith100Rep] = useState<Advertisement[]>([])
    const [adsWith200Rep, setAdsWith200Rep] = useState<Advertisement[]>([])

    //Funcion para obtener los anuncios dependiendo de que pagina se encuentra
    const getVideos = useCallback(() => {
        if (location.pathname === '/displays') {
            getVideosByResolution('Full HD 16:9').then((data) => {
                if (data != null || data != undefined) {
                    setAdvertisements(data)
                    splitVideosForRepetitions(data)
                }
            })
        } else if (location.pathname === '/displaysExtended') {
            getVideosByResolution('Full HD 21:9').then((data) => {
                if (data != null || data != undefined) {
                    setAdvertisements(data)
                    splitVideosForRepetitions(data)
                }
            })
        }
    }, [location.pathname])
    //Funcion para separar los anuncios por numero de repeticiones
    const splitVideosForRepetitions = (data: Advertisement[]) => {
        const groups: { firstBatch: Advertisement[]; secondBatch: Advertisement[]; thirdBatch: Advertisement[] } = {
            firstBatch: [],
            secondBatch: [],
            thirdBatch: []
        }
        data.map(
            (item) => {
                if (item.repetitions === 50) { //Los agrega para reproducirce cada 28.8 min
                    groups.thirdBatch.push(item)
                }
                else if (item.repetitions === 100) { // Los agrega para cada 14.4 min
                    groups.secondBatch.push(item)
                    groups.thirdBatch.push(item)
                }
                else if (item.repetitions === 200) { // Los agrega para cada 7.2 min
                    groups.firstBatch.push(item)
                    groups.secondBatch.push(item)
                    groups.thirdBatch.push(item)
                }

            }
        );
        setAdsWith200Rep(groups.firstBatch.sort(()=> Math.random() - 0.5));
        setAdsWith100Rep(groups.secondBatch.sort(()=> Math.random() - 0.5));
        setAdsWith50Rep(groups.thirdBatch.sort(()=> Math.random() - 0.5));
    };
    useEffect(() => {
        getVideos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return {
        advertisements,
        adsWith50Rep,
        adsWith100Rep,
        adsWith200Rep
    }
}
