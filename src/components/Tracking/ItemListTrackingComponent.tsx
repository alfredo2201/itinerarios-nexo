
import GpsIcon from '../../img/marcador-de-posicion.png'
import { useState } from "react";
import type { ItineraryInterface } from "../../models/Trasportation";
interface itemListProps {
    id:string
    imagen: string,
    nombreLinea: string,
    direccionOrigen?: string
    numeroCamion?: string
    estado: string,
    ultimaVezVisto: string,    
    itinerario: ItineraryInterface[],
    showTransport: (id:string,name:string,code?:string) => void
}
function ItemListTrackingComponent({ id, imagen, nombreLinea, direccionOrigen, numeroCamion, estado, ultimaVezVisto, itinerario, showTransport }: itemListProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [animate, setAnimate] = useState("animate-drop-in");

    const handleToggle = () => {
        if (isVisible) {
            setAnimate("animate-drop-out");
            setTimeout(() => setIsVisible(false), 500); // Espera a que acabe la animación
        } else {
            setAnimate("animate-drop-in");
            setIsVisible(true);
        }
    };

    return (
        <>
            <div className="flex flex-row border-b-1 border-[#E3E3E3] p-2 bg-white cursor-pointer hover:bg-[#F5F5F5] transition duration-150 ease-in-out" onClick={
                handleToggle
            }>
                <div className="flex items-center w-1/6 px-2">
                    <span className="flex bg-[#BFCDDB] rounded-full h-10 w-10 justify-center items-center"><img src={imagen} alt="" /></span>
                </div>
                <div className="w-4/6">
                    <h1 className="text-[16px] font-bold">{nombreLinea} - Linea #{numeroCamion}</h1>
                    <p className="text-[12px] text-[#C4C4C4]">{direccionOrigen}</p>
                </div>
                <div className="flex flex-col w-2/8 items-stretch justify-between py-2">
                    {estado === 'Activo' ?
                        <div className="bg-green-500 w-5 h-5 self-end rounded-full "></div>
                        : <div className="bg-red-500 w-5 h-5 self-end rounded-full "></div>
                    }
                    <p className="text-[8px] text-[#C4C4C4] ">{ultimaVezVisto}</p>
                </div>
            </div>
            {isVisible ?
                <div className={`flex flex-col min-h-55 shadow-md mb-2 justify-center items-center ${animate}`} >
                    <div className="flex flex-row" >
                        <div className="flex flex-col justify-center">
                            <div className="flex flex-row">
                                <p className="px-3 text-[12px] self-center">{itinerario[0].departureTime}</p>
                                <img className="h-4 self-center" src={GpsIcon} alt="" />
                                <div className="w-2/3">
                                    <p className="text-[15px]">{itinerario[0].longTextOrigin}</p>
                                    <p className="text-[10px] text-green-500 leading-tight">{itinerario[0].originAddress}</p>
                                </div>

                            </div>
                            <div className="flex py-2">
                                <h1 className="px-6 text-[10px] text-[#B8B5B5]">{itinerario[0].duration}</h1>
                                <h1 className="text-[11px] leading-tight>Escala">Escala:</h1>
                            </div>
                            <div className="flex flex-row">
                                <p className="px-3 text-[12px] self-center">{itinerario[0].departureTime}</p>
                                <img className="h-4 self-center" src={GpsIcon} alt="" />
                                <div className="w-2/3">
                                    <p className="text-[15px]">{itinerario[0].longTextDestination}</p>
                                    <p className="text-[10px] text-green-500 leading-tight">{itinerario[0].destinationAddress}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {estado === 'Activo' ?
                        <button className=" text-[11px] self-end px-4 p-1 bg-green-500 m-2 rounded-full cursor-pointer hover:bg-green-400" onClick={()=> showTransport(id,nombreLinea,numeroCamion)}>Rastrear</button>
                        : <button className="text-white text-[11px] self-end px-4 p-1 bg-red-500 m-2 rounded-full">Inactivo</button>
                    }

                </div>

                :
                <></>}
        </>

    )
}

export default ItemListTrackingComponent;