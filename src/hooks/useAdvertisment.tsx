import { useEffect, useState } from "react"
import type { Advertisement } from "../models/Advertisement"
import { getVideosByResolution } from "../services/AdvertismentsService"
import { useLocation } from "react-router"
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
              fourthBatch:Advertisement[] 
            } = {
            firstBatch: [],
            secondBatch: [],
            thirdBatch: [],
            fourthBatch:[]
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
    useEffect(() => {

        if (location.pathname === '/displays') {
            getVideosByResolution('Full HD 16:9').then((data) => {
                if (data != null || data != undefined) {
                    setAdvertisements(data)
                    splitVideosForRepetitions(data)
                    setLoading(false)
                }
            })
        } else if (location.pathname === '/displayExtended') {
            getVideosByResolution('Full HD 21:9').then((data) => {
                if (data != null || data != undefined) {
                    setAdvertisements(data)
                    splitVideosForRepetitions(data)
                    setLoading(false)
                }
            })
        }        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading])

    return {
        advertisements,
        firstGroup,
        secondGroup,
        thirdGroup,
        fourthGroup,
        loading
    }
}
