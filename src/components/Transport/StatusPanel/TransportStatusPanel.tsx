import TransportTable from "../../Autobuses/TableAutobuses/TransportTable";
import { Pagination } from "../../Pagination/Pagination";
import PaginationInfo from "../../Pagination/PaginationInfo";
import type { Transport } from "../../../models/Trasportation";
import FilterStatusPanel from "./FilterStatusPanel";
import { useState, useEffect } from "react";
interface TransportStatusPanelProps {
    transportData: Transport[];
    loading: boolean;
    fromIndex: number;
    toIndex: number;
    totalItems: number;
    currentPage: number;
    totalPages: number;
    onSelectTransport: (id: string, transport: Transport) => void;
    onPageChange: (page: number) => void;
}

function TransportStatusPanel({
    transportData,
    loading,
    onSelectTransport,
    fromIndex,
    toIndex,
    totalItems,
    currentPage,
    totalPages,
    onPageChange
}: TransportStatusPanelProps) {
    const [filteredData, setFilteredData] = useState<Transport[]>(transportData);
    const [currentFilter, setCurrentFilter] = useState<string>('all');
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleFilterChange = (filter: string) => {        
        setCurrentFilter(filter);
        setFilteredData(sortingFilter(transportData, filter));
    }

    const handleSearchChange = (searchTerm: string) => {
        setSearchTerm(searchTerm);    
        setFilteredData(searchData(transportData, searchTerm));    
    }

    const sortingFilter = (data: Transport[], filter: string) => {  
        let sortedData = [...data];
        if (filter === 'lastUpdate') {
            sortedData.sort((a, b) => {
                const dateA = new Date(a.lastSeen || 0).getTime();
                const dateB = new Date(b.lastSeen || 0).getTime();
                return dateB - dateA; // Descending order
            }   );
        } else if (filter === 'numberAsc') {    
            sortedData.sort((a, b) => { 
                const codeA = a.code?.toLowerCase() || '';
                const codeB = b.code?.toLowerCase() || '';
                return codeA.localeCompare(codeB); // Ascending order
            })
        } else if (filter === 'numberDesc') {
            sortedData.sort((a, b) => {
                const codeA = a.code?.toLowerCase() || '';      
                const codeB = b.code?.toLowerCase() || '';
                return codeB.localeCompare(codeA); // Descending order
            });
        }
        return sortedData;
    }

    const searchData = (data:Transport[], term: string) => {
        if (term.trim() === '') {
            return data;
        }
        return data.filter(transport => 
            transport.code?.toLowerCase().includes(term.toLowerCase())
        );
    }



    // Update filtered data when transportData changes
    useEffect(() => {
        setFilteredData(transportData);
    }, [transportData]);

    return (
        <div className="bg-white w-full sm:w-1/2 h-full xl:h-155 2xl:h-180 rounded-lg px-8 py-4 shadow-xl/10 dark:bg-gray-700">
            <div className="flex flex-col 2xl:flex-row justify-center md:justify-between items-center pb-2 pl-3">
                <h2 className="text-base text-[16px] 2xl:text-[20px] font-bold dark:text-white">
                    Estado del transporte
                </h2>
                <FilterStatusPanel onFilterChange={handleFilterChange} onSearchChange={handleSearchChange} currentFilter={currentFilter} currentSearchTerm={searchTerm} />
            </div>
            <div className={`flex justify-center ${filteredData.length === 0 ? 'items-center' : ''} w-full h-115 2xl:h-130 rounded-lg overflow-auto scrollbar-hide`}>
                <TransportTable
                    data={filteredData}
                    loading={loading}
                    onSelectTransport={onSelectTransport}
                />
            </div>

            {/* Pagination */}
            {filteredData.length > 0 && (
                <div className="flex flex-col xl:flex-row justify-between items-center px-4 py-6">
                    <PaginationInfo
                        fromIndex={fromIndex}
                        toIndex={toIndex}
                        total={totalItems}
                    />
                    <Pagination
                        page={currentPage}
                        setPage={onPageChange}
                        numberPagination={totalPages}
                    />
                </div>
            )}
        </div>
    );
}

export default TransportStatusPanel;