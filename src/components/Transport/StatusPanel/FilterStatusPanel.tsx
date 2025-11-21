interface FilterStatusPanelProps {
    currentFilter: string;
    currentSearchTerm: string;
    onFilterChange: (filter: string) => void;
    onSearchChange: (searchTerm: string) => void;
}

export default function FilterStatusPanel({ currentFilter, currentSearchTerm, onFilterChange, onSearchChange }: FilterStatusPanelProps) {
    return (
        <div className="flex space-x-2 justify-center items-center">
            <select
                className="px-3 py-1 border border-gray-300 rounded-md text-sm dark:bg-gray-600 dark:border-gray-500 dark:text-white"
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
                placeholder="Buscar por número..."
                className="px-3 py-1 border border-gray-300 rounded-md text-sm dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:placeholder-gray-400"
                value={currentSearchTerm}
                onChange={(e) => {
                    onSearchChange(e.target.value);
                }}
            />
        </div>
    )
}