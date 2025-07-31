import CellTableDisplay from "./CellTableDisplay";
import logo1 from '../../img/tufesa_autobus.png';
import logo2 from '../../img/autobuses-elite.png';
interface ItinerarioDisplay {
    key: string,
    hora: string,
    destino: string,
    autobusImg: string,
    numero: string,
    estado: string
}
const fakeData:ItinerarioDisplay[] = [
    {
        key:'1',
        hora:'7:00 A.M',
        destino:'Los Mochis',
        autobusImg:logo1,
        numero:'111',
        estado:'Retrasado'
    },
    {
        key:'2',
        hora:'7:00 A.M',
        destino:'Guadalajara',
        autobusImg:logo2,
        numero:'111',
        estado:'A Tiempo'
    },
        {
        key:'3',
        hora:'7:00 A.M',
        destino:'Los Mochis',
        autobusImg:logo1,
        numero:'111',
        estado:'A Tiempo'
    },
    {
        key:'4',
        hora:'7:00 A.M',
        destino:'Guadalajara',
        autobusImg:logo2,
        numero:'111',
        estado:'A Tiempo'
    },    {
        key:'5',
        hora:'7:00 A.M',
        destino:'Los Mochis',
        autobusImg:logo1,
        numero:'111',
        estado:'A Tiempo'
    },
    {
        key:'6',
        hora:'7:00 A.M',
        destino:'Guadalajara',
        autobusImg:logo2,
        numero:'111',
        estado:'A Tiempo'
    },    {
        key:'7',
        hora:'7:00 A.M',
        destino:'Los Mochis',
        autobusImg:logo1,
        numero:'111',
        estado:'A Tiempo'
    },
    {
        key:'8',
        hora:'7:00 A.M',
        destino:'Guadalajara',
        autobusImg:logo2,
        numero:'111',
        estado:'A Tiempo'
    },    {
        key:'9',
        hora:'7:00 A.M',
        destino:'Los Mochis',
        autobusImg:logo1,
        numero:'111',
        estado:'A Tiempo'
    },
    {
        key:'10',
        hora:'7:00 A.M',
        destino:'Guadalajara',
        autobusImg:logo2,
        numero:'111',
        estado:'A Tiempo'
    },
    {
        key:'11',
        hora:'7:00 A.M',
        destino:'Los Mochis',
        autobusImg:logo1,
        numero:'111',
        estado:'A Tiempo'
    },
    {
        key:'12',
        hora:'7:00 A.M',
        destino:'Guadalajara',
        autobusImg:logo2,
        numero:'111',
        estado:'A Tiempo'
    },
        {
        key:'13',
        hora:'7:00 A.M',
        destino:'Los Mochis',
        autobusImg:logo1,
        numero:'111',
        estado:'A Tiempo'
    },
    {
        key:'14',
        hora:'7:00 A.M',
        destino:'Guadalajara',
        autobusImg:logo2,
        numero:'111',
        estado:'A Tiempo'
    },    {
        key:'15',
        hora:'7:00 A.M',
        destino:'Los Mochis',
        autobusImg:logo1,
        numero:'111',
        estado:'A Tiempo'
    },
    {
        key:'16',
        hora:'7:00 A.M',
        destino:'Guadalajara',
        autobusImg:logo2,
        numero:'111',
        estado:'A Tiempo'
    },    {
        key:'17',
        hora:'7:00 A.M',
        destino:'Los Mochis',
        autobusImg:logo1,
        numero:'111',
        estado:'A Tiempo'
    },
    {
        key:'18',
        hora:'7:00 A.M',
        destino:'Guadalajara',
        autobusImg:logo2,
        numero:'111',
        estado:'A Tiempo'
    },    {
        key:'19',
        hora:'7:00 A.M',
        destino:'Los Mochis',
        autobusImg:'string',
        numero:'111',
        estado:'A Tiempo'
    },
] 

const data:ItinerarioDisplay[] = fakeData.slice(0,18);

const rows = data.map(item =>
    <CellTableDisplay 
    key={item.key} 
    hora={item.hora} 
    destino={item.destino} 
    autobusImg={item.autobusImg} 
    numero={item.numero} 
    estado={item.estado} />
)

function TableDisplay() {
    return (
        <>
            <table className="table-auto">
                <thead>
                    <tr className="bg-[#4053AE] text-[#C3D000] w-screen ">
                        <th className="text-[24px] w-3xs px-3 py-1">Hora</th>
                        <th className="text-[24px] w-lg px-3 py-1">Destino</th>
                        <th className="text-[24px] w-lg px-3 py-1">Autobus</th>
                        <th className="text-[24px] w-xs px-3 py-1">Número</th>
                        <th className="text-[24px] w-lg px-3 py-1">Observacion</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </>

    )
}

export default TableDisplay;