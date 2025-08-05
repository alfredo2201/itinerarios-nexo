import { Link } from 'react-router'
interface foto{
    foto:string
}
function BoxBuses({foto}:foto) {
    return (
        <>     
        <Link to={'/bus_info/all'} state={{foto:foto}} className='size-60' >
            <div className="flex items-center justify-center bg-white shadow-xl/20 size-60 rounded-lg justify-center hover:bg-[#D3DAE8] cursor-pointer">
                <img className="h-15" src={foto} alt="logo" />
            </div>
        </Link>

        </>
    )
}

export default BoxBuses