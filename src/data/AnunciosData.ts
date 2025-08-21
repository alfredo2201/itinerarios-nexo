import video1 from '../../videos/Nike-spot.mp4'
import video2 from '../../videos/Spot-Cocacola.mp4'
import video3 from '../../videos/Nescafe-spot.mp4'
import video4 from '../../videos/Oldspice-spot.mp4'
import video5 from '../../videos/Anuncio 21-9.mp4'
import { v4 as uuidv4 } from 'uuid';
import type { Advertisment } from '../models/Advertisment'



export const AnunciosData: Advertisment[] = [
    {
        UUID: uuidv4(),
        companyName: 'Nescafe',
        fileName: video3,
        repetitions: 100,
        expiration: new Date(),
        format: 'Full HD 16:9',
        status: 'Activo',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        UUID: uuidv4(),
        companyName: 'Nike',
        fileName: video1,
        repetitions: 100,
        expiration: new Date(),
        format: 'Full HD 16:9',
        status: 'Activo',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        UUID: uuidv4(),
        companyName: 'Coca Cola',
        fileName: video2,
        repetitions: 100,
        expiration: new Date(),
        format: 'Full HD 16:9',
        status: 'Activo',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        UUID: uuidv4(),
        companyName: 'Old Spice',
        fileName: video4,
        repetitions: 100,
        expiration: new Date(),
        format: 'Full HD 16:9',
        status: 'Activo',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        UUID: uuidv4(),
        companyName: 'Unkwonw',
        fileName: video5,
        repetitions: 100,
        expiration: new Date(),
        format: 'Full HD 21:9',
        status: 'Activo',
        createdAt: new Date(),
        updatedAt: new Date()
    }
]