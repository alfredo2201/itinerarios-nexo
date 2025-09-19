import type { JSX } from "react"
import type { ItineraryInterface } from "../models/Trasportation";

export interface RouterHandle {
    title?: string
}

export interface TableTitleProps {
    title1: string,
    title2: string,
    title3: string,
    rowArray: JSX.Element[],
}

export interface AnuncioInterface {
    key: number,
    nombreArchivo: string,
    repeticiones: number,
    vencimiento: Date,
    formato: string,
    estado: string
}

export interface User {
    id?: number;
    userName: string;
    password?: string;
}



export interface ItineraryTable {
    UUID: string
    itinerary: ItineraryInterface;
    image: string;
    code?: string;
    gpsStatus: string;
}

export interface Hour {
    hour: number;
    minute: number
}

// ===== TIPOS DE TYPESCRIPT =====
export interface GroupAvailability {
    has200: boolean;
    has100: boolean;
    has50: boolean;
    hasAll: boolean;
}

export interface FlowStep {
    group: number;
    duration: number;
}

export interface Video {
    url: string
    public_id: string,
    duration: number,
    format: string,
    size: number
}

export interface VideoData {
    message: string,
    video: Video,
}

export interface SelectOption {
    value: string;
    label: string;
}

export type CompanyResponse = {
    message: string;
    company: {
        companyName: string,
        image: string,
        isActive: boolean,
        _id: string,
        createdAt: string,
        updatedAt: string
    };
}