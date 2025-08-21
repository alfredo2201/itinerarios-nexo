import ItineraryTable from "../../../components/Inicio/ItineraryTable";
import { Pagination } from "../../../components/Pagination/Pagination";
import { useItineraries } from "../../../hooks/useItineraries";

function MainPage() {
    //Custom Hook para las tablas de los itinerarios que contengan paginacion
    const {
        itineraries,
        page,
        setPage,
        numberItineraries,
        numberPagination,
        ITEMS_FOR_PAGE,
    } = useItineraries();

    return (
        <div className="w-full h-full px-10 py-6 overflow-scroll">
            <div className="bg-white flex flex-col p-8 rounded-lg h-5/6">
                <h1 className="font-sans font-semibold text-xl pb-4 pl-3">
                    Vista Previa del Itinerario
                </h1>

                <ItineraryTable itineraries={itineraries} />

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