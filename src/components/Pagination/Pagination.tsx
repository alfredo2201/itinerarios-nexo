type Props = {
  page: number;
  setPage: (page: number) => void;
  numberPagination: number;
};

export const Pagination = ({ page, setPage, numberPagination }: Props) => {
  return (
    <div className="flex flex-row space-x-1">
      <button
        className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease"
        onClick={() => {
          if (page > 1) setPage(page - 1);
        }}
      >
        Prev
      </button>

      {Array.from({ length: numberPagination }, (_, i) => {
        const pageNumber = i + 1;
        const isActive = page === pageNumber;
        return (
          <button
            key={i}
            className={`px-3 py-1 min-w-9 min-h-9 text-sm font-normal  border rounded transition duration-200 ease
                ${
                  isActive
                    ? "bg-[#023672] text-white"
                    : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50 hover:border-slate-400"
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
        className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease"
        onClick={() => {
          if (page < numberPagination) setPage(page + 1);
        }}
      >
        Next
      </button>
    </div>
  );
};