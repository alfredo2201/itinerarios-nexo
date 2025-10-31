export interface PaginationState {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface PaginationRange {
  fromIndex: number;
  toIndex: number;
}

export interface UsePaginationReturn {
  // Estado
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  
  // Funciones
  setPage: (page: number) => void;
  setTotalPages: (pages: number) => void;
  setTotalItems: (items: number) => void;
  getPageRange: () => PaginationRange;
  resetPagination: () => void;
  
  // Helpers
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
}