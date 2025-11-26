import { useCallback, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useDropzone } from "react-dropzone";
import { Form, useNavigate } from "react-router";
import { addNewVideo, createAdvertisement, deleteVideo } from "../../../services/AdvertismentsService";
import type { VideoData, Video, SelectOption } from "../../../types/types";
import Swal from 'sweetalert2'
import type { Advertisement } from "../../../models/Advertisement";
import { useUser } from "../../../hooks/useUser";
import toast from "react-hot-toast";

function AddAdsPage() {
    const { user } = useUser()
    const [formVisible, setFormVisible] = useState(true)
    const playerRef = useRef(null)
    const [isAvailable, setIsAvailable] = useState('pointer-events-none')

    //Estados del formulario    
    const [companyText, setCompanyText] = useState<string>('');
    const [videoName, setVideoName] = useState<string | undefined>();
    const [video, setVideo] = useState<Video | undefined>();
    // Estado para el valor seleccionado
    const [selectedValue, setSelectedValue] = useState<number>(0);
    // Estado para almacenar la fecha seleccionada. Inicialmente vacío.
    const [selectedDate, setSelectedDate] = useState<string>('');
    // Estado para el valor seleccionado
    const [selectedFormat, setSelectedFormat] = useState<string>('');

    const options: SelectOption[] = [
        { value: '50', label: '50' },
        { value: '100', label: '100' },
        { value: '200', label: '200' },
    ];

    const optionsFormat: SelectOption[] = [
        { value: '16:9 Full-HD', label: '16:9 Full-HD' },
        { value: '9:16 Full-HD', label: '9:16 Full-HD' },
        { value: '32:9 Full-HD', label: '32:9 Full-HD' },
    ];
    const navigate = useNavigate();

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFormVisible(!formVisible)
        setVideoName(acceptedFiles[0].name)
        addNewVideo(acceptedFiles[0]).then((response: VideoData) => {
            if (response != undefined) {
                setVideo(response.video)
                setIsAvailable('pointer-events-auto')
            }

        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'video/mp4': ['.mp4']
        }
    })

    // Función que maneja el cambio en el select de repeticiones
    const handleChangeCompanyText = () => {
        setCompanyText(user?.empresaInfo.empresa || '');

    };
    // Función que maneja el cambio en el select de repeticiones
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(parseInt(e.target.value, 10)); // Actualiza el estado con el nuevo valor
    };

    // Función que maneja el cambio en el select de formatos
    const handleFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedFormat(e.target.value); // Actualiza el estado con el nuevo valor
    };
    // Manejador para el evento de cambio en el input de fecha.
    const handleDateChange = () => {
        const dateObj = new Date().setMonth(new Date().getMonth() + 1); // Sumar un mes a la fecha actual
        const date = new Date(dateObj);

        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        setSelectedDate(formattedDate);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (videoName != undefined) {
                const ads: Advertisement = {
                    companyName: companyText,
                    fileName: videoName,
                    URL: video?.url,
                    repetitions: selectedValue,
                    expiration: new Date(selectedDate),
                    format: selectedFormat,
                    status: 'active'
                }
                createAdvertisement(ads).then((result) => {
                    toast.success(
                        <span>
                            <b>Agregado correctamente</b>
                            <p>Se agrego un nuevo anuncio al sistema</p>
                            <p>{result.message}</p>
                        </span>,
                        {
                            duration: 4000,
                            position: "top-right"
                        }
                    );
                    navigate('/dashboard/advertisement');
                })
            }
        } catch (error) {
            toast.error(
                <span>
                    <b>Error al agregar anuncio</b>
                    <p>Intenta de nuevo mas tarde</p>
                </span>,
                {
                    duration: 4000,
                    position: "top-right"
                }
            );
        }

    }

    const handleOnCancel = () => {
        try {
            Swal.fire({
                title: "Estas seguro de salir?",
                text: "No se guardaran los cambios hechos",
                icon: "warning",
                width: '24em',
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Si",
                cancelButtonText: 'No'
            }).then((result) => {
                if (result.isConfirmed) {
                    deleteVideo(video?.public_id).then(() => {
                        navigate('/dashboard/advertisement');
                    })
                }
            });
        } catch (error) {            
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Algo Salio Mal!",
                footer: '<a href="#">¿Por qué tengo este problema?</a>'
            });
        }
    }

    useEffect(() => {
        handleDateChange();
        handleChangeCompanyText();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="flex justify-center h-14/15 w-full px-10">
            {formVisible ?
                <div className="bg-[#ADC2D9] w-3/4 h-3/4 rounded-lg self-center" {...getRootProps()}>
                    <div className="w-full h-1/8 py-5 px-10 "><h1 className="text-[#023672] text-[18px] font-bold">Subir Video</h1></div>
                    <div className="flex items-center justify-center `w-full h-5/8">
                        <div className="bg-[#859DBD] h-50 w-50 rounded-full flex justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width={128} height={128} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-upload"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 9l5 -5l5 5" /><path d="M12 4l0 12" /></svg>
                        </div>
                    </div>
                    <div className="flex flex-col w-full h-2/8 items-center justify-center pb-10 " >
                        {
                            isDragActive ?
                                <h1 className="text-white h-1/2">Suelta el archivo....</h1> :
                                <h1 className="text-white h-1/2">Arrastra y suelta archivos de video para subirlos</h1>
                        }

                        <button className="bg-[#023672] text-white text-[14px] h-13 w-1/7 px-2 text-center rounded-[1vw] hover:bg-[#4185D4] cursor-pointer transition duration-150 ease-in-out" type="button">
                            <p>Seleccionar archivos</p>
                        </button>
                        <input {...getInputProps()} />
                    </div>
                </div>
                :
                <div className="flex flex-col bg-white h-14/15 rounded-lg mt-10">

                    <Form onSubmit={handleSubmit} onAbort={handleOnCancel} className="flex flex-col w-full h-full p-10 dark:bg-gray-800">
                        <div className="flex h-full">
                            <div className="w-1/2 px-3">
                                <h1 className="text-[25px] font-bold mb-8 dark:text-white">Informacion del Video-Anuncio</h1>
                                <label htmlFor="company_name" className="dark:text-white">Nombre de la empresa</label>
                                <br />
                                <div className="border-2 border-[#0550AD] rounded-lg w-full h-10 dark:bg-gray-700 dark:text-white">
                                    <input
                                        type="text"
                                        value={companyText} // Controla el valor del input
                                        disabled={true} // Deshabilitado para evitar edición                                        
                                        placeholder="Ej. City Express"
                                        className="w-full h-full pl-4 dark:bg-gray-700" />
                                </div>
                                <br />
                                <label htmlFor="file_name" className="dark:text-white">Nombre del archivo</label>
                                <br />
                                <div className="border-2 border-[#0550AD] rounded-lg w-full h-10 dark:bg-gray-700 dark:text-white">
                                    <input type="text" name="file_name" defaultValue={videoName} placeholder="Nombre del archivo" className="w-full h-full pl-4 dark:bg-gray-700" />
                                </div>
                                <br />
                                <label htmlFor="repetitions_per_day" className="dark:text-white">Repeticiones por dia</label>
                                <br />
                                <div className="border-2 border-[#0550AD] rounded-lg w-1/2 h-10 cursor-pointer">
                                    <select value={selectedValue} onChange={handleChange} className="w-full h-full border-[#0550AD] pl-4 cursor-pointer dark:bg-gray-700 dark:text-white">
                                        <option value="">Selecciona una opción...</option> {/* Opción por defecto */}
                                        {options.map((option) => (
                                            <option key={option.value} value={option.value} className="cursor-pointer dark:bg-gray-700 dark:text-white">
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <br />
                                <label htmlFor="dateInput" className="dark:text-white">Fecha de Vencimiento</label>
                                <br />
                                <div className="border-2 border-[#0550AD] rounded-lg w-1/2 h-10">
                                    <input
                                        type="date"
                                        value={selectedDate} // El valor del input está controlado por el estado
                                        onChange={handleDateChange}
                                        disabled={true} // Deshabilitado para evitar selección manual
                                        className="w-full h-full pl-4 border border-gray-300 rounded-lg p-2 focus:outline-none dark:bg-gray-700 dark:text-white" /></div>
                                <br />
                                <label htmlFor="format_type" className="dark:text-white">Tipo de Formato</label>
                                <br />
                                <div className="border-2 border-[#0550AD] rounded-lg w-1/2 h-10">
                                    <select
                                        value={selectedFormat}
                                        onChange={handleFormatChange}
                                        className="w-full h-full pl-4 border-[#0550AD] cursor-pointer dark:bg-gray-700 dark:text-white">
                                        <option value="" className="cursor-pointer dark:bg-gray-700 dark:text-white">Selecciona una opción...</option> {/* Opción por defecto */}
                                        {optionsFormat.map((option) => (
                                            <option key={option.value} value={option.value} className="cursor-pointer dark:bg-gray-700 dark:text-white">
                                                {option.label}
                                            </option>
                                        ))}
                                    </select></div>
                            </div>

                            <div className="flex flex-col w-1/2 h-full justify-center items-center p-10">
                                {videoName != '' ?
                                    <ReactPlayer
                                        ref={playerRef}
                                        src={video?.url}
                                        playing={false}
                                        muted={false}
                                        controls={true}
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            aspectRatio: "16/9",
                                            borderRadius: "20px"
                                        }} /> :
                                    <></>
                                }
                                <h1 className="pt-5 font-semibold dark:text-white">Previsualizacion del video</h1>
                            </div>
                        </div>
                        <div className="flex gap-15 h-full justify-center items-end">
                            <button
                                className={`bg-gray-300 px-10 py-2 rounded-full shadow-lg hover:bg-gray-400 cursor-pointer transition duration-150 ease-in-out ${isAvailable}`}
                                type="button" onClick={handleOnCancel}>Cancelar</button>
                            <button
                                className="text-white bg-[#023672] px-10 py-2 rounded-full shadow-lg hover:bg-[#4185D4] cursor-pointer transition duration-150 ease-in-out"
                                type="submit">Subir archivo</button>
                        </div>
                    </Form>

                </div>
            }

        </div>
    )
}

export default AddAdsPage