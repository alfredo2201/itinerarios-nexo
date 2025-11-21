import { useEffect } from "react";
import TransportHeader from "../../../components/Transport/Header/TransportHeader";
import TransportStatusPanel from "../../../components/Transport/StatusPanel/TransportStatusPanel";
import ItineraryPanel from "../../../components/Transport/ItineraryPanel/ItineraryPanel";
import useCompanyId from "../../../hooks/useCompanyId";
import useCompanyLogo from "../../../hooks/useCompanyLogo";
import useFileUpload from "../../../hooks/useFileUpload";
import { useItineraries } from "../../../hooks/useItineraries";
import type { Transport } from "../../../models/Trasportation";
import { usePagination } from "../../../hooks/usePagination";
import { useTransportData } from "../../../hooks/useTransportData";
import { useUserPermissions } from "../../../hooks/useUserPermissions";

function BusInfoPage() {
    const companyId = useCompanyId();
    const { canEdit } = useUserPermissions();

    // Hooks personalizados
    const { logo } = useCompanyLogo(companyId);

    // Paginación local
    const pagination = usePagination({ itemsPerPage: 8 });

    // Hook que automáticamente refetch cuando cambia pagination.currentPage
    const {
        transportData,
        loading,
        totalItems,
        totalPages,          
    } = useTransportData(companyId, pagination.currentPage, pagination.itemsPerPage);

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
        window.dispatchEvent(new CustomEvent('refreshTransportData'));
    });

    const handleTransportSelect = (id: string, transport: Transport) => {
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
        <div className="h-14/15 w-full py-4 px-3 md:p-1 md:px-2 2xl:py-3 flex flex-col bg-gray-100 dark:bg-gray-900">
            <TransportHeader
                logo={logo}
                canEdit={canEdit}
                uploading={uploading}
                fileInputRef={fileInputRef}
                onFileChange={handleFileChange}
                onOpenFilePicker={openFilePicker}
            />

            <div className="flex flex-col sm:flex-row w-full h-auto gap-5 px-5 pb-5">
                <TransportStatusPanel
                    transportData={transportData}
                    loading={loading}
                    onSelectTransport={handleTransportSelect}
                    fromIndex={fromIndex}
                    toIndex={toIndex}
                    totalItems={pagination.totalItems}
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    onPageChange={pagination.setPage}
                />

                <ItineraryPanel
                    isVisible={isVisibleItinerarios}
                    selectedTransport={selectedTransport}
                    itineraries={itineraries}
                    itineraryLoading={itineraryLoading}
                    canEdit={canEdit}
                    file={file}
                    uploading={uploading}
                    onSubmitFile={handleSubmit}
                />
            </div>
        </div>
    );
}

export default BusInfoPage;
