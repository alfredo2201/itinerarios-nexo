import { useEffect } from "react";
import { Pagination } from "../../../components/Pagination/Pagination";
import { usePagination } from "../../../hooks/usePagination";
import ItineraryTableDisplay from "../../../components/Inicio/ItineraryTable"
import useItinerariesData from "../../../hooks/useItinerariesData";
import PaginationInfo from "../../../components/Pagination/PaginationInfo";


function MainPage() {
  // Hook de paginación
  const pagination = usePagination({ itemsPerPage: 10 });

  // Hook de datos que refetch automáticamente al cambiar página
  const {
    itineraries,
    loading,
    error,
    totalItems,
    totalPages,
    refetch
  } = useItinerariesData(pagination.currentPage);

  // Actualizar totales de paginación cuando llegan los datos
  useEffect(() => {
    if (totalItems > 0) {
      pagination.setTotalItems(totalItems);
      pagination.setTotalPages(totalPages);
    }
  }, [totalItems, totalPages]);

  const { fromIndex, toIndex } = pagination.getPageRange();

  return (
    <div className="w-full h-full sm:px-10 py-6 px-5 overflow-hidden">
      <div className="bg-white flex flex-col p-5 sm:p-8 rounded-lg h-165 2xl:h-160">
        <h1 className="font-sans font-semibold text-xl pb-4 pl-3">
          Vista Previa del Itinerario
        </h1>

        {/* Manejo de errores */}
        {error && (
          <div className="text-red-500 p-4 mb-4 bg-red-50 rounded">
            {error}
            <button onClick={refetch} className="ml-4 underline">
              Reintentar
            </button>
          </div>
        )}

        {/* Tabla de itinerarios */}
        <ItineraryTableDisplay 
          itineraries={itineraries} 
          loading={loading}
        />

        {/* Paginación */}
        <div className="flex flex-col sm:flex-row justify-between items-center px-4 py-6">
          {itineraries.length > 0 && (
            <>
              <PaginationInfo
                fromIndex={fromIndex}
                toIndex={toIndex}
                total={totalItems}
              />
              <Pagination
                page={pagination.currentPage}
                setPage={pagination.setPage}
                numberPagination={totalPages}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default MainPage;