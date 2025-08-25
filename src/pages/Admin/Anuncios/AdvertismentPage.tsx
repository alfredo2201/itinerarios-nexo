import ReactPlayer from "react-player";
import AdsRow from "../../../components/Anuncios/AdsRow";
import { AnunciosData } from '../../../data/AnunciosData'
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import type { Advertisement } from "../../../models/Advertisement";

const data: Advertisement[] = AnunciosData.slice(0, 5);

function AdvertismentPage() {
    const playerRef = useRef(null)
    const [videoName, setVideoName] = useState('');
    const [videosList, setVideoList] = useState<Advertisement[]>([]);

    const setURLVideo = (urlVideo: string) => {
        setVideoName(urlVideo)
    }

        useEffect(() => {
            const formSuccess = sessionStorage.getItem('formSuccess');

            if (formSuccess === 'true') {
                toast.success(
                    <span>
                        <b>Agregado correctamente</b>
                        <p>Se agrego un nuevo anuncio al sistema</p>
                    </span>,
                    {
                        duration: 4000,
                        position: "bottom-right"
                    }
                );
                sessionStorage.removeItem('formSuccess');
            }
        }, []);

    useEffect(() => {
        setVideoList(data)
    }, [])

    const removeVideoList = (uuid: string) => {
        if (uuid != null || uuid != '' || uuid != undefined) {
            setVideoList(videosList.filter(item => item.UUID != uuid))
        }
    }

    return (
        <div className="flex flex-row sm:flex-col w-full h-full p-5 sm:p-10 gap-5">
            <div className="flex flex-col sm:flex-row items-center">
                <div className="bg-white h-auto w-full sm:w-2/3 rounded-lg p-3 sm:p-10">
                    <table className="table-auto">
                        <thead className="bg-[#B1C7E2] border-1 border-[#B1C7E2]">
                            <tr>
                                <th className="text-[12px] sm:text-[16px] font-normal w-xs px-3 py-1 text-start">Nombre del archivo</th>
                                <th className="text-[12px] sm:text-[16px] font-normal w-3xs px-3 py-1">Repeticiones al dia</th>
                                <th className="text-[12px] sm:text-[16px] font-normal w-3xs px-3 py-1">Estado</th>
                                <th className="text-[12px] sm:text-[16px] font-normal w-3xs px-3 py-1">Vista previa</th>
                                <th className="text-[12px] sm:text-[16px] font-normal w-3xs px-3 py-1">Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {videosList.map(item =>
                                <AdsRow
                                    key={item.UUID}
                                    uuid={item.UUID}
                                    fileName={item.fileName}
                                    state={item.status}
                                    rep={item.repetitions}
                                    URL={item.URL}
                                    onUrlChange={setURLVideo}
                                    deleteVideo={removeVideoList}
                                />
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="flex w-1/3 pt-10 ">
                    <Link to={"/advertisement/add"} className="h-10 w-full sm:px-12">
                        <button className="bg-[#023672] h-10 w-full rounded-full text-white hover:bg-[#4185D4] cursor-pointer transition duration-150 ease-in-out">
                            Subir video
                        </button>
                    </Link>

                </div>


            </div>
            <div className="bg-black max-w-160 mix-w-50 justify-center ml-15">
                {videoName != '' ?
                    <ReactPlayer
                        ref={playerRef}
                        src={videoName}
                        playing={false}
                        muted={false}
                        controls={true}
                        style={{
                            width: "100%",
                            height: "100%",
                            aspectRatio: "16/9",
                        }} /> :
                    <></>
                }

            </div>
        </div>
    )
}

export default AdvertismentPage;