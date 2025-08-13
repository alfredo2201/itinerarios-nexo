import { Link } from "react-router";
import BoxBuses from "../../../components/Autobuses/BoxBuses/BoxBuses";
import { useEffect } from "react";
import albatros from '../../../img/albatros_logotipo.png'
import tufesa from '../../../img/tufesa_autobus.png'
import elite from '../../../img/autobuses-elite.png'
import toast from "react-hot-toast";

function AdminBusesPage() {
    useEffect(() => {
        const formSuccess = sessionStorage.getItem('formSuccess');

        if (formSuccess === 'true') {
            toast.success(
            <span>
                <b>Agregado correctamente</b>
                <p>Se agrego una nueva linea de autobuses a la base de datos</p>
            </span>,
            {
                duration:4000,
                position:"bottom-right"
            }
               );
            sessionStorage.removeItem('formSuccess');
        }
    }, []);


    return (
        <div className="flex flex-col ">
            <div className="flex flex-wrap h-180 pt-15 px-15 gap-10 justify-center">
                <BoxBuses foto={albatros}></BoxBuses>
                <BoxBuses foto={tufesa}></BoxBuses>
                <BoxBuses foto={elite}></BoxBuses>
            </div>
            <div className="flex justify-end pr-10">
                <button
                    className="bg-[#023672] text-white w-1/8 h-10 rounded-lg justify-end min-w-30 hover:bg-[#0251B3] cursor-pointer transition duration-150 ease-in-out">
                    <Link to={"/bus_info/add"}>Agregar</Link>
                </button>
            </div>
        </div>

    )
}

export default AdminBusesPage;