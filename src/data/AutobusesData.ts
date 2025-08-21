import tufesa from '../img/tufesa_autobus.png'
import elite from '../img/autobuses-elite.png'
import albatros from '../img/albatros_logotipo.png'
import { v4 as uuidv4 } from 'uuid';
import type { Company } from "../models/Trasportation";


export const dataTrasporte: Company[] = [
    {
        UUID: uuidv4(),
        companyName: 'Tufesa',
        image: tufesa,
        trasportation: [
            {
                UUID: uuidv4(),
                code: "101",
                gpsStatus: "Activo",
                lastSeen: "20/07/2025 01:12:12",
                itinerary: [
                    {
                        UUID: uuidv4(),
                        departureTime: {hour:7, minute:0},
                        origin: "Obregon",
                        longTextOrigin:"Ciudad Obregon, Son",
                        originAddress: 'Campeche 928, Cortinas 1 Secc, 85160 Cdad. Obregón, Son.',
                        destination: "Navojoa",
                        longTextDestination:'Navojoa, Son',
                        destinationAddress: 'Hidalgo entre No Reeleccion y Pesqueira, Calle Gral. I. Pesqueira 515, Centro, Juárez, 85800 Navojoa, Son.',
                        duration: "01h00m"
                    },
                    {
                        UUID: uuidv4(),
                        departureTime: {hour:9, minute:0},
                        origin: "Obregon",
                        longTextOrigin:"Ciudad Obregon, Son",
                        originAddress: 'Campeche 928, Cortinas 1 Secc, 85160 Cdad. Obregón, Son.',
                        destination: "Navojoa",
                        longTextDestination:'Navojoa, Son',
                        destinationAddress: 'Hidalgo entre No Reeleccion y Pesqueira, Calle Gral. I. Pesqueira 515, Centro, Juárez, 85800 Navojoa, Son.',
                        duration: "01h00m"
                    },
                    {
                        UUID: uuidv4(),
                        departureTime: {hour:11, minute:0},
                        origin: "Obregon",
                        longTextOrigin:"Ciudad Obregon, Son",
                        originAddress: 'Campeche 928, Cortinas 1 Secc, 85160 Cdad. Obregón, Son.',
                        destination: "Navojoa",
                        longTextDestination:'Navojoa, Son',
                        destinationAddress: 'Hidalgo entre No Reeleccion y Pesqueira, Calle Gral. I. Pesqueira 515, Centro, Juárez, 85800 Navojoa, Son.',
                        duration: "01h00m"
                    },
                    {
                        UUID: uuidv4(),
                        departureTime: {hour:14, minute:0},
                        origin: "Obregon",
                        longTextOrigin:"Ciudad Obregon, Son",
                        originAddress: 'Campeche 928, Cortinas 1 Secc, 85160 Cdad. Obregón, Son.',
                        destination: "Navojoa",
                        longTextDestination:'Navojoa, Son',
                        destinationAddress: 'Hidalgo entre No Reeleccion y Pesqueira, Calle Gral. I. Pesqueira 515, Centro, Juárez, 85800 Navojoa, Son.',
                        duration: "01h00m"
                    }
                ]
            },
            {
                UUID: uuidv4(),
                code: "102",
                gpsStatus: "Inactivo",
                lastSeen: "20/07/2025 01:12:12",
                itinerary: [{
                        UUID: uuidv4(),
                        departureTime: {hour:8, minute:0},
                        origin: "Obregon",
                        longTextOrigin:"Ciudad Obregon, Son",
                        originAddress: 'Campeche 928, Cortinas 1 Secc, 85160 Cdad. Obregón, Son.',
                        destination: "Huatabampo",
                        longTextDestination:"Huatabampo, Son",
                        destinationAddress: '16 de Septiembre entre alfredo karam y allende, Centro Comercial, 85900 Huatabampo, Son.',
                        duration: "02h30m"
                    },
                    {
                        UUID:uuidv4(),
                        departureTime:{hour:11, minute:56
                        

                        },
                        origin: "Obregon",
                        longTextOrigin:"Ciudad Obregon, Son",
                        originAddress: 'Campeche 928, Cortinas 1 Secc, 85160 Cdad. Obregón, Son.',
                        destination: "Huatabampo",
                        longTextDestination:"Huatabampo, Son",
                        destinationAddress: '16 de Septiembre entre alfredo karam y allende, Centro Comercial, 85900 Huatabampo, Son.',
                        duration: "02h30m"
                    }]
            }, {
                UUID: uuidv4(),
                code: "103",
                gpsStatus: "Activo",
                lastSeen: "20/07/2025 01:12:12",
                itinerary: [
                    {
                        UUID: uuidv4(),
                        departureTime:{hour:9, minute:50},
                        origin: "Obregon",
                        longTextOrigin:"Ciudad Obregon, Son",
                        originAddress: 'Campeche 928, Cortinas 1 Secc, 85160 Cdad. Obregón, Son.',
                        destination: "Huatabampo",
                        longTextDestination:"Huatabampo, Son",
                        destinationAddress: '16 de Septiembre entre alfredo karam y allende, Centro Comercial, 85900 Huatabampo, Son.',
                        duration: "02h30m"
                    },
                    {
                        UUID: uuidv4(),
                        departureTime: {hour:9, minute:51},
                        origin: "Obregon",
                        longTextOrigin:"Ciudad Obregon, Son",
                        originAddress: 'Campeche 928, Cortinas 1 Secc, 85160 Cdad. Obregón, Son.',
                        destination: "Huatabampo",
                        longTextDestination:"Huatabampo, Son",
                        destinationAddress: '16 de Septiembre entre alfredo karam y allende, Centro Comercial, 85900 Huatabampo, Son.',
                        duration: "02h30m"
                    }]
            }
        ]
    },
    {
        UUID:uuidv4(),
        companyName: 'Elite',
        image: elite,
        trasportation: [
            {
                UUID: uuidv4(),
                code: "104",
                gpsStatus: "Activo",
                lastSeen: "20/07/2025 01:12:12",
                itinerary: [
                    {
                        UUID: uuidv4(),
                        departureTime: {hour:10, minute:1},
                        origin: "Obregon",
                        longTextOrigin:"Ciudad Obregon, Son",
                        originAddress: 'Campeche 928, Cortinas 1 Secc, 85160 Cdad. Obregón, Son.',
                        destination: "Huatabampo",
                        longTextDestination:"Huatabampo, Son",
                        destinationAddress: '16 de Septiembre entre alfredo karam y allende, Centro Comercial, 85900 Huatabampo, Son.',
                        duration: "02h30m"
                    },
                    {
                        UUID: uuidv4(),
                        departureTime: {hour:10, minute:2},
                        origin: "Obregon",
                        longTextOrigin:"Ciudad Obregon, Son",
                        originAddress: 'Campeche 928, Cortinas 1 Secc, 85160 Cdad. Obregón, Son.',
                        destination: "Huatabampo",
                        longTextDestination:"Huatabampo, Son",
                        destinationAddress: '16 de Septiembre entre alfredo karam y allende, Centro Comercial, 85900 Huatabampo, Son.',
                        duration: "02h30m"
                    },
                    {
                        UUID: uuidv4(),
                        departureTime:{hour:10, minute:3},
                        origin: "Obregon",
                        longTextOrigin:"Ciudad Obregon, Son",
                        originAddress: 'Campeche 928, Cortinas 1 Secc, 85160 Cdad. Obregón, Son.',
                        destination: "Huatabampo",
                        longTextDestination:"Huatabampo, Son",
                        destinationAddress: '16 de Septiembre entre alfredo karam y allende, Centro Comercial, 85900 Huatabampo, Son.',
                        duration: "02h30m"
                    },
                    {
                        UUID: uuidv4(),
                        departureTime:{hour:10, minute:4},
                        origin: "Obregon",
                        longTextOrigin:"Ciudad Obregon, Son",
                        originAddress: 'Campeche 928, Cortinas 1 Secc, 85160 Cdad. Obregón, Son.',
                        destination: "Huatabampo",
                        longTextDestination:"Huatabampo, Son",
                        destinationAddress: '16 de Septiembre entre alfredo karam y allende, Centro Comercial, 85900 Huatabampo, Son.',
                        duration: "02h30m"
                    }
                ]
            },
            {
                UUID: uuidv4(),
                code: "105",
                gpsStatus: "Inactivo",
                lastSeen: "20/07/2025 01:12:12",
                itinerary: [{
                        UUID: uuidv4(),
                        departureTime: {hour:10, minute:5},
                        origin: "Obregon",
                        longTextOrigin:"Ciudad Obregon, Son",
                        originAddress: 'Campeche 928, Cortinas 1 Secc, 85160 Cdad. Obregón, Son.',
                        destination: "Huatabampo",
                        longTextDestination:"Huatabampo, Son",
                        destinationAddress: '16 de Septiembre entre alfredo karam y allende, Centro Comercial, 85900 Huatabampo, Son.',
                        duration: "02h30m"
                    },
                    {
                        UUID:uuidv4(),
                        departureTime:{hour:8, minute:40},
                        origin: "Obregon",
                        longTextOrigin:"Ciudad Obregon, Son",
                        originAddress: 'Campeche 928, Cortinas 1 Secc, 85160 Cdad. Obregón, Son.',
                        destination: "Huatabampo",
                        longTextDestination:"Huatabampo, Son",
                        destinationAddress: '16 de Septiembre entre alfredo karam y allende, Centro Comercial, 85900 Huatabampo, Son.',
                        duration: "02h30m"
                    }]
            }, {
                UUID: uuidv4(),
                code: "106",
                gpsStatus: "Activo",
                lastSeen: "20/07/2025 01:12:12",
                itinerary: [
                    {
                        UUID: uuidv4(),
                        departureTime: {hour:12, minute:55},
                        origin: "Obregon",
                        longTextOrigin:"Ciudad Obregon, Son",
                        originAddress: 'Campeche 928, Cortinas 1 Secc, 85160 Cdad. Obregón, Son.',
                        destination: "Huatabampo",
                        longTextDestination:"Huatabampo, Son",
                        destinationAddress: '16 de Septiembre entre alfredo karam y allende, Centro Comercial, 85900 Huatabampo, Son.',
                        duration: "02h30m"
                    },
                    {
                        UUID: uuidv4(),
                        departureTime:{hour:17, minute:20},
                        origin: "Obregon",
                        longTextOrigin:"Ciudad Obregon, Son",
                        originAddress: 'Campeche 928, Cortinas 1 Secc, 85160 Cdad. Obregón, Son.',
                        destination: "Huatabampo",
                        longTextDestination:"Huatabampo, Son",
                        destinationAddress: '16 de Septiembre entre alfredo karam y allende, Centro Comercial, 85900 Huatabampo, Son.',
                        duration: "02h30m"
                    }]
            }
        ]
    },
    {
        UUID:uuidv4(),
        companyName: 'Albatros',
        image: albatros,
        trasportation: [
            {
                UUID: uuidv4(),
                code: "107",
                gpsStatus: "Activo",
                lastSeen: "20/07/2025 01:12:12",
                itinerary: [
                  {
                        UUID: uuidv4(),
                        departureTime: {hour:9, minute:30},
                        origin: "Obregon",
                        longTextOrigin:"Ciudad Obregon, Son",
                        originAddress: 'Campeche 928, Cortinas 1 Secc, 85160 Cdad. Obregón, Son.',
                        destination: "Huatabampo",
                        longTextDestination:"Huatabampo, Son",
                        destinationAddress: '16 de Septiembre entre alfredo karam y allende, Centro Comercial, 85900 Huatabampo, Son.',
                        duration: "02h30m"
                    },
                    {
                        UUID: uuidv4(),
                        departureTime:{hour:13, minute:10},
                        origin: "Obregon",
                        longTextOrigin:"Ciudad Obregon, Son",
                        originAddress: 'Campeche 928, Cortinas 1 Secc, 85160 Cdad. Obregón, Son.',
                        destination: "Huatabampo",
                        longTextDestination:"Huatabampo, Son",
                        destinationAddress: '16 de Septiembre entre alfredo karam y allende, Centro Comercial, 85900 Huatabampo, Son.',
                        duration: "02h30m"
                    },
                    {
                        UUID: uuidv4(),
                        departureTime: {hour:13, minute:40},
                        origin: "Obregon",
                        longTextOrigin:"Ciudad Obregon, Son",
                        originAddress: 'Campeche 928, Cortinas 1 Secc, 85160 Cdad. Obregón, Son.',
                        destination: "Huatabampo",
                        longTextDestination:"Huatabampo, Son",
                        destinationAddress: '16 de Septiembre entre alfredo karam y allende, Centro Comercial, 85900 Huatabampo, Son.',
                        duration: "02h30m"
                    }
                ]
            },
            {
                UUID: uuidv4(),
                code: "108",
                gpsStatus: "Activo",
                lastSeen: "20/07/2025 01:12:12",
                itinerary: [{
                        UUID: uuidv4(),
                        departureTime: {hour:9, minute:20},
                        origin: "Obregon",
                        longTextOrigin:"Ciudad Obregon, Son",
                        originAddress: 'Campeche 928, Cortinas 1 Secc, 85160 Cdad. Obregón, Son.',
                        destination: "Huatabampo",
                        longTextDestination:"Huatabampo, Son",
                        destinationAddress: '16 de Septiembre entre alfredo karam y allende, Centro Comercial, 85900 Huatabampo, Son.',
                        duration: "02h30m"
                    }]
            }, {
                UUID: uuidv4(),
                code: "109",
                gpsStatus: "Activo",
                lastSeen: "20/07/2025 01:12:12",
                itinerary: [
                    {
                        UUID: uuidv4(),
                        departureTime: {hour:16, minute:40},
                        origin: "Obregon",
                        longTextOrigin:"Ciudad Obregon, Son",
                        originAddress: 'Campeche 928, Cortinas 1 Secc, 85160 Cdad. Obregón, Son.',
                        destination: "Huatabampo",
                        longTextDestination:"Huatabampo, Son",
                        destinationAddress: '16 de Septiembre entre alfredo karam y allende, Centro Comercial, 85900 Huatabampo, Son.',
                        duration: "02h30m"
                    },
                    {
                        UUID: uuidv4(),
                        departureTime: {hour:13, minute:5},
                        origin: "Obregon",
                        longTextOrigin:"Ciudad Obregon, Son",
                        originAddress: 'Campeche 928, Cortinas 1 Secc, 85160 Cdad. Obregón, Son.',
                        destination: "Huatabampo",
                        longTextDestination:"Huatabampo, Son",
                        destinationAddress: '16 de Septiembre entre alfredo karam y allende, Centro Comercial, 85900 Huatabampo, Son.',
                        duration: "02h30m"
                    }]
            }
        ]
    }
]