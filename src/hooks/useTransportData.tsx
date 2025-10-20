import { useEffect, useState } from "react";
import { getTransportsForPagination } from "../services/TransportService";
import type { Trasport } from "../models/Trasportation";

interface UseTransportDataReturn {
  transportData: Trasport[];
  loading: boolean;
  error: string | null;
  totalItems: number;
  totalPages: number;
  refetch: () => void;
}

export function useTransportData(
  companyId: string,
  currentPage: number
): UseTransportDataReturn {
  const [transportData, setTransportData] = useState<Trasport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  // Función para hacer fetch (se puede llamar manualmente)
  const fetchData = async () => {
    if (!companyId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await getTransportsForPagination(currentPage, companyId);

      if (response?.success && response.data) {
        const { transports = [], pagination } = response.data;
        
        setTransportData(transports);
        
        if (pagination) {
          setTotalItems(pagination.totalDocuments);
          setTotalPages(pagination.totalPages);
        }
      } else {
        setTransportData([]);
      }
    } catch (err) {
      console.error('Error fetching transports:', err);
      setError('Error al cargar los transportes');
      setTransportData([]);
    } finally {
      setLoading(false);
    }
  };

  // Effect que se ejecuta cuando cambian companyId o currentPage
  useEffect(() => {
    fetchData();
  }, [companyId, currentPage]); // ✅ Se ejecuta cuando cambia la página

  return {
    transportData,
    loading,
    error,
    totalItems,
    totalPages,
    refetch: fetchData // Permite refrescar manualmente
  };
}