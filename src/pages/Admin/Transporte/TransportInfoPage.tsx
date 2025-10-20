import { useEffect } from "react";
import FileUploadButton from "../../../components/Autobuses/FileUploadButton";
import FileUploadConfirmation from "../../../components/Autobuses/FileUploadConfirmation";
import TransportTable from "../../../components/Autobuses/TableAutobuses/TransportTable";
import TransportItineraryTable from "../../../components/Autobuses/TableAutobusesItinerario/TransportItineraryTable";
import TransportDetails from "../../../components/Autobuses/TransportDetails";
import { Pagination } from "../../../components/Pagination/Pagination";
import PaginationInfo from "../../../components/Pagination/PaginationInfo";
import useCompanyId from "../../../hooks/useCompanyId";
import useCompanyLogo from "../../../hooks/useCompanyLogo";
import useFileUpload from "../../../hooks/useFileUpload";
import { useItineraries } from "../../../hooks/useItineraries";
import { ALLOWED_FILE_TYPES } from "../../../interfaces/types";
import type { Trasport } from "../../../models/Trasportation";
import { usePagination } from "../../../hooks/usePagination";
import { useTransportData } from "../../../hooks/useTransportData";

function BusInfoPage() {
    const companyId = useCompanyId();

    // Hooks personalizados
    const { logo } = useCompanyLogo(companyId);

    // Paginación local
    const pagination = usePagination({ itemsPerPage: 10 });

    // Hook que automáticamente refetch cuando cambia pagination.currentPage
    const {
        transportData,
        loading,
        totalItems,
        totalPages,
    } = useTransportData(companyId, pagination.currentPage);

    const {
        itineraries,
        loading: itineraryLoading,
        selectedTransport,
        isVisible: isVisibleItinerarios,
        loadItineraries,
        reset: resetItineraries
    } = useItineraries();

    const {
        file,
        uploading,
        fileInputRef,
        handleFileChange,
        handleSubmit,
        openFilePicker,             
    } = useFileUpload(companyId, () => {
        resetItineraries();
        // Recargar la página actual
        window.location.reload(); // Podrías mejorar esto refrescando solo los datos
    });

    const handleTransportSelect = (id: string, transport: Trasport) => {
        loadItineraries(id, transport);
    };

    const { fromIndex, toIndex } = pagination.getPageRange();

    // Actualizar la paginación cuando lleguen los datos
    useEffect(() => {
        if (totalItems > 0) {
            pagination.setTotalItems(totalItems);
            pagination.setTotalPages(totalPages);
        }
    }, [totalItems, totalPages]);
    return (
        <div className="h-auto pt-4 px-5">
            {/* Header */}
            <div className="mb-5 flex justify-center justify-start sm:justify-between px-7">
                <img src={logo} alt="Company Logo" className="h-10 2xl:h-15" />
                <FileUploadButton onClick={openFilePicker} disabled={uploading} />
                <input
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    type="file"
                    accept={ALLOWED_FILE_TYPES.join(', ')}
                />
            </div>

            {/* Main Content */}
            <div className="flex flex-col sm:flex-row w-full h-auto gap-5 px-5 pb-5">
                {/* Transport Status Panel */}
                <div className="bg-white w-full sm:w-1/2 h-120 2xl:h-180 rounded-lg p-8 shadow-xl/10">
                    <h2 className="text-base text-[16px] 2xl:text-[20px] font-bold pb-2 pl-3">
                        Estado del transporte
                    </h2>

                    <div className={`flex justify-center ${transportData.length === 0 ? 'items-center' : ''} w-full bg-white h-70 2xl:h-130 rounded-lg overflow-auto scrollbar-hide`}>
                        <TransportTable
                            data={transportData}
                            loading={loading}
                            onSelectTransport={handleTransportSelect}
                        />
                    </div>

                    {/* Pagination */}
                    {transportData.length > 0 && (
                        <div className="flex flex-col sm:flex-row justify-between items-center px-4 py-6">
                            <PaginationInfo
                                fromIndex={fromIndex}
                                toIndex={toIndex}
                                total={pagination.totalItems}
                            />
                            <Pagination
                                page={pagination.currentPage}
                                setPage={pagination.setPage}
                                numberPagination={pagination.totalPages}
                            />
                        </div>
                    )}
                </div>

                {/* Itinerary Panel */}
                <div className="bg-white w-full sm:w-1/2 h-120 2xl:h-180 rounded-lg p-8 shadow-xl/10">
                    <h2 className="text-[16px] 2xl:text-[20px] text-base font-bold pb-1 pt-2 pl-3">
                        Itinerarios de Hoy
                    </h2>

                    {isVisibleItinerarios && selectedTransport && (
                        <div key="animation-container" className="space-y-4 animate-fade-in">
                            <div className="w-full bg-white h-35 2xl:h-80 rounded-lg overflow-auto scrollbar-hide animate-slide-down">
                                <table className="table-auto md:table-fixed">
                                    <thead>
                                        <tr className="bg-[#A3C0E2] text-black w-full">
                                            <th className="text-[13px] 2xl:text-[16px] w-2xs p-2">Hora de salida</th>
                                            <th className="text-[13px] 2xl:text-[16px] w-lg p-2">Ruta</th>
                                            <th className="text-[13px] 2xl:text-[16px] w-2xs p-2">Duración</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <TransportItineraryTable
                                            itineraries={itineraries}
                                            loading={itineraryLoading}
                                        />
                                    </tbody>
                                </table>
                            </div>

                            <TransportDetails transport={selectedTransport} />
                        </div>
                    )}

                    {!isVisibleItinerarios && !file && (
                        <div className="flex flex-col justify-center items-center h-full">
                            <p className="text-[16px] font-bold text-center">
                                Seleccione un autobus para ver sus itinerarios
                            </p>
                        </div>
                    )}

                    {file && !isVisibleItinerarios && (
                        <FileUploadConfirmation
                            file={file}
                            onSubmit={handleSubmit}
                            uploading={uploading}                                                        
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default BusInfoPage;
