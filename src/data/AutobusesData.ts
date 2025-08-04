import type { AutobusInterface, ItinerarioAutobusInterface, LineaAutobusInterface } from "../interfaces/types";
import tufesa from '../img/tufesa_autobus.png'
import elite from '../img/autobuses-elite.png'
import albatros from '../img/albatros_logotipo.png'
export const EstadoAutobus: AutobusInterface[] = [
    {
        key: "1",
        numero: "111",
        estadoGps: "Activo",
        ultimaVista: "20/07/2025 01:12:12",
        itinerario: []
    },
    {
        key: "2",
        numero: "102",
        estadoGps: "Inactivo",
        ultimaVista: "20/07/2025 01:12:12",
        itinerario: []
    }, {
        key: "3",
        numero: "103",
        estadoGps: "Activo",
        ultimaVista: "20/07/2025 01:12:12",
        itinerario: []
    },
    {
        key: "4",
        numero: "104",
        estadoGps: "Activo",
        ultimaVista: "20/07/2025 01:12:12",
        itinerario: []
    },
    {
        key: "5",
        numero: "104",
        estadoGps: "Activo",
        ultimaVista: "20/07/2025 01:12:12",
        itinerario: []
    },
    {
        key: "6",
        numero: "104",
        estadoGps: "Activo",
        ultimaVista: "20/07/2025 01:12:12",
        itinerario: []
    },
    {
        key: "7",
        numero: "104",
        estadoGps: "Activo",
        ultimaVista: "20/07/2025 01:12:12",
        itinerario: []
    },
    {
        key: "8",
        numero: "104",
        estadoGps: "Activo",
        ultimaVista: "20/07/2025 01:12:12",
        itinerario: []
    },
    {
        key: "9",
        numero: "104",
        estadoGps: "Activo",
        ultimaVista: "20/07/2025 01:12:12",
        itinerario: []
    },
    {
        key: "10",
        numero: "104",
        estadoGps: "Activo",
        ultimaVista: "20/07/2025 01:12:12",
        itinerario: []
    },
    {
        key: "11",
        numero: "104",
        estadoGps: "Activo",
        ultimaVista: "20/07/2025 01:12:12",
        itinerario: []
    },
    {
        key: "12",
        numero: "104",
        estadoGps: "Activo",
        ultimaVista: "20/07/2025 01:12:12",
        itinerario: []
    }
]

export const ItinerariosAutobus: ItinerarioAutobusInterface[] = [
    {
        key: "1",
        horaSalida: "7:00 A.M",
        origen: "Obregon",
        destino: "Navojoa",
        duracion: "01h00m"
    }
    , {
        key: "2",
        horaSalida: "11:30 A.M",
        origen: "Obregon",
        destino: "Navojoa",
        duracion: "01h00m"
    },
    {
        key: "3",
        horaSalida: "3:00 P.M",
        origen: "Obregon",
        destino: "Navojoa",
        duracion: "01h00m"
    }
]

