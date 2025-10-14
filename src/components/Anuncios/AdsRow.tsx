import { TrashIcon } from "@radix-ui/react-icons"
interface Props {
    id:string | undefined,
    fileName: string,
    URL:string | undefined,
    rep: number,
    state: string,
    onUrlChange: (urlVideo: string) => void
    deleteVideo: (id:string)=> void
}
function AdsRow({ id, fileName,URL, rep, state, onUrlChange, deleteVideo}: Props) {
    const handleOnClickVideo = () => {
        if (URL && URL.length > 0) {
            onUrlChange(URL);
        }
    }

    const handleOnDeleteVideo = () => {        
        if (id && id.length > 0) {
            deleteVideo(id);
        }
    }

    return (
        <tr className="bg-white h-12 border-x-1 border-b-1 border-[#D9D9D9]">
            <td className="text-[13px] 2xl:text-[16px] font-normal px-3">{fileName}</td>
            <td className="text-[13px] 2xl:text-[16px] font-normal px-2 text-center"> {rep}</td>
            <td className="text-[13px] 2xl:text-[16px] font-normal px-2 text-center"> {state}</td>
            <td className="px-2 text-center ">
                <button 
                onClick={handleOnClickVideo} 
                className="bg-[#023672] w-25 rounded-full text-white text-[13px] 2xl:text-[14px] p-1 hover:bg-[#4185D4] cursor-pointer transition duration-150 ease-in-out">Ver Video</button>
            </td>
            <td className="flex items-center justify-center h-12 text-[14px] px-2" onClick={() => {handleOnDeleteVideo()}}>
                <TrashIcon className="cursor-pointer"></TrashIcon>
            </td>
        </tr>
    )
}

export default AdsRow