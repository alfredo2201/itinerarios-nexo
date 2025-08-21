import { useEffect, useState } from "react";
import { getItinerariesForPagination, getItineraryNumbers } from "../services/TransportService";
import type { ItineraryTable } from "../interfaces/types";


const ITEMS_FOR_PAGE = 10;

export const useItineraries = () => {
  const [itineraries, setItineraries] = useState<ItineraryTable[]>([]);
  const [page, setPage] = useState<number>(1);
  const [numberPagination, setNumberPagination] = useState<number>(0);
  const [numberItineraries, setNumberItineraries] = useState<number>(0);

  //Obtiene los items por cada pagina 
  //Regresa de que indice inicia la paginacion y hasta que limite tiene
  const ItemsForPage = (numberPage: number) => {
    const fromPage = ITEMS_FOR_PAGE * (numberPage - 1);
    const toPage =
      ITEMS_FOR_PAGE * numberPage > numberItineraries
        ? numberItineraries
        : ITEMS_FOR_PAGE * numberPage;
    return { fromPage, toPage };
  };

  //Se encarga de calcular el numero de paginacion que habra
  const calculatePagination = (data: number) => {
    if (data === 0) return;
    let residue = data % ITEMS_FOR_PAGE;
    let numberForPage = data / ITEMS_FOR_PAGE;
    residue = numberForPage - residue;
    if (residue > 0) numberForPage = numberForPage + 1 - residue;
    setNumberPagination(numberForPage);
  };

  //Obtiene toda la informacion de los itinerarios dependiendo del rango a mostrar
  const getInformation = async (numberPage: number) => {
    try {
      const { fromPage, toPage } = ItemsForPage(numberPage);
      const data = await getItinerariesForPagination(fromPage, toPage).then(
        (response) => response?.data
      );
      return data;
    } catch (error) {
      console.error("Error fetching itineraries:", error);
    }
  };

  useEffect(() => {
    getItineraryNumbers().then((response) => {
      if (response?.data !== undefined) {
        setNumberItineraries(response.data);
        calculatePagination(response.data);
      }
    });
    getInformation(page).then((data) => {
      if (data !== undefined) {
        setItineraries(data)
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberPagination, page, itineraries]);

  useEffect(() => {
    // Actualiza cada 5 minutos (300000 ms)
    const intervalo = setInterval(() => {
      
      getInformation(page).then((data) => {
        if (data !== undefined) {
          setItineraries(data)
        };
      });
    }, 0.5 * 60 * 1000);
    // limpiar el intervalo al desmontar el componente
    return () => clearInterval(intervalo);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    itineraries,
    page,
    setPage,
    numberItineraries,
    numberPagination,
    ITEMS_FOR_PAGE,
  };
};