// import { useState } from "react";

// const ITEMS_FOR_PAGE = 10;
// export const usePagination = () => {

//     const [numberPagination, setNumberPagination] = useState<number>(0);
//     const [numberArray, setNumberArray] = useState<number>(0);
//     const [page, setPage] = useState<number>(1);

//     //Obtiene los items por cada pagina 
//     //Regresa de que indice inicia la paginacion y hasta que limite tiene
//     const ItemsForPage = (numberPage: number) => {
//         const fromPage = ITEMS_FOR_PAGE * (numberPage - 1);
//         const toPage =
//             ITEMS_FOR_PAGE * numberPage > numberArray
//                 ? numberArray
//                 : ITEMS_FOR_PAGE * numberPage;
//         return { fromPage, toPage };
//     };

    
    
//     const setterPage = (numberPage:number)=>{
//         setPage(numberPage)
//     }
//     //Se encarga de calcular el numero de paginacion que habra
//     const calculatePagination = (data: number) => {
//        if (data)setNumberPagination(data);
//        else return
//     };

//     const setNumberArrayState = (number: number) => {
//         if (number >= 0) {
//             setNumberArray(number)
//         } else return
//     }

//     return {
//         ITEMS_FOR_PAGE,
//         ItemsForPage,
//         numberArray,
//         numberPagination,
//         calculatePagination,
//         setNumberArrayState,
//         page,
//         setterPage
//     }
// }

import { useState, useCallback, useMemo } from "react";

import { PAGINATION_CONSTANTS } from "../constants/pagination.constants";
import type { PaginationRange, UsePaginationReturn } from "../interfaces/pagination.types";

interface UsePaginationOptions {
  itemsPerPage?: number;
  initialPage?: number;
}

export const usePagination = (
  options: UsePaginationOptions = {}
): UsePaginationReturn => {
  const {
    itemsPerPage = PAGINATION_CONSTANTS.DEFAULT_ITEMS_PER_PAGE,
    initialPage = PAGINATION_CONSTANTS.DEFAULT_PAGE
  } = options;

  // Estado
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [totalPages, setTotalPagesState] = useState<number>(0);
  const [totalItems, setTotalItemsState] = useState<number>(0);

  // Validación de página
  const isValidPage = useCallback((page: number): boolean => {
    return page >= PAGINATION_CONSTANTS.MIN_PAGE && page <= totalPages;
  }, [totalPages]);

  // Setter de página con validación
  const setPage = useCallback((page: number) => {
    if (page < PAGINATION_CONSTANTS.MIN_PAGE) {
      setCurrentPage(PAGINATION_CONSTANTS.MIN_PAGE);
      return;
    }
    
    if (totalPages > 0 && page > totalPages) {
      setCurrentPage(totalPages);
      return;
    }
    
    setCurrentPage(page);
  }, [totalPages]);

  // Setter de total de páginas con validación
  const setTotalPages = useCallback((pages: number) => {
    if (pages < 0) {
      console.warn('Total de páginas no puede ser negativo');
      return;
    }
    
    setTotalPagesState(pages);
    
    // Ajustar página actual si excede el nuevo total
    if (currentPage > pages && pages > 0) {
      setCurrentPage(pages);
    }
  }, [currentPage]);

  // Setter de total de items con validación
  const setTotalItems = useCallback((items: number) => {
    if (items < PAGINATION_CONSTANTS.MIN_ITEMS) {
      console.warn('Total de items no puede ser negativo');
      return;
    }
    
    setTotalItemsState(items);
  }, []);

  // Obtener rango de items para la página actual
  const getPageRange = useCallback((): PaginationRange => {
    const fromIndex = itemsPerPage * (currentPage - 1);
    const toIndex = Math.min(itemsPerPage * currentPage, totalItems);
    
    return { fromIndex, toIndex };
  }, [currentPage, itemsPerPage, totalItems]);

  // Resetear paginación
  const resetPagination = useCallback(() => {
    setCurrentPage(PAGINATION_CONSTANTS.DEFAULT_PAGE);
    setTotalPagesState(0);
    setTotalItemsState(0);
  }, []);

  // Computed values
  const hasNextPage = useMemo(
    () => currentPage < totalPages,
    [currentPage, totalPages]
  );

  const hasPreviousPage = useMemo(
    () => currentPage > PAGINATION_CONSTANTS.MIN_PAGE,
    [currentPage]
  );

  // Navegación
  const goToNextPage = useCallback(() => {
    if (hasNextPage) {
      setPage(currentPage + 1);
    }
  }, [currentPage, hasNextPage, setPage]);

  const goToPreviousPage = useCallback(() => {
    if (hasPreviousPage) {
      setPage(currentPage - 1);
    }
  }, [currentPage, hasPreviousPage, setPage]);

  const goToFirstPage = useCallback(() => {
    setPage(PAGINATION_CONSTANTS.MIN_PAGE);
  }, [setPage]);

  const goToLastPage = useCallback(() => {
    if (totalPages > 0) {
      setPage(totalPages);
    }
  }, [totalPages, setPage]);

  return {
    // Estado
    currentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    
    // Funciones principales
    setPage,
    setTotalPages,
    setTotalItems,
    getPageRange,
    resetPagination,
    
    // Helpers de navegación
    hasNextPage,
    hasPreviousPage,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    goToLastPage
  };
};