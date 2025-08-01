import type { TableTitleProps } from "../../interfaces/types";

function TableAutobusesComponent({title1,title2,title3,rowArray}:TableTitleProps) {
    return (
        <>
            <table className="table-auto md:table-fixed">
                <thead>
                    <tr className="bg-[#B1C7E2] text-black w-full">
                        <th className="w-2xs p-2 ">{title1}</th>
                        <th className="w-lg p-2 ">{title2}</th>
                        <th className="w-2xs p-2 ">{title3}</th>
                    </tr>
                </thead>
                <tbody>
                    {rowArray}
                </tbody>
            </table>
            <div className="flex justify-between items-center px-4 py-6">
                <div className="text-sm text-slate-500">
                    Mostrando <b>1-10</b> de 50
                </div>
                <div className="flex space-x-1">
                    <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                        Prev
                    </button>
                    <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-white bg-slate-800 border border-slate-800 rounded hover:bg-slate-600 hover:border-slate-600 transition duration-200 ease">
                        1
                    </button>
                    <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                        2
                    </button>
                    <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                        3
                    </button>
                    <button className="px-3 py-1 min-w-9 min-h-9 text-sm font-normal text-slate-500 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-400 transition duration-200 ease">
                        Next
                    </button>
                </div>
            </div>
        </>

    );
}

export default TableAutobusesComponent;
