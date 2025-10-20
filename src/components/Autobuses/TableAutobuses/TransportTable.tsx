import type { Trasport } from "../../../models/Trasportation";
import SpinnerSvg from "../../SpinnerSvg";
import RowAutobusesComponent from "./RowAutobusesComponent";

interface TransportTableProps {
  data: Trasport[];
  loading: boolean;
  onSelectTransport: (id: string, transport: Trasport) => void;
}

export default function TransportTable({ data, loading, onSelectTransport }: TransportTableProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <SpinnerSvg size={100} className="text-blue-100" />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <p className="text-[16px] font-bold text-center">
          No hay transportes en el sistema
        </p>
      </div>
    );
  }

  return (
    <table className="table-auto md:table-fixed">
      <thead>
        <tr className="bg-[#A3C0E2] text-black w-full">
          <th className="text-[13px] 2xl:text-[16px] w-2xs p-2">Numero</th>
          <th className="text-[13px] 2xl:text-[16px] w-lg p-2">Estado</th>
          <th className="text-[13px] 2xl:text-[16px] w-2xs p-2">Ultima vez visto</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <RowAutobusesComponent
            key={item._id}
            id={item._id || ''}
            numero={item.code}
            estadoGps={item.gpsStatus}
            ultimaVista={item.lastSeen}
            toggleItinerarios={() => onSelectTransport(item._id || '', item)}
          />
        ))}
      </tbody>
    </table>
  );
}