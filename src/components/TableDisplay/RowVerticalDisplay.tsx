import { useState } from "react";
import CardInfoItinerary from "../Tracking/CardInfoItinerary";
import type { Itinerary } from '../../models/Trasportation'
import { formatTimeInSonoraCustom } from "../../utils/validations";

interface Props {
    itinerary: Itinerary
}

function RowVerticalDisplay({ itinerary }: Props) {
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
            <tr className="bg-[#171717] text-white w-screen nth-[2n]:bg-[#023672]" onClick={handleToggle}>
                <td className="text-[16px] text-[#C3D000] sm:text-[24px] font-bold py-3 px-2 text-center">
                    {formatTimeInSonoraCustom(itinerary.departureTime)}
                </td>
                <td className="text-[16px] sm:text-[24px] font-semibold py-1 text-center">{itinerary.destination.name}</td>
                <td className="font-semibold">
                    <img src={itinerary.company?.image} alt="Logotipo" className="h-7 sm:h-10 " />
                </td>
                <td className="text-[16px] sm:text-[24px] font-bold py-1 text-center" >{itinerary.transport.code}</td>
            </tr>
            <tr></tr>
            <tr>
                <td colSpan={4}>
                    {isVisible ?
                        <CardInfoItinerary
                            key={itinerary._id}
                            itinerary={itinerary}
                            animate={animate}
                            bg='112236'
                            text="white"
                            showTransport={
                                () => console.log('Hola')//showTransport(transport.UUID,companyName,code)
                            }
                            >
                        </CardInfoItinerary>
                        :
                        <></>
                    }
                </td>
            </tr>

        </>




    )
}
export default RowVerticalDisplay;