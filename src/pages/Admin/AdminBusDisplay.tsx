import BoxBuses from "../../components/BoxBuses/BoxBuses";

function AdminBusesPage (){
    return(
        <div className="flex flex-wrap p-15 gap-10 justify-center">
            <BoxBuses></BoxBuses>
            <BoxBuses></BoxBuses>
            <BoxBuses></BoxBuses>
            <BoxBuses></BoxBuses>
            <BoxBuses></BoxBuses>
        </div>
    )
}

export default AdminBusesPage;