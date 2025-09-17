import { useState } from "react";

const ITEMS_FOR_PAGE = 10;
export const usePagination = () => {

    const [numberPagination, setNumberPagination] = useState<number>(0);
    const [numberItineraries, setNumberItineraries] = useState<number>(0);

    //Obtiene los items por cada pagina 
    //Regresa de que indice inicia la paginacion y hasta que limite tiene
    const ItemsForPage = (numberPage: number) => {
        const fromPage = ITEMS_FOR_PAGE * (numberPage - 1);
        const toPage =
            ITEMS_FOR_PAGE * numberPage > numberItineraries
                ? numberItineraries
                : ITEMS_FOR_PAGE * numberPage;
        return { fromPage, toPage };
    };

    //Se encarga de calcular el numero de paginacion que habra
    const calculatePagination = (data: number) => {
       if (data)setNumberPagination(data);
       else return
    };

    const setNumberItinerariesState = (number: number) => {
        if (number >= 0) {
            setNumberItineraries(number)
        } else return
    }

    return {
        ITEMS_FOR_PAGE,
        ItemsForPage,
        numberItineraries,
        numberPagination,
        calculatePagination,
        setNumberItinerariesState
    }
}