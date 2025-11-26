import { useEffect, useState } from "react";
import { getTransportsForPagination } from "../services/TransportService";
import type { Transport } from "../models/Trasportation";

interface UseTransportDataReturn {
  transportData: Transport[];
  loading: boolean;
  error: string | null;
  totalItems: number;
  totalPages: number;
  setOrderedBy?: (orderBy: string | undefined) => void;
  setSearchedByTerm?: (searchTerm: string | undefined) => void;
  refetch: () => void;
}

export function useTransportData(
  companyId: string,
  currentPage: number,
  itemsForPage: number = 8
): UseTransportDataReturn {
  const [transportData, setTransportData] = useState<Transport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [orderBy, setOrderBy] = useState<string | undefined>('lastUpdate');
  const [searchTerm, setSearchTerm] = useState<string | undefined>(undefined);
  const itemsPerPage = itemsForPage;

   async function fetchData() {
    if (!companyId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await getTransportsForPagination(currentPage, companyId, itemsPerPage, { orderBy: orderBy, searchTerm: searchTerm });

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
  }

  const setOrderedBy = (orderBy: string | undefined) => {
    setOrderBy(orderBy);    
  };
  const setSearchedByTerm = (searchTerm: string | undefined) => {
    setSearchTerm(searchTerm);
  }

  // Effect que se ejecuta cuando cambian companyId o currentPage
  useEffect(() => {
    fetchData();
  }, [companyId, currentPage,orderBy, searchTerm]); // ✅ Se ejecuta cuando cambia la página

  return {
    transportData,
    loading,
    error,
    setOrderedBy,
    setSearchedByTerm,
    totalItems,
    totalPages,
    refetch: fetchData // Permite refrescar manualmente
  };
}