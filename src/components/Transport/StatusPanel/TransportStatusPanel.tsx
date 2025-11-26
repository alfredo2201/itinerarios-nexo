import TransportTable from "../../Autobuses/TableAutobuses/TransportTable";
import { Pagination } from "../../Pagination/Pagination";
import PaginationInfo from "../../Pagination/PaginationInfo";
import type { Transport } from "../../../models/Trasportation";
import FilterStatusPanel from "./FilterStatusPanel";
import { useState, useEffect } from "react";
import { usePagination } from "../../../hooks/usePagination";
import { useTransportData } from "../../../hooks/useTransportData";
import useCompanyId from "../../../hooks/useCompanyId";
interface TransportStatusPanelProps {
    onSelectTransport: (id: string, transport: Transport) => void;
}

function TransportStatusPanel({
    onSelectTransport,
}: TransportStatusPanelProps) {
    const companyId = useCompanyId();
    const [currentFilter, setCurrentFilter] = useState<string>('lastUpdate');
    const [searchTerm, setSearchTerm] = useState<string>('');    
    // Paginación local
    const pagination = usePagination({ itemsPerPage: 8 });

    const { fromIndex, toIndex } = pagination.getPageRange();
    const {
        transportData,
        loading,
        totalItems,
        totalPages,
        setOrderedBy,
        setSearchedByTerm,
    } = useTransportData(companyId, pagination.currentPage, pagination.itemsPerPage);


    const handleFilterChange = (filter: string) => {
        setCurrentFilter(filter);
        setOrderedBy?.(filter);
    }

    const handleSearchChange = (searchTerm: string) => {
        setSearchTerm(searchTerm);
        setSearchedByTerm?.(searchTerm);
    }

    useEffect(() => {
        if (totalItems > 0) {
            pagination.setTotalItems(totalItems);
            pagination.setTotalPages(totalPages);
        }
    }, [totalItems, totalPages]);
    return (
        <div className="bg-white w-full sm:w-1/2 h-full xl:h-155 2xl:h-180 rounded-lg px-8 py-4 shadow-xl/10 dark:bg-gray-700">
            <div className="flex flex-col 2xl:flex-row justify-center md:justify-between items-center pb-2 pl-3">
                <h2 className="text-base text-[16px] 2xl:text-[20px] font-bold dark:text-white">
                    Estado del transporte
                </h2>
                <FilterStatusPanel onFilterChange={handleFilterChange} onSearchChange={handleSearchChange} currentFilter={currentFilter} currentSearchTerm={searchTerm} />
            </div>
            <div className={`flex justify-center ${transportData.length === 0 ? 'items-center' : ''} w-full h-115 2xl:h-130 rounded-lg overflow-auto scrollbar-hide`}>
                <TransportTable
                    data={transportData}
                    loading={loading}
                    onSelectTransport={onSelectTransport}
                />
            </div>

            {/* Pagination */}
            {transportData.length > 0 && (
                <div className="flex flex-col xl:flex-row justify-between items-center px-4 py-6">
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
                </div>
            )}
        </div>
    );
}

export default TransportStatusPanel;