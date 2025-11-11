import type { Trasport } from "../../models/Trasportation";
import { formatLastSeen, getStatusLabel } from "../../utils/validations";

interface TransportDetailsProps {
  transport: Trasport;
}

export default function TransportDetails({ transport }: TransportDetailsProps) {
  return (
    <div className="h-50 mt-5 rounded-lg px-4 py-2 shadow-inner bg-[#F3F6F9] animate-slide-down animation-delay-100 dark:bg-gray-800 dark:text-white">
      <p className="text-[16px] font-bold text-center">Información adicional</p>
      <div className="text-[13px] justify-center flex flex-col gap-1 pt-2">
        <p><span className="font-bold">Registro:</span> {transport.registration}</p>
        <p><span className="font-bold">Código:</span> {transport.code}</p>
        <p><span className="font-bold">Código GPS:</span> {transport.gpsCode || 'Sin GPS'}</p>
        <p><span className="font-bold">GPS Estatus:</span> {getStatusLabel(transport.gpsStatus)}</p>
        <p><span className="font-bold">Estado:</span> {transport.isActive ? 'Activo' : 'Inactivo'}</p>
        <p><span className="font-bold">Última vez visto:</span> {formatLastSeen(new Date(transport.lastSeen))}</p>
      </div>
    </div>
  );
}