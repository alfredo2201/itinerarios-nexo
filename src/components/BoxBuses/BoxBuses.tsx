import { Link } from 'react-router'
import foto1 from '../../img/albatros_logotipo.png'
function BoxBuses() {
    return (
        <>     
        <Link to={"/bus_info/all"} className='size-60'>
            <div className="flex items-center justify-center bg-white shadow-xl/20 size-60 rounded-lg justify-center hover:bg-[#D3DAE8] cursor-pointer">
                <img className="h-15" src={foto1} alt="" />
            </div>
        </Link>

        </>
    )
}

export default BoxBuses