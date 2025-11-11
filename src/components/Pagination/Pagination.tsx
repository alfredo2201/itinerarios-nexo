type Props = {
  page: number;
  setPage: (page: number) => void;
  numberPagination: number;
};

export const Pagination = ({ page, setPage, numberPagination }: Props) => {
  const renderPageNumbers = () => {
    const pages = [];
    
    if (numberPagination <= 4) {
      // Show all pages if 4 or fewer
      for (let i = 1; i <= numberPagination; i++) {
        pages.push(i);
      }
    } else {
      // Show sliding window of 3 pages
      let startPage = Math.max(1, page - 1);
      let endPage = Math.min(numberPagination, startPage + 2);
      
      // Adjust if we're near the end
      if (endPage - startPage < 2) {
        startPage = Math.max(1, endPage - 2);
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      // Add ellipsis if needed
      if (endPage < numberPagination) {
        pages.push('...');
      }
    }
    
    return pages;
  };

  return (
    <div className="flex flex-row space-x-1 ">
      <button
        className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal dark:text-slate-500 dark:bg-gray-800 dark:border-slate-600 text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease"
        onClick={() => {
          if (page > 1) setPage(page - 1);
        }}
      >
        Prev
      </button>

      {renderPageNumbers().map((pageItem, i) => {
        if (pageItem === '...') {
          return (
            <span
              key={i}
              className={`px-3 py-1 min-w-9 min-h-9 text-sm font-normal dark:border-gray-700 border rounded transition duration-200 ease ${
                i === 0 ? "bg-[#023672] text-white dark:bg-blue-600 border-blue-600" : "bg-white text-slate-500 dark:bg-gray-800 dark:border-slate-600 hover:bg-slate-50 hover:border-slate-400"
              }`} 
            >
              ...
            </span>
          );
        }
        
        const pageNumber = pageItem as number;
        const isActive = page === pageNumber;
        return (
          <button
            key={i}
            className={`px-3 py-1 min-w-9 min-h-9 text-sm font-normal dark:border-gray-700 border rounded transition duration-200 ease
                ${
                  isActive
                    ? "bg-[#023672] text-white dark:bg-blue-600 border-blue-600"
                    : "bg-white text-slate-500 dark:bg-gray-800 dark:border-slate-600 hover:bg-slate-50 hover:border-slate-400"
                }`}
            onClick={() => {
              if (page !== pageNumber) setPage(pageNumber);
            }}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 dark:bg-gray-800 dark:border-slate-600 transition duration-200 ease"
        onClick={() => {
          if (page < numberPagination) setPage(page + 1);
        }}
      >
        Next
      </button>
    </div>
  );
};