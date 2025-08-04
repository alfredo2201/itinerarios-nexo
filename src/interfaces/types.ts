import type { JSX } from "react"

export interface RouterHandle{
    title?:string
}

export interface ItinerarioInterface{
    horaSalida:string,
    salida:string,
    destino:string,
    duracion:number
}

export interface LineaAutobusInterface{
    key:number,
    nombreEmpresa:string,
    imagen:string,
    camiones:AutobusInterface[]
}
export interface AutobusInterface{
    key:string,
    numero:string,
    estadoGps:string,
    ultimaVista:string
    itinerario:ItinerarioAutobusInterface[]
}

export interface ItinerarioAutobusInterface{
    key:string,
    horaSalida:string,
    origen:string,
    destino:string,
    duracion:string
}

export interface TableTitleProps{
    title1:string,
    title2:string,
    title3:string,
    rowArray:JSX.Element[],
}


