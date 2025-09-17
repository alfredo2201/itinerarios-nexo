import { Link } from 'react-router'
interface Props {
    id?: string;
    foto: string    
}
function BoxBuses({ foto, id }: Props) {
    return (
        <>
            <Link to={{
                pathname: '/transports_info/all',
                search: `?companyId=${id}`,                
            }}className='flex items-center justify-center bg-white shadow-xl/20 size-40 md:size-60 rounded-lg justify-center hover:bg-[#D3DAE8] cursor-pointer transition duration-150 ease-in-out transition-transform duration-500 hover:scale-110' >
                <img className="h-10 md:h-15" src={foto} alt="logo" />
            </Link>

        </>
    )
}

export default BoxBuses