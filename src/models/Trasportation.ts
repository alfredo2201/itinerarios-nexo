export type Company = {
    UUID: string;
    companyName: string;
    image: string;
    trasportation: Trasportation[];
    createdAt?: Date;
    updatedAt?: Date;
}

export type Trasportation = {
    UUID: string;
    registration?:string
    code?: string;
    gpsCode?: string;
    gpsStatus: string;
    lastSeen: string;
    lastLocation?: {
        latitude: number;
        longitude: number;
    };
    itinerary: ItineraryInterface[];
    createdAt?: Date;
    updatedAt?: Date;
}

export type ItineraryInterface = {
    UUID: string;
    departureTime: string;
    origin: string;
    longTextOrigin?: string;
    originAddress?: string;
    destination: string;
    longTextDestination?: string;
    destinationAddress?: string;
    duration: string;
    createdAt?: Date;
    updatedAt?: Date;
}
