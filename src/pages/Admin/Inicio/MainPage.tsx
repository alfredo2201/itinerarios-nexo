import { useEffect, useState } from "react";
import type { ItineraryTable } from "../../../interfaces/types";
import { Pagination } from "../../../components/Pagination/Pagination";
import { usePagination } from "../../../hooks/usePagination";
import { getItinerariesForPagination, getItineraryNumbers } from "../../../services/TransportService";
import ItineraryTableDisplay from "../../../components/Inicio/ItineraryTable";


function MainPage() {
    const {ITEMS_FOR_PAGE,
        ItemsForPage,
        numberItineraries,
        numberPagination,
        calculatePagination,
        setNumberItinerariesState } = usePagination();
    const [itineraries, setItineraries] = useState<ItineraryTable[]>([]);
    const [page, setPage] = useState<number>(1);


    //Obtiene toda la informacion de los itinerarios dependiendo del rango a mostrar
    const getInformation = async (numberPage: number) => {
        try {
            const { fromPage, toPage } = ItemsForPage(numberPage);
            const data = await getItinerariesForPagination(fromPage, toPage).then(
                (response) => response?.data
            );
            return data;
        } catch (error) {
            console.error("Error fetching itineraries:", error);
        }
    };

    useEffect(() => {
        getItineraryNumbers().then((response) => {
            if (response?.data !== undefined) {
                setNumberItinerariesState(response.data);
                calculatePagination(response.data);
            }
        });
        getInformation(page).then((data) => {
            if (data !== undefined) {                
                setItineraries(data)                
            };
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [numberPagination, page]);

    return (
        <div className="w-full h-full px-10 py-6 overflow-scroll">
            <div className="bg-white flex flex-col p-8 rounded-lg h-5/6">
                <h1 className="font-sans font-semibold text-xl pb-4 pl-3">
                    Vista Previa del Itinerario
                </h1>

                <ItineraryTableDisplay  itineraries={itineraries} />

                <div className="flex justify-between items-center px-4 py-6">
                    <div className="text-sm text-slate-500">
                        <span>Mostrando </span>
                        <b>
                            {1 + ITEMS_FOR_PAGE * (page - 1)}-
                            {ITEMS_FOR_PAGE * page > numberItineraries
                                ? numberItineraries
                                : ITEMS_FOR_PAGE * page}
                        </b>{" "}
                        de {numberItineraries}
                    </div>

                    <Pagination
                        page={page}
                        setPage={setPage}
                        numberPagination={numberPagination}
                    />
                </div>
            </div>
        </div>
    );
}


export default MainPage;