import { useEffect, useState } from "react";
import { getItinerariesForPagination } from "../services/ItineraryService";
import type { Itinerary } from "../models/Trasportation";

interface UseItinerariesDataReturn {
  itineraries: Itinerary[];
  loading: boolean;
  error: string | null;
  totalItems: number;
  totalPages: number;
  refetch: () => void;
}

export default function useItinerariesData(currentPage: number): UseItinerariesDataReturn {
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const fetchItineraries = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getItinerariesForPagination(currentPage);

      if (response?.data) {
        setItineraries(response.data.itineraries || []);
        
        if (response.data.pagination) {
          setTotalItems(response.data.pagination.totalDocuments);
          setTotalPages(response.data.pagination.totalPages);
        }
      } else {
        setItineraries([]);
      }
    } catch (err) {
      console.error("Error fetching itineraries:", err);
      setError("Error al cargar los itinerarios");
      setItineraries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItineraries();
  }, [currentPage]); // ✅ Refetch cuando cambia la página

  return {
    itineraries,
    loading,
    error,
    totalItems,
    totalPages,
    refetch: fetchItineraries
  };
}