import GpsIcon from '../../img/marcador-de-posicion.png'
import type { ItineraryInterface } from '../../models/Trasportation';
import { getMinutesFormat } from '../../utils/validations';
interface Props {
    itinerary: ItineraryInterface
    animate: string;
    state: string;
    uuid: string,
    companyName: string
    bg:string
    text:string
    code?: string
    showTransport: (id: string, name: string, code?: string) => void
}

function CardInfoItinerary(
    {
        itinerary,
        state,
        showTransport,
        animate,
        uuid,
        companyName,
        code,
        bg,
        text
    }: Props) {
    return (
        <div className={`flex flex-col min-h-55 bg-[#${bg}] text-${text} justify-center items-center ${animate}`} >
            <div className="flex flex-row" >
                <div className="flex flex-col justify-center">
                    <div className="flex flex-row">
                        <p className="px-3 text-[12px] self-center">
                            {itinerary.departureTime.hour < 12 ?
                                <span>{itinerary.departureTime.hour}:{getMinutesFormat(itinerary.departureTime)} A.M</span> :
                                <span>{itinerary.departureTime.hour - 12}:{getMinutesFormat(itinerary.departureTime)} P.M</span>
                            }
                        </p>
                        <img className="h-4 self-center" src={GpsIcon} alt="" />
                        <div className="w-2/3">
                            <p className="text-[15px]">{itinerary.longTextOrigin}</p>
                            <p className="text-[10px] text-green-500 leading-tight">{itinerary.originAddress}</p>
                        </div>

                    </div>
                    <div className="flex py-2">
                        <h1 className="px-6 text-[10px] text-[#B8B5B5]">{itinerary.duration}</h1>
                        <h1 className="text-[11px] leading-tight>Escala">Escala:</h1>
                    </div>
                    <div className="flex flex-row">
                        <p className="px-3 text-[12px] self-center">
                            {itinerary.departureTime.hour < 12 ?
                                <span>{itinerary.departureTime.hour}:{getMinutesFormat(itinerary.departureTime)} A.M</span> :
                                <span>{itinerary.departureTime.hour - 12}:{getMinutesFormat(itinerary.departureTime)} P.M</span>
                            }</p>
                        <img className="h-4 self-center" src={GpsIcon} alt="" />
                        <div className="w-2/3">
                            <p className="text-[15px]">{itinerary.longTextDestination}</p>
                            <p className="text-[10px] text-green-500 leading-tight">{itinerary.destinationAddress}</p>
                        </div>
                    </div>
                </div>
            </div>
            {state === 'Activo' ?
                <button className=" text-[11px] self-end px-4 p-1 bg-green-500 m-2 rounded-full cursor-pointer hover:bg-green-400"
                    onClick={
                        () => showTransport(uuid, companyName, code)
                    }
                >Rastrear</button>
                : <button className="text-white text-[11px] self-end px-4 p-1 bg-red-500 m-2 rounded-full">Inactivo</button>
            }

        </div>

    )
}

export default CardInfoItinerary