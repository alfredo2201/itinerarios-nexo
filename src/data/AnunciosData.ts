import video1 from '../../videos/Nike-spot.mp4'
import video2 from '../../videos/Spot-Cocacola.mp4'
import video3 from '../../videos/Nescafe-spot.mp4'
import video4 from '../../videos/Oldspice-spot.mp4'
import video5 from '../../videos/Anuncio 21-9.mp4'
import { v4 as uuidv4 } from 'uuid';
import type { Advertisement } from '../models/Advertisement'



export const AnunciosData: Advertisement[] = [
    {
        UUID: uuidv4(),
        companyName: 'Nescafe',
        fileName: 'Publicidad Agosto Nescafe',
        repetitions: 0,
        expiration: new Date(),
        format: 'Full HD 16:9',
        status: 'Activo',
        createdAt: new Date(),
        updatedAt: new Date(),
        URL: video3
    },
    {
        UUID: uuidv4(),
        companyName: 'Nike',
        fileName: "Publicidad Agosto Nike",
        repetitions: 0,
        expiration: new Date(),
        format: 'Full HD 16:9',
        status: 'Activo',
        createdAt: new Date(),
        updatedAt: new Date(),
        URL: video1
    },
    {
        UUID: uuidv4(),
        companyName: 'Coca Cola',
        fileName: "Publicidad Agosto Coca-cola",
        repetitions: 0,
        expiration: new Date(),
        format: 'Full HD 16:9',
        status: 'Activo',
        createdAt: new Date(),
        updatedAt: new Date(),
        URL: video2
    },
    {
        UUID: uuidv4(),
        companyName: 'Old Spice',
        fileName: "Publicidad Agosto Old Spice",
        repetitions: 100,
        expiration: new Date(),
        format: 'Full HD 16:9',
        status: 'Activo',
        createdAt: new Date(),
        updatedAt: new Date(),
        URL: video4
    },
    {
        UUID: uuidv4(),
        companyName: 'Unkwonw',
        fileName: "Publicidad Agosto Desconocido",
        repetitions: 100,
        expiration: new Date(),
        format: 'Full HD 21:9',
        status: 'Activo',
        createdAt: new Date(),
        updatedAt: new Date(),
        URL: video5
    }
]