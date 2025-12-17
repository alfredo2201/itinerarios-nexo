import { useLocation } from 'react-router';
import GpsIcon from '../../img/marcador-de-posicion.png'
import type { Itinerary } from '../../models/Trasportation';
import { formatTimeInSonoraCustom } from '../../utils/validations';
import { MessageCircle } from 'lucide-react';
interface Props {
    itinerary: Itinerary
    animate: string;
    uuid?: string,
    bg: string
    text: string
    showTransport: (id: string, name: string, code?: string) => void
}

function CardInfoItinerary(
    {
        itinerary,
        animate,
        bg,
        text
    }: Props) {
    const location = useLocation();    
    return (
        <div className={`flex flex-col min-h-70 w-screen bg-[#${bg}] text-${text} justify-center items-center ${animate}`} >
            <div className="flex flex-row" >
                <div className="flex flex-col justify-center">
                    <div className="flex flex-row">
                        <p className="px-3 text-[12px] self-center">
                            {formatTimeInSonoraCustom(itinerary.departureTime)}
                        </p>
                        <img className="h-4 self-center" src={GpsIcon} alt="" />
                        <div className="w-2/3">
                            <p className="text-[17px]">{itinerary.origin.longText}</p>
                            <p className="text-[13px] text-green-500 leading-tight">{itinerary.origin.address}</p>
                        </div>

                    </div>
                    <div className="flex py-2 gap-3">
                        <h1 className="px-6 text-[13px] text-[#B8B5B5]">{`${Math.floor(itinerary.estimatedDuration / 3600000).toString().padStart(2, '0')}` +
                            `h${Math.floor((itinerary.estimatedDuration % 3600000) / 60000).toString().padStart(2, '0')}m`}</h1>
                        <h1 className=" text-[13px] text-white">Escala:</h1>
                    </div>
                    <div className="flex flex-row">
                        <p className="px-3 text-[13px] self-center">
                            {formatTimeInSonoraCustom(itinerary.departureTime)}
                        </p>
                        <img className="h-4 self-center" src={GpsIcon} alt="" />
                        <div className="w-2/3">
                            <p className="text-[16px]">{itinerary.destination.longText}</p>
                            <p className="text-[13px] text-green-500 leading-tight">{itinerary.destination.address}</p>
                        </div>
                    </div>
                </div>
            </div>
            {location.pathname == '/vertical-display' ?
                <div className='w-full flex justify-between px-15 pt-6'>
                    <div className="w-25 h-8 px-2 py-1 bg-white flex items-center justify-center rounded-full self-center text-[12px] text-black text-center">
                        <a className='text-center w-full' href={`${itinerary.company?.webPage}`}>Ir a comprar</a>
                    </div>
                    <div className="w-25 h-8 px-2 py-1 bg-green-500 flex items-center justify-center rounded-full self-center text-[12px] text-black text-center">
                        <MessageCircle />
                        <a className='text-center w-full' target='_blank' href={`https://wa.me/${itinerary.company?.numberContact?.replaceAll(' ','')}`}>                                                                               
                            Whatsapp
                        </a>
                    </div>
                    {itinerary.transport.gpsStatus === 'Activo' ?
                        <button className=" text-[12px] px-4 py-1 bg-green-500 rounded-full cursor-pointer hover:bg-green-400"
                        >A tiempo</button>
                        : <button className="text-white text-[12px]  px-4 p-1 bg-red-500 rounded-full">Retrasado</button>
                    }
                </div>
                : <>
                    {itinerary.transport.gpsStatus === 'Activo' ?
                        <button className=" text-[12px] self-end px-4 p-1 bg-green-500 m-2 rounded-full cursor-pointer hover:bg-green-400"
                        >Rastrear</button>
                        : <button className="text-white text-[12px] self-end px-4 p-1 bg-red-500 m-2 rounded-full">Inactivo</button>
                    }
                </>
            }


        </div>

    )
}

export default CardInfoItinerary