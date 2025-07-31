import { useState, useEffect } from "react";
const title = 'Central Camionera Faustino Felix Serna'
function DisplayTopBarComponent() {
    // UseEffect para cambiar dinamicamente la hora 
    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(intervalId); // Limpia el intervalo al desmontar el componente
    }, []);

    const [currentTime, setCurrentTime] = useState(new Date());
    return (<>
        <div className="h-25 bg-[#023672] w-screen flex">
            <p className="w-1/4 font-sans text-2xl text-bold text-white text-center pt-5 px-16">{title}</p>
            <p className="w-2/4 font-sans text-[50px] text-2xl text-bold text-white text-center pt-4">SALIDAS</p>
            <p className="w-1/4 font-sans text-[50px] text-bold text-white text-center pt-3">{currentTime.toLocaleTimeString()}</p>
        </div>
    </>)
}

export default DisplayTopBarComponent;