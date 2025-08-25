import { useEffect, useState } from "react"
import type { Advertisement } from "../models/Advertisement"
import { getVideosByResolution } from "../services/AdvertismentsService"
import { useLocation } from "react-router"

//Custom Hook para para los anuncios del sistema
export const useAdvertisement = () => {

    const location = useLocation();
    const [advertisements, setAdvertisements] = useState<Advertisement[]>([])
    const [adsWith50Rep, setAdsWith50Rep] = useState<Advertisement[]>([])
    const [adsWith100Rep, setAdsWith100Rep] = useState<Advertisement[]>([])
    const [adsWith200Rep, setAdsWith200Rep] = useState<Advertisement[]>([])
    //const time50Rep = 28.8*60*1000;
    //const time100Rep = 14.4*60*1000;
    //const time200Rep = 7.2*60*1000;
    //Funcion para obtener los anuncios dependiendo de que pagina se encuentra
    const getVideos = () => {
        if (location.pathname === '/displays') {
            getVideosByResolution('Full HD 16:9').then((data) => {
                if (data != null || data != undefined) {
                    setAdvertisements(data)
                }
            })
        } else if (location.pathname === '/displaysExtended') {
            getVideosByResolution('Full HD 21:9').then((data) => {
                if (data != null || data != undefined) {
                    setAdvertisements(data)
                }
            })
        }
        splitVideosForRepetitions()
    }
    //Funcion para separar los anuncios por numero de repeticiones
    const splitVideosForRepetitions = () => {
        const groups = advertisements.reduce(
            (acc, item) => {
                if (item.repetitions === 50) acc.with50.push(item);
                else if (item.repetitions === 100) acc.with100.push(item);
                else if (item.repetitions === 200) acc.with200.push(item);
                return acc;
            },
            { with50: [] as Advertisement[], with100: [] as Advertisement[], with200: [] as Advertisement[] }
        );

        setAdsWith50Rep(groups.with50);
        setAdsWith100Rep(groups.with100);
        setAdsWith200Rep(groups.with200);
    };
    useEffect(() => {
        getVideos()
    }, [])

    return {
        advertisements,
        adsWith50Rep,
        adsWith100Rep,
        adsWith200Rep
    }
}
