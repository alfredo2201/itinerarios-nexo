import { useState } from "react";
import type { Itinerary } from "../../models/Trasportation";
import CardInfoItinerary from './CardInfoItinerary';
interface itemListProps {
    id: string
    imagen: string,
    nombreLinea: string,
    direccionOrigen?: string
    numeroCamion?: string
    estado: string,
    ultimaVezVisto: string,
    itinerario: Itinerary,
    showTransport: (id: string, name: string, code?: string) => void
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
                <CardInfoItinerary
                    itinerary={itinerario}
                    animate={animate}
                    uuid={id}
                    bg="ffffff"
                    text="black"
                    showTransport={() => showTransport(id, nombreLinea, numeroCamion)
                    }                ></CardInfoItinerary>
                :
                <></>}
        </>

    )
}

export default ItemListTrackingComponent;