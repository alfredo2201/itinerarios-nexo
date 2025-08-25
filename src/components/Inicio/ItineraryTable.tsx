
import type { ItineraryTable } from "../../interfaces/types";
import CellItineraryComponent from "../TableItinerario/CellItineraryComponent";

type Props = {
  itineraries: ItineraryTable[];
};

export const ItineraryTableDisplay = ({ itineraries }: Props) => {



  return (
    <table className="table-auto md:table-fixed">
      <thead>
        <tr className="bg-[#4053AE] text-[#C3D000] w-full">
          <th className="w-2xs p-3">Hora</th>
          <th className="w-lg p-3">Destino</th>
          <th className="w-2xs p-3">Linea</th>
          <th className="w-xs p-3">Número</th>
          <th className="w-xs p-3">Localización</th>
        </tr>
      </thead>
      <tbody>
        {itineraries?.map((item) => (
          <CellItineraryComponent
            key={item.itinerary.UUID}
            departureTime={item.itinerary.departureTime}
            destino={item.itinerary.destination}
            autobusImg={item.image}
            numero={item.code}
            rastreo={item.gpsStatus}
          />
        ))}
      </tbody>
    </table>
  );
};
export default ItineraryTableDisplay;