export const LineasAutobusesRastreo: LineaAutobusInterface[] = [
    {
        key: 1,
        nombreEmpresa: 'Tufesa',
        imagen:tufesa,
        camiones: [
            {
                key: "1",
                numero: "101",
                estadoGps: "Activo",
                ultimaVista: "20/07/2025 01:12:12",
                itinerario: [
                    {
                        key: "1",
                        horaSalida: "7:00 A.M",
                        origen: "Obregon",
                        destino: "Navojoa",
                        duracion: "01h00m"
                    },
                    {
                        key: "2",
                        horaSalida: "9:00 A.M",
                        origen: "Obregon",
                        destino: "Navojoa",
                        duracion: "01h00m"
                    }
                ]
            },
            {
                key: "2",
                numero: "102",
                estadoGps: "Inactivo",
                ultimaVista: "20/07/2025 01:12:12",
                itinerario: [{
                    key: "1",
                    horaSalida: "7:00 A.M",
                    origen: "Obregon",
                    destino: "Hermosillo",
                    duracion: "03h40m"
                },
                {
                    key: "2",
                    horaSalida: "12:00 P.M",
                    origen: "Obregon",
                    destino: "Hermosillo",
                    duracion: "03h40m"
                }]
            }, {
                key: "3",
                numero: "103",
                estadoGps: "Activo",
                ultimaVista: "20/07/2025 01:12:12",
                itinerario: [
                    {
                        key: "1",
                        horaSalida: "7:00 A.M",
                        origen: "Obregon",
                        destino: "Huatabampo",
                        duracion: "02h40m"
                    },
                    {
                        key: "2",
                        horaSalida: "11:00 A.M",
                        origen: "Obregon",
                        destino: "Navojoa",
                        duracion: "02h40m"
                    }]
            }
        ]
    },
     {
        key: 2,
        nombreEmpresa: 'Elite',
        imagen:elite,
        camiones: [
            {
                key: "1",
                numero: "104",
                estadoGps: "Activo",
                ultimaVista: "20/07/2025 01:12:12",
                itinerario: [
                    {
                        key: "1",
                        horaSalida: "7:00 A.M",
                        origen: "Obregon",
                        destino: "Navojoa",
                        duracion: "01h00m"
                    },
                    {
                        key: "2",
                        horaSalida: "9:00 A.M",
                        origen: "Obregon",
                        destino: "Navojoa",
                        duracion: "01h00m"
                    }
                ]
            },
            {
                key: "2",
                numero: "105",
                estadoGps: "Inactivo",
                ultimaVista: "20/07/2025 01:12:12",
                itinerario: [{
                    key: "1",
                    horaSalida: "7:00 A.M",
                    origen: "Obregon",
                    destino: "Hermosillo",
                    duracion: "03h40m"
                },
                {
                    key: "2",
                    horaSalida: "12:00 P.M",
                    origen: "Obregon",
                    destino: "Hermosillo",
                    duracion: "03h40m"
                }]
            }, {
                key: "3",
                numero: "106",
                estadoGps: "Activo",
                ultimaVista: "20/07/2025 01:12:12",
                itinerario: [
                    {
                        key: "1",
                        horaSalida: "7:00 A.M",
                        origen: "Obregon",
                        destino: "Huatabampo",
                        duracion: "02h40m"
                    },
                    {
                        key: "2",
                        horaSalida: "11:00 A.M",
                        origen: "Obregon",
                        destino: "Navojoa",
                        duracion: "02h40m"
                    }]
            }
        ]
    },
     {
        key: 3,
        nombreEmpresa: 'Albatros',
        imagen:albatros,
        camiones: [
            {
                key: "1",
                numero: "107",
                estadoGps: "Activo",
                ultimaVista: "20/07/2025 01:12:12",
                itinerario: [
                    {
                        key: "1",
                        horaSalida: "7:00 A.M",
                        origen: "Obregon",
                        destino: "Navojoa",
                        duracion: "01h00m"
                    },
                    {
                        key: "2",
                        horaSalida: "9:00 A.M",
                        origen: "Obregon",
                        destino: "Navojoa",
                        duracion: "01h00m"
                    }
                ]
            },
            {
                key: "2",
                numero: "108",
                estadoGps: "Inactivo",
                ultimaVista: "20/07/2025 01:12:12",
                itinerario: [{
                    key: "1",
                    horaSalida: "7:00 A.M",
                    origen: "Obregon",
                    destino: "Hermosillo",
                    duracion: "03h40m"
                },
                {
                    key: "2",
                    horaSalida: "12:00 P.M",
                    origen: "Obregon",
                    destino: "Hermosillo",
                    duracion: "03h40m"
                }]
            }, {
                key: "3",
                numero: "109",
                estadoGps: "Activo",
                ultimaVista: "20/07/2025 01:12:12",
                itinerario: [
                    {
                        key: "1",
                        horaSalida: "7:00 A.M",
                        origen: "Obregon",
                        destino: "Huatabampo",
                        duracion: "02h40m"
                    },
                    {
                        key: "2",
                        horaSalida: "11:00 A.M",
                        origen: "Obregon",
                        destino: "Navojoa",
                        duracion: "02h40m"
                    }]
            }
        ]
    }
]