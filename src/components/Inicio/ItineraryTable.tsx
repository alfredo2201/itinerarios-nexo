

import type { Itinerary } from "../../models/Trasportation";
import SpinnerSvg from "../SpinnerSvg";
import CellItineraryComponent from "../TableItinerario/CellItineraryComponent";

type Props = {
  itineraries: Itinerary[];
  loading: boolean;
};

export const ItineraryTableDisplay = ({ itineraries,loading }: Props) => {
if (loading) {
    return (
      <tr className="h-30 2xl:h-65">
        <td colSpan={3}>
          <div className="flex justify-center">
            <SpinnerSvg size={95} className="text-blue-100" />
          </div>
        </td>
      </tr>
    );
  }
  return (
    <div className="bg-[#32649D] rounded-t-lg">
      <table className="table-auto md:table-fixed">
        <thead>
          <tr className="text-[#C3D000] w-full">
            <th className="w-2xs text-[12px] md:text-[16px] p-3">Salida</th>
            <th className="w-lg text-[12px] md:text-[16px] p-3">Destino</th>
            <th className="w-2xs text-[12px] md:text-[16px] p-3">Linea</th>
            <th className="w-xs text-[12px] md:text-[16px] p-3">Número</th>
            <th className="w-xs text-[12px] md:text-[16px] p-3">Localización</th>
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
      </table>
    </div>

  );
};
export default ItineraryTableDisplay;