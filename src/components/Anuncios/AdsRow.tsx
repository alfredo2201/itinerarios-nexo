import { TrashIcon } from "@radix-ui/react-icons"
import { UserRole } from "../../models/User";
interface Props {
    id: string | undefined,
    fileName: string,
    URL: string | undefined,
    rep: number,
    state: string,
    userRole?: string,
    onUrlChange: (urlVideo: string) => void
    deleteVideo: (id: string) => void
}
function AdsRow({ id, fileName, URL, rep, state, userRole, onUrlChange, deleteVideo }: Props) {
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
        <div className="flex flex-row px-3 py-2 border-b border-gray-300 items-center dark:border-gray-700 dark:bg-gray-700 transition duration-150 ease-in-out text-[13px] 2xl:text-[14px]">
            <div className="w-1/5 font-normal dark:text-white">{fileName}</div>
            <div className="w-1/5 text-center dark:text-white">{rep}</div>
            <div className="w-1/5 text-center dark:text-white">{state == "active" ? "Activo" : "Inactivo"}</div>
            <div className="w-1/5 text-center">
                <button
                    onClick={handleOnClickVideo}
                    className="bg-[#023672] w-15 sm:w-25 rounded-full text-white p-1 hover:bg-[#4185D4] cursor-pointer transition duration-150 ease-in-out"
                >
                    
                    <p>Ver </p>
                    <p className="hidden sm:block">Video</p>
                </button>
            </div>
            {(userRole === UserRole.ADMINISTRADOR || userRole === UserRole.EDITOR) && (
                <div className="w-1/5 flex items-center justify-center h-12 text-[14px]" onClick={handleOnDeleteVideo}>
                    <TrashIcon className="cursor-pointer" />
                </div>
            )}
        </div>
    )
}

export default AdsRow