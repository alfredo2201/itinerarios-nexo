import { useLocation } from 'react-router';
import GpsIcon from '../../img/marcador-de-posicion.png'
import type { Itinerary } from '../../models/Trasportation';
import { formatTimeInSonoraCustom } from '../../utils/validations';
interface Props {
    itinerary: Itinerary
    animate: string;
    state: string;
    uuid?: string,
    companyName?: string
    bg: string
    text: string
    code?: string
    showTransport: (id: string, name: string, code?: string) => void
}

function CardInfoItinerary(
    {
        itinerary,
        state,
       // showTransport,
        animate,
      //  uuid,
       // companyName,
       // code,
        bg,
        text
    }: Props) {
    const location = useLocation();
    return (
        <div className={`flex flex-col min-h-55 bg-[#${bg}] text-${text} justify-center items-center ${animate}`} >
            <div className="flex flex-row" >
                <div className="flex flex-col justify-center">
                    <div className="flex flex-row">
                        <p className="px-3 text-[12px] self-center">
                            {formatTimeInSonoraCustom(itinerary.departureTime)}
                        </p>
                        <img className="h-4 self-center" src={GpsIcon} alt="" />
                        <div className="w-2/3">
                            <p className="text-[15px]">{itinerary.origin.longText}</p>
                            <p className="text-[10px] text-green-500 leading-tight">{itinerary.origin.address}</p>
                        </div>

                    </div>
                    <div className="flex py-2">
                        <h1 className="px-6 text-[10px] text-[#B8B5B5]">{`${Math.floor(itinerary.estimatedDuration / 3600000).toString().padStart(2, '0')}` +
                                                                    `h${Math.floor((itinerary.estimatedDuration % 3600000) / 60000).toString().padStart(2, '0')}m`}</h1>
                        <h1 className="text-[11px] leading-tight>Escala">Escala:</h1>
                    </div>
                    <div className="flex flex-row">
                        <p className="px-3 text-[12px] self-center">
                            {formatTimeInSonoraCustom(itinerary.departureTime)}
                        </p>
                        <img className="h-4 self-center" src={GpsIcon} alt="" />
                        <div className="w-2/3">
                            <p className="text-[15px]">{itinerary.destination.longText}</p>
                            <p className="text-[10px] text-green-500 leading-tight">{itinerary.destination.address}</p>
                        </div>
                    </div>
                </div>
            </div>
            {location.pathname == '/vertical-display' ? <>
                {state === 'Activo' ?
                    <button className=" text-[11px] self-end px-4 p-1 bg-green-500 m-2 rounded-full cursor-pointer hover:bg-green-400"
                    >A tiempo</button>
                    : <button className="text-white text-[11px] self-end px-4 p-1 bg-red-500 m-2 rounded-full">Retrasado</button>
                }
            </>
                : <>
                    {state === 'Activo' ?
                        <button className=" text-[11px] self-end px-4 p-1 bg-green-500 m-2 rounded-full cursor-pointer hover:bg-green-400"
                        >Rastrear</button>
                        : <button className="text-white text-[11px] self-end px-4 p-1 bg-red-500 m-2 rounded-full">Inactivo</button>
                    }
                </>
            }


        </div>

    )
}

export default CardInfoItinerary