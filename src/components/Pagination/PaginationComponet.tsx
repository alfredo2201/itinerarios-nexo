import { useState } from "react";

function Pagination() {
    const ITEMS_FOR_PAGE = 10;
    const [page, setPage] = useState<number>(1);
    const [numberPagination, setNumberPagination] = useState<number>(0)
    const [numberItineraries, setNumberItineraries] = useState<number>(0)

    const ItemsForPage = (numberPage: number) => {
        //Calcula el numero por el que inicia la paginacion
        const fromPage = ITEMS_FOR_PAGE * (numberPage - 1);
        //Calcula el limite superior por pagina
        const toPage: number = (ITEMS_FOR_PAGE * numberPage) > numberItineraries
            ? numberItineraries
            : (ITEMS_FOR_PAGE * numberPage);
        return { fromPage, toPage };
    }

    const calculatePagination = (data: number) => {
        //Verifica que data no sea cero
        if (data == 0) return
        //Calcula el residuo del 
        let residue = data % ITEMS_FOR_PAGE;
        //Calcula en numero de paginas que habra en el tablero
        let numberForPage = data / ITEMS_FOR_PAGE;
        residue = numberForPage - residue;
        //Valida si el residuo es mayor a cero y agrega una pagina mas
        if (residue > 0) numberForPage = (numberForPage + 1) - residue
        setNumberPagination(numberForPage)
    }

    return (
        <div className="flex justify-between items-center px-4 py-6">
            <div className="text-sm text-slate-500">
                {/* 
                        Muestra en el contenedor la cantidad de itinerarios en la base de datos, asi como
                        el numero de pagina donde se encuentra el usuario y la cantidad de paginas que hay
                        */}
                <span>Mostrando </span>
                <b>
                    {1 + (ITEMS_FOR_PAGE * (page - 1))}-{(ITEMS_FOR_PAGE * page) > numberItineraries
                        ? numberItineraries
                        : (ITEMS_FOR_PAGE * page)}
                </b> de {numberItineraries}
            </div>
            <div className="flex space-x-1">
                <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease"
                    onClick={() => {
                        if (page > 1) setPage(page - 1)
                    }}
                >
                    Prev
                </button>

                {
                    Array.from({ length: numberPagination }, (_, i) => {
                        const pageNumber = i + 1;
                        const isActive = page == pageNumber
                        return (
                            <button
                                key={i}
                                className={`px-3 py-1 min-w-9 min-h-9 text-sm font-normal  border rounded transition duration-200 ease
                                            ${isActive
                                        ? "bg-[#023672] text-white " // Activo
                                        : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50 hover:border-slate-400" //Inactivo
                                    }`}
                                onClick={() => {
                                    if (page == pageNumber) return
                                    setPage(pageNumber);
                                }}
                            >
                                {pageNumber}
                            </button>
                        )
                    })
                }
                <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease"
                    onClick={() => {
                        if (page < numberPagination) setPage(page + 1)
                    }}
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default Pagination;