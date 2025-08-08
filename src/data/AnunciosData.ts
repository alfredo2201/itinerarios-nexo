import type { AnuncioInterface } from "../interfaces/types";
import video1 from '../../videos/Anuncio 21-9.mp4'
import video2 from '../../videos/Spot-Cocacola.mp4'

export const AnunciosData:AnuncioInterface[] = [
    {
        key:1,
        nombreArchivo:video1,
        repeticiones:100,
        vencimiento: new Date(),
        formato:'21:9',
        estado: 'Vigente'
    },
        {
        key:2,
        nombreArchivo:video2,
        repeticiones:100,
        vencimiento: new Date(),
        formato:'21:9',
        estado: 'Vigente'
    }
]