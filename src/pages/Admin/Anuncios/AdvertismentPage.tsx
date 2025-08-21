import ReactPlayer from "react-player";
import AdsRow from "../../../components/Anuncios/AdsRow";
import { AnunciosData } from '../../../data/AnunciosData'
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import type { Advertisment } from "../../../models/Advertisment";

const data: Advertisment[] = AnunciosData.slice(0, 5);

function AdvertismentPage() {
    const playerRef = useRef(null)
    const [videoName, setVideoName] = useState('');

    const setURLVideo = (urlVideo: string) => {
        setVideoName(urlVideo)
    }

    const rows = data.map(item =>
        <AdsRow
            key={item.UUID}
            nombreArchivo={item.fileName}
            estado={item.status}
            repeticiones={item.repetitions}
            onUrlChange={setURLVideo}
        />
    )

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

    return (
        <div className="flex flex-col w-full h-full p-10 gap-5">
            <div className="flex">
                <div className="bg-white h-100 w-2/3 rounded-lg p-10">
                    <table className="table-auto">
                        <thead className="bg-[#B1C7E2] border-1 border-[#B1C7E2]">
                            <tr>
                                <th className="text-[16px] font-normal w-xs px-3 py-1 text-start">Nombre del archivo</th>
                                <th className="text-[16px] font-normal w-3xs px-3 py-1">Repeticiones al dia</th>
                                <th className="text-[16px] font-normal w-3xs px-3 py-1">Estado</th>
                                <th className="text-[16px] font-normal w-3xs px-3 py-1">Vista previa</th>
                                <th className="text-[16px] font-normal w-3xs px-3 py-1">Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                </div>
                <div className="flex w-1/3 justify-center pt-10 ">
                    <Link to={"/advertisement/add"} className="h-10">
                        <button className="bg-[#023672] h-10 w-60 rounded-full text-white hover:bg-[#4185D4] cursor-pointer transition duration-150 ease-in-out">
                            Subir video
                        </button>
                    </Link>

                </div>


            </div>
            <div className="bg-black max-w-160 mix-w-50 justify-center">
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