import { Link } from 'react-router'
interface Props {
    foto: string
    nombreEmpresa?: string;
}
function BoxBuses({ foto, nombreEmpresa }: Props) {
    return (
        <>
            <Link to={'/bus_info/all'} state={{
                foto: foto,
                nombreEmpresa: nombreEmpresa
            }} className='size-60' >
                <div className="flex items-center justify-center bg-white shadow-xl/20 size-60 rounded-lg justify-center hover:bg-[#D3DAE8] cursor-pointer transition duration-150 ease-in-out transition-transform duration-500 hover:scale-110">
                    <img className="h-15" src={foto} alt="logo" />
                </div>
            </Link>

        </>
    )
}

export default BoxBuses