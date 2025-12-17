import type { Itinerary } from "../../../models/Trasportation";
import { formatDuration } from "../../../utils/validations";
import SpinnerSvg from "../../SpinnerSvg";
import RowAutobusesItinerarioComponent from "./RowAutobusesItinerarioComponent";

interface ItineraryTableProps {
  itineraries: Itinerary[];
  loading: boolean;
}

export default function TransportItineraryTable({ itineraries, loading }: ItineraryTableProps) {
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
    <>
      {itineraries.map(item => (
        <RowAutobusesItinerarioComponent
          key={item._id}
          horaSalida={item.departureTime}
          origen={item.origin.name}
          destino={item.destination.name}
          duracion={formatDuration(item.estimatedDuration)}
          diaSalida={item.departureTime}
        />
      ))}
    </>
  );
}