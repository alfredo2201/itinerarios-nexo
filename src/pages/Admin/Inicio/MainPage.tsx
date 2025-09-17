import { useEffect, useState } from "react";
import type { ItineraryTable } from "../../../interfaces/types";
import { Pagination } from "../../../components/Pagination/Pagination";
import { usePagination } from "../../../hooks/usePagination";
import { getItineraryNumbers } from "../../../services/TransportService";
import ItineraryTableDisplay from "../../../components/Inicio/ItineraryTable";
import { getItinerariesForPagination } from "../../../services/ItineraryService";
import type { Itinerary, PaginatedResponse } from "../../../models/Trasportation";


function MainPage() {
    const { ITEMS_FOR_PAGE,
        ItemsForPage,
        numberItineraries,
        numberPagination,
        calculatePagination,
        setNumberItinerariesState } = usePagination();
    const [itineraries, setItineraries] = useState<Itinerary[]>([]);
    const [page, setPage] = useState<number>(1);


    //Obtiene toda la informacion de los itinerarios dependiendo del rango a mostrar
    const getInformation = async (numberPage: number) => {
        try {
            const response = await getItinerariesForPagination(numberPage);
            if (response.data?.pagination.totalDocuments !== undefined && response.data.pagination.totalPages) {
                setNumberItinerariesState(response.data.pagination.totalDocuments);
                calculatePagination(response.data.pagination.totalPages);
            }
            const data: PaginatedResponse = response;
            return data;
        } catch (error) {
            console.error("Error fetching itineraries:", error);
            return undefined;
        }
    };

    useEffect(() => {
        getInformation(page).then((response) => {
            if (response != undefined) {
                if (response.data?.itineraries !== undefined) {
                    setItineraries(response.data.itineraries)
                };
            }

        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [numberPagination, page]);

    return (
        <div className="w-full h-full sm:px-10 py-6 overflow-hidden">
            <div className="bg-white flex flex-col p-8 rounded-lg h-100 lg:h-180">
                <h1 className="font-sans font-semibold text-xl pb-4 pl-3">
                    Vista Previa del Itinerario
                </h1>
                <ItineraryTableDisplay itineraries={itineraries} />
                <div className="flex flex-col sm:flex-row justify-between items-center px-4 py-6">
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