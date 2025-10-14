import ReactPlayer from "react-player";
import AdsRow from "../../../components/Anuncios/AdsRow";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import type { Advertisement } from "../../../models/Advertisement";
import { deletAds, getVideos } from "../../../services/AdvertismentsService";
import Swal from "sweetalert2";
import SpinnerSvg from "../../../components/SpinnerSvg";


function AdvertismentPage() {
    const playerRef = useRef(null)
    const [videoName, setVideoName] = useState('');
    const [videosList, setVideoList] = useState<Advertisement[]>([]);
    const [loading, setLoading] = useState<Boolean>()

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
        setLoading(true)
        getVideos().then((result) => {
            if (result) {
                setVideoList(result)
                setLoading(false)
            }
        })

    }, [])



    return (
        <div className="flex flex-row sm:flex-col w-full h-full p-5 2xl:p-10 gap-5">
            <div className="flex flex-col sm:flex-row ">
                <div className="flex justify-center items-center bg-white h-65 w-full sm:w-2/3 rounded-lg p-3 sm:p-10">                
                    {loading ?
                        <SpinnerSvg size={100} className="text-blue-100 sefl-center" /> :
                        <div className="bg-[#B1C7E2] rounded-lg overflow-auto">                        
                            <table className="table-auto md:table-fixed">
                                <thead className="">
                                    <tr>
                                        <th className="text-[13px] 2xl:text-[18px] font-semibold w-xs px-3 py-1 text-start">Nombre del archivo</th>
                                        <th className="text-[13px] 2xl:text-[18px] font-semibold w-3xs px-3 py-1">Repeticiones al dia</th>
                                        <th className="text-[13px] 2xl:text-[18px] font-semibold w-3xs px-3 py-1">Estado</th>
                                        <th className="text-[13px] 2xl:text-[18px] font-semibold w-3xs px-3 py-1">Vista previa</th>
                                        <th className="text-[13px] 2xl:text-[18px] font-semibold w-3xs px-3 py-1">Eliminar</th>
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
                    }
                </div>

                <div className="bg-black 2xl:w-200 w-150 2xl:h-92 justify-center 2xl:ml-15 ml-5">
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
                            <div className="flex flex-col justify-center h-full items-center">
                                <p className="text-white font-bold">Vista previa no disponible</p>
                            </div>
                    }

                </div>
            </div>
            <div className="flex flex-col w-full items-end px-30 2xl:px-50">
                <Link to={"/dashboard/advertisement/add"} className="flex justify-center bg-[#023672] h-10 2xl:w-1/5 w-1/4 rounded-full text-white text-[13px] 2xl:text-[15px] hover:bg-[#4185D4] cursor-pointer transition duration-150 ease-in-out">
                    <button className="cursor-pointer">
                        Subir video
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default AdvertismentPage;