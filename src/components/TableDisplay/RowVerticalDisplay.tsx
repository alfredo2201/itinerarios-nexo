import { useState } from "react";
import CardInfoItinerary from "../Tracking/CardInfoItinerary";
import type { ItineraryInterface } from "../../models/Trasportation";
import type { Hour } from "../../interfaces/types";
import { getMinutesFormat } from "../../utils/validations";

interface Props {
    key: string,
    companyName: string
    departureTime: Hour,
    destination: string,
    image: string,
    code: string,
    state: string,
    transport: ItineraryInterface,
    //showTransport: (id:string,name:string,code?:string) => void
}

function RowVerticalDisplay({ departureTime, companyName, destination, image, code, transport, state }: Props) {
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
            <tr className="bg-[#171717] text-white h-13 w-screen nth-[2n]:bg-[#023672]" onClick={handleToggle}>
                <td className="text-[13px] text-[#C3D000] sm:text-[24px] font-bold py-2 text-center">
                    {departureTime.hour < 12 ?
                        <span>{departureTime.hour}:{getMinutesFormat(departureTime)} A.M</span> :
                        <span>{departureTime.hour - 12}:{getMinutesFormat(departureTime)} P.M</span>
                    }
                </td>
                <td className="text-[13px] sm:text-[24px] font-semibold py-2 text-center">{destination}</td>
                <td className="font-semibold pt-1 flex items-center justify-center pt-3">
                    <img src={image} alt="Logotipo" className="h-6 sm:h-10 " />
                </td>
                <td className="text-[13px] sm:text-[24px] font-bold py-2 text-center" >{code}</td>
            </tr>
            <tr></tr>
            <td colSpan={4}>
                {isVisible ?
                    <CardInfoItinerary
                        key={transport.UUID}
                        itinerary={transport}
                        animate={animate}
                        uuid={transport.UUID}
                        code={code}
                        state={state}
                        bg='252525'
                        text="white"
                        showTransport={
                            () => console.log('Hola')//showTransport(transport.UUID,companyName,code)
                        }
                        companyName={companyName}>
                    </CardInfoItinerary>
                    :
                    <></>
                }
            </td>
        </>




    )
}
export default RowVerticalDisplay;