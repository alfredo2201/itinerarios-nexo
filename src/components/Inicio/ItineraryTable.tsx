

import type { Itinerary } from "../../models/Trasportation";
import CellItineraryComponent from "../TableItinerario/CellItineraryComponent";

type Props = {
  itineraries: Itinerary[];
};

export const ItineraryTableDisplay = ({ itineraries }: Props) => {



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