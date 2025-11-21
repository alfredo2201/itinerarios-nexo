import TransportItineraryTable from "../../Autobuses/TableAutobusesItinerario/TransportItineraryTable";
import TransportDetails from "../../Autobuses/TransportDetails";
import FileUploadConfirmation from "../../Autobuses/FileUploadConfirmation";
import type { Transport, Itinerary } from "../../../models/Trasportation";

interface ItineraryPanelProps {
    isVisible: boolean;
    selectedTransport: Transport | null;
    itineraries: Itinerary[];
    itineraryLoading: boolean;
    canEdit: boolean;
    file: File | null;
    uploading: boolean;
    onSubmitFile: (date: string) => Promise<void>;
}

function ItineraryPanel({
    isVisible,
    selectedTransport,
    itineraries,
    itineraryLoading,
    canEdit,
    file,
    uploading,
    onSubmitFile
}: ItineraryPanelProps) {
    return (
        <div className="bg-white w-full sm:w-1/2 h-155 2xl:h-180 rounded-lg px-8 py-2 shadow-xl/10 dark:bg-gray-700">
            <h2 className="text-[16px] 2xl:text-[20px] text-base font-bold pb-2 pt-2 pl-3 dark:text-white">
                Itinerarios de Hoy
            </h2>

            {isVisible && selectedTransport && (
                <div key="animation-container" className="space-y-4 animate-fade-in">
                    <div className="w-full bg-white h-75 2xl:h-80 rounded-lg overflow-auto scrollbar-hide animate-slide-down dark:bg-gray-800 dark:text-white dark:border-gray-600">
                        <table className="table-auto md:table-fixed">
                            <thead>
                                <tr className="bg-[#A3C0E2] text-black w-full dark:bg-gray-600 dark:text-white">
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
                    {canEdit && (
                        <TransportDetails transport={selectedTransport} />
                    )}
                </div>
            )}

            {!isVisible && !file && (
                <div className="flex flex-col justify-center items-center h-full">
                    <p className="text-[16px] font-bold text-center dark:text-white">
                        Seleccione un autobus para ver sus itinerarios
                    </p>
                </div>
            )}

            {file && !isVisible && (
                <FileUploadConfirmation
                    file={file}
                    onSubmit={onSubmitFile}
                    uploading={uploading}
                />
            )}
        </div>
    );
}

export default ItineraryPanel;