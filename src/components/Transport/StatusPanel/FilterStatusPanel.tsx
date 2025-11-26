import { useEffect, useState } from "react";

interface FilterStatusPanelProps {
    currentFilter: string;
    currentSearchTerm: string;
    onFilterChange: (filter: string) => void;
    onSearchChange: (searchTerm: string) => void;
}

export default function FilterStatusPanel({ currentFilter, onFilterChange, onSearchChange }: FilterStatusPanelProps) {
    const [text, setText] = useState('');    

    const handleFilterChange = (value: string) => {
        onSearchChange(value);
    }

     // Efecto para gestionar el retardo
    useEffect(() => {
        const handler = setTimeout(() => {
            handleFilterChange(text);
        }, 300); 
        return () => {
            clearTimeout(handler);
        };
    }, [text]);
    return (
        <div className="flex space-x-2 justify-center items-center">
            <select
                className="px-3 py-1 border border-gray-300 rounded-md text-sm dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                name="filter"
                value={currentFilter}
                onChange={(e) => {
                    onFilterChange(e.target.value);
                }}
            >
                <option value="lastUpdate">Última actualización</option>
                <option value="numberAsc">Número ascendente</option>
                <option value="numberDesc">Número descendente</option>
            </select>
            <input
                type="text"
                name="search"
                placeholder="Buscar por número"
                className="px-3 py-1 border border-gray-300 rounded-md text-sm dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:placeholder-gray-400"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
        </div>
    )
}