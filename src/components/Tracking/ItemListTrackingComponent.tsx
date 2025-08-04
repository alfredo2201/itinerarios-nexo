interface itemListProps {
    imagen: string,
    nombreLinea: string,
    direccionOrigen: string
    numeroCamion: string
    estado: string,
    ultimaVezVisto: string
}
function ItemListTrackingComponent({ imagen, nombreLinea, direccionOrigen, numeroCamion, estado, ultimaVezVisto }: itemListProps) {
    return (
        <div className="flex flex-row border-b-1 border-[#E3E3E3] p-2 bg-white">            
            <div className="flex items-center w-1/6 px-2">
                <span className="flex bg-[#BFCDDB] rounded-full h-10 w-10 justify-center items-center"><img src={imagen} alt="" /></span>
            </div>
            <div className="w-4/6">
                <h1 className="text-[16px] font-bold">{nombreLinea} - Linea #{numeroCamion}</h1>
                <p className="text-[12px] text-[#E3E3E3]">{direccionOrigen}</p>
            </div>
            <div className="flex flex-col w-2/8 items-stretch justify-between py-2">
                {estado === 'Activo' ?
                    <div className="bg-green-500 w-5 h-5 self-end rounded-full "></div>
                    : <div className="bg-red-500 w-5 h-5 self-end rounded-full "></div>
                }
                <p className="text-[8px] text-[#E3E3E3] ">{ultimaVezVisto}</p>
            </div>
        </div>
    )
}

export default ItemListTrackingComponent;