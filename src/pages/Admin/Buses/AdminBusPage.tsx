import { Link } from "react-router";
import BoxBuses from "../../../components/BoxBuses/BoxBuses";

function AdminBusesPage() {
    return (
        <div className="flex flex-col ">
            <div className="flex flex-wrap h-180 p-15 gap-10 justify-center">
                <BoxBuses></BoxBuses>
                <BoxBuses></BoxBuses>
                <BoxBuses></BoxBuses>
                <BoxBuses></BoxBuses>
            </div>
            <div className="flex justify-end">
                <button
                    className="bg-[#023672] text-white w-1/8 h-10 rounded-lg justify-end min-w-30 hover:bg-[#0251B3] cursor-pointer">
                    <Link to={"/bus_info/all"}>Agregar</Link>
                </button>
            </div>
        </div>

    )
}

export default AdminBusesPage;