

import type { Itinerary } from "../../models/Trasportation";
import SpinnerSvg from "../SpinnerSvg";
import CellItineraryComponent from "../TableItinerario/CellItineraryComponent";

type Props = {
  itineraries: Itinerary[];
  loading: boolean;
};

export const ItineraryTableDisplay = ({ itineraries, loading }: Props) => {
  if (loading ) {
    return (
      <div className="flex justify-center items-center w-full h-80 2xl:h-105">
        <SpinnerSvg size={85} className="text-blue-100" />
      </div>
    );
  }
  return (
    <div className="bg-[#32649D] rounded-t-lg">
      {itineraries.length === 0 ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-[16px] font-bold text-center text-white">
            No hay itinerarios disponibles
          </p>
        </div>
      ) : (
      <table className="table-auto md:table-fixed h-80 2xl:h-105">
        <thead>
          <tr className="text-[#C3D000] w-full">
            <th className="w-2xs text-[12px] xl:text-[16px] p-3">Salida</th>
            <th className="w-lg text-[12px] xl:text-[16px] p-3">Destino</th>
            <th className="w-2xs text-[12px] xl:text-[16px] p-3">Linea</th>
            <th className="w-xs text-[12px] xl:text-[16px] p-3">Número</th>
            <th className="w-xs text-[12px] xl:text-[16px] p-3">Localización</th>
          </tr>
        </thead>
        <tbody>
          {itineraries?.map((item) => (
            <CellItineraryComponent
              key={item._id}
              departureTime={item.departureTime}
              destino={item.destination.longText}
              autobusImg={item.company?.image}
              numero={item.transport.code}
              rastreo={item.transport.gpsStatus}
            />
          ))}
        </tbody>
      </table>)
      }

    </div>

  );
};
export default ItineraryTableDisplay;