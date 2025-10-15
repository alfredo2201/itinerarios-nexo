export type Company = {
    _id?: string;
    companyName: string;
    image: string;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export type Trasport = {
    _id?: string;
    companyId: string;
    registration?: string
    code?: string;
    gpsCode?: string;
    gpsStatus: string;
    lastSeen: string;
    lastLocation: {
        type: 'Point';
        coordinates: [number, number];
    },
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export type Itinerary = {
    _id?: string;
    transportationId?: string;
    companyId?: string;
    departureTime: Date;
    origin: {
        name: string;
        longText?: string;
        address?: string;
        coordinates?: { latitude: number; longitude: number; };
    };
    destination: {
        name: string;
        longText?: string;
        address?: string;
        coordinates?: { latitude: number; longitude: number; };
    };
    company?:Company;
    transport:Trasport;
    estimatedDuration: number;
    status: string;
    isActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface PaginatedResponse {
  success: boolean;
  data?: {
    itineraries: Itinerary[];
    pagination: {
      currentPage: number;
      limit: number;
      totalDocuments: number;
      totalPages: number;
      hasNextPage: boolean;
      hasPrevPage: boolean;
      nextPage: number | null;
      prevPage: number | null;
    };
  };
  error?: string;
}

export interface ItineraryInterface {
    id: string;
    origin: string;
    destination: string;
    stops: string[];
}

export interface PaginationInfo {
  currentPage: number;
  limit: number;
  totalDocuments: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPage: number | null;
  prevPage: number | null;
}

export interface PaginatedResponseTransport {
  success: boolean;
  data: {
    transports: Trasport[];
    pagination: PaginationInfo;
  };
}

