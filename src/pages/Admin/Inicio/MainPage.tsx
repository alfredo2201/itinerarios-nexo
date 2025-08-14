import type { ItinerarioProps } from "../../../interfaces/types";
import CellItineraryComponent from "../../../components/TableItinerario/CellItineraryComponent";
import { FakeData } from "../../../data/ItinerariosData";
import { useEffect, useState } from "react";
const data: ItinerarioProps[] = FakeData.slice(0, 10);

function MainPage() {
    const [itineraries, setItineraries] = useState<ItinerarioProps[]>([])

    useEffect(() => {
        setItineraries(data)
    }, [])

    return (
        <div className="w-full h-full px-10 py-6 overflow-scrool" >
            <div className="bg-white p-8 rounded-lg ">
                <h1 className="font-sans font-semibold text-xl pb-4 pl-3">Vista Previa del Itinerario</h1>
                <table className="table-auto md:table-fixed">
                    <thead>
                        <tr className="bg-[#4053AE] text-[#C3D000] w-full ">
                            <th className="w-2xs p-3">Hora</th>
                            <th className="w-lg p-3">Destino</th>
                            <th className="w-2xs p-3">Autobus</th>
                            <th className="w-xs p-3">Número</th>
                            <th className="w-xs p-3">Localización</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            itineraries?.map(item =>
                                <CellItineraryComponent key={item.key} hora={item.hora} destino={item.destino} autobusImg={item.autobusImg} numero={item.numero} rastreo={item.rastreo} />
                            )
                        }
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
            </div>
        </div>
    )
}

export default MainPage;