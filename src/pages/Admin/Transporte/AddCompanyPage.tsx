import TransportForm from "../../../components/Autobuses/FormTransportes/TransportForm";

function BusAddPage() {


    return (
        <div className="flex items-center justify-center w-full h-14/15">
            <div className="flex flex-col bg-white dark:bg-gray-800 w-2/4 h-3/4 items-center font-[roboto] rounded-lg shadow-lg">
                <h1 className="text-[#0A3871] dark:text-white text-[35px] font-bold p-10">Agregar Compañia de Transporte</h1>
                <TransportForm></TransportForm>
            </div>
        </div>
    )
}

export default BusAddPage;