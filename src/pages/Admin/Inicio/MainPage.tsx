import { useEffect, useState } from "react";
import { Pagination } from "../../../components/Pagination/Pagination";
import { usePagination } from "../../../hooks/usePagination";
import ItineraryTableDisplay from "../../../components/Inicio/ItineraryTable";
import { getItinerariesForPagination } from "../../../services/ItineraryService";
import type { Itinerary, PaginatedResponse } from "../../../models/Trasportation";


function MainPage() {
    const { ITEMS_FOR_PAGE,
        numberArray,
        numberPagination,
        calculatePagination,
        setNumberArrayState,
        page, setterPage } = usePagination();
    const [itineraries, setItineraries] = useState<Itinerary[]>([]);


    //Obtiene toda la informacion de los itinerarios dependiendo del rango a mostrar
    const getInformation = async (numberPage: number) => {
        try {
            const response = await getItinerariesForPagination(numberPage);
            if (response.data?.pagination.totalDocuments !== undefined && response.data.pagination.totalPages) {
                setNumberArrayState(response.data.pagination.totalDocuments);
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
        <div className="w-full h-full sm:px-10 py-6 px-5 overflow-hidden">
            <div className="bg-white flex flex-col p-5 sm:p-8 rounded-lg h-165 2xl:h-160">
                <h1 className="font-sans font-semibold text-xl pb-4 pl-3">
                    Vista Previa del Itinerario
                </h1>
                <ItineraryTableDisplay itineraries={itineraries} />
                <div className="flex flex-col sm:flex-row justify-between items-center px-4 py-6">
                    {itineraries.length > 0 ?
                        <>
                            <div className="text-sm text-slate-500">
                                <span>Mostrando </span>
                                <b>
                                    {1 + ITEMS_FOR_PAGE * (page - 1)}-
                                    {ITEMS_FOR_PAGE * page > numberArray
                                        ? numberArray
                                        : ITEMS_FOR_PAGE * page}
                                </b>{" "}
                                de {numberArray}
                            </div>
                            <Pagination
                                page={page}
                                setPage={setterPage}
                                numberPagination={numberPagination}
                            />
                        </>
                        :
                        <>                        
                        </>
                    }
                </div>
            </div>
        </div>
    );
}


export default MainPage;