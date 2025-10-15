import { useState } from "react";

const ITEMS_FOR_PAGE = 10;
export const usePagination = () => {

    const [numberPagination, setNumberPagination] = useState<number>(0);
    const [numberArray, setNumberArray] = useState<number>(0);
    const [page, setPage] = useState<number>(1);

    //Obtiene los items por cada pagina 
    //Regresa de que indice inicia la paginacion y hasta que limite tiene
    const ItemsForPage = (numberPage: number) => {
        const fromPage = ITEMS_FOR_PAGE * (numberPage - 1);
        const toPage =
            ITEMS_FOR_PAGE * numberPage > numberArray
                ? numberArray
                : ITEMS_FOR_PAGE * numberPage;
        return { fromPage, toPage };
    };

    
    
    const setterPage = (numberPage:number)=>{
        setPage(numberPage)
    }
    //Se encarga de calcular el numero de paginacion que habra
    const calculatePagination = (data: number) => {
       if (data)setNumberPagination(data);
       else return
    };

    const setNumberArrayState = (number: number) => {
        if (number >= 0) {
            setNumberArray(number)
        } else return
    }

    return {
        ITEMS_FOR_PAGE,
        ItemsForPage,
        numberArray,
        numberPagination,
        calculatePagination,
        setNumberArrayState,
        page,
        setterPage
    }
}