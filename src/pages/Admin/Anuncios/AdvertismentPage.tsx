import ReactPlayer from "react-player";
import AdsRow from "../../../components/Anuncios/AdsRow";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import type { Advertisement } from "../../../models/Advertisement";
import { deletAds, getVideos } from "../../../services/AdvertismentsService";
import Swal from "sweetalert2";


function AdvertismentPage() {
    const playerRef = useRef(null)
    const [videoName, setVideoName] = useState('');
    const [videosList, setVideoList] = useState<Advertisement[]>([]);

    const setURLVideo = (urlVideo: string) => {
        setVideoName(urlVideo)
    }

    const handleDeleteAds = (id: string) => {
        try {
            if (id != null || id != '' || id != undefined) {
                Swal.fire({
                    title: "Desea eliminar este video?",
                    text: `Despues de confirmar, no se podra revertir el cambio`,
                    icon: "warning",
                    width: '20em',
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Si",
                    cancelButtonText: 'No'
                }).then((result) => {
                    if (result.isConfirmed) {
                        deletAds(id).then(() => {
                            setVideoList(videosList.filter(item => item._id != id))
                            toast.success(
                                <span>
                                    <b>Eliminado correctamente</b>
                                    <p>Se elimino un video de la base de datos</p>
                                </span>,
                                {
                                    duration: 4000,
                                    position: "bottom-right"
                                }
                            );
                        })
                    }
                });

            }

        } catch (error) {
            console.error(error)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Algo Salio Mal!",
                footer: '<a href="#">Why do I have this issue?</a>'
            });
        }

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
        getVideos().then((result) => {
            setVideoList(result)
        })

    }, [])



    return (
        <div className="flex flex-row sm:flex-col w-full h-full p-5 sm:p-10 gap-5">
            <div className="flex flex-col sm:flex-row items-center">
                <div className="bg-white h-auto w-full sm:w-2/3 rounded-lg p-3 sm:p-10">
                    <table className="table-auto">
                        <thead className="bg-[#B1C7E2] border-1 border-[#B1C7E2]">
                            <tr>
                                <th className="text-[12px] sm:text-[18px] font-semibold w-xs px-3 py-1 text-start">Nombre del archivo</th>
                                <th className="text-[12px] sm:text-[18px] font-semibold w-3xs px-3 py-1">Repeticiones al dia</th>
                                <th className="text-[12px] sm:text-[18px] font-semibold w-3xs px-3 py-1">Estado</th>
                                <th className="text-[12px] sm:text-[18px] font-semibold w-3xs px-3 py-1">Vista previa</th>
                                <th className="text-[12px] sm:text-[18px] font-semibold w-3xs px-3 py-1">Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {videosList.map(item =>
                                <AdsRow
                                    key={item._id}
                                    id={item._id}
                                    fileName={item.fileName}
                                    state={item.status}
                                    rep={item.repetitions}
                                    URL={item.URL}
                                    onUrlChange={setURLVideo}
                                    deleteVideo={handleDeleteAds}
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
                        volume={0.3}
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