import { useState, useEffect } from "react";
const title = 'Central de autobuses Faustino Felix Serna'
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
        <div className="h-20 sm:h-25 bg-[#023672] w-screen flex justify-between">
            <p className="w-1/3 sm:w-1/4 font-sans text-[10px] self-center sm:text-2xl text-bold text-white text-center px-3 sm:px-16">{title}</p>
            <p className="w-1/3 sm:w-2/4 font-sans sm:text-[50px] self-center text-2xl text-bold text-white text-center ">SALIDAS</p>
            <p className="w-1/3 sm:w-1/4 font-sans sm:text-[50px] self-center text-bold text-white text-center pr-3">{currentTime.toLocaleTimeString()}</p>
        </div>
    </>)
}

export default DisplayTopBarComponent;