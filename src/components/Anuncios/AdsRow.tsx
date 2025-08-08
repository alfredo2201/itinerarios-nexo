import { TrashIcon } from "@radix-ui/react-icons"
interface Props {
    nombreArchivo: string,
    repeticiones: number,
    estado: string,
    onUrlChange: (urlVideo: string) => void
}
function AdsRow({nombreArchivo, repeticiones, estado, onUrlChange }: Props) {
    const handleOnClickVideo = () => {
        if(nombreArchivo.length > 0){
            onUrlChange(nombreArchivo);  
        }
    }
    return (
        <tr className="bg-white h-12 w-screen border-x-1 border-b-1 border-[#D9D9D9]">
            <td className="text-[14px] px-3">{nombreArchivo}</td>
            <td className="text-[14px] px-2 text-center"> {repeticiones}</td>
            <td className="text-[14px] px-2 text-center"> {estado}</td>
            <td className="px-2 text-center">
                <button onClick={handleOnClickVideo} className="bg-[#023672] w-20 rounded-full text-white text-[12px] p-2 hover:bg-[#4185D4] cursor-pointer transition duration-150 ease-in-out">Ver Video</button>
            </td>
            <td className="flex items-center justify-center h-12 text-[14px] px-2">
                <TrashIcon className="cursor-pointer"></TrashIcon>
            </td>
        </tr>
    )
}

export default AdsRow