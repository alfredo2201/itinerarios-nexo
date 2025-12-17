import { useCallback, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useDropzone } from "react-dropzone";
import { Form, useNavigate } from "react-router";
import { addNewVideo, createAdvertisement } from "../../../services/AdvertismentsService";
import type { VideoData, SelectOption } from "../../../types/types";
import Swal from 'sweetalert2'
import type { Advertisement } from "../../../models/Advertisement";
import { useUser } from "../../../hooks/useUser";
import toast from "react-hot-toast";

function AddAdsPage() {
    const { user } = useUser()
    const [formVisible, setFormVisible] = useState(true)
    const playerRef = useRef(null)
    const [isAvailable, setIsAvailable] = useState('pointer-events-none')

    // Estados para la barra de progreso
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    //Estados del formulario    
    const [companyText, setCompanyText] = useState<string>('');
    const [videoName, setVideoName] = useState<string | undefined>();
    const [video, setVideo] = useState<File>();
    const [previewUrl, setPreviewUrl] = useState<string>()
    // Estado para el valor seleccionado
    const [selectedValue, setSelectedValue] = useState<number>(0);
    // Estado para almacenar la fecha seleccionada. Inicialmente vacío.
    const [selectedDate, setSelectedDate] = useState<string>('');
    // Estado para el valor seleccionado
    const [selectedFormat, setSelectedFormat] = useState<string>('');

    // Estados para los errores de validación
    const [errors, setErrors] = useState({
        company: false,
        repetitions: false,
        format: false
    });

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
    const controller = new AbortController();
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];

        setFormVisible(false);
        setVideoName(file.name);

        // Crear URL temporal para previsualización inmediata
        const tempUrl = URL.createObjectURL(file);
        setPreviewUrl(tempUrl);
        setVideo(file);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'video/mp4': ['.mp4']
        }
    })

    // Función que maneja el cambio en el select de repeticiones
    const handleChangeCompanyText = (e?: React.ChangeEvent<HTMLSelectElement>) => {
        if (e) {
            setCompanyText(e.target.value);
            setErrors(prev => ({ ...prev, company: false }));
        } else {
            setCompanyText(user?.empresaInfo.empresa || '');
        }
    };
    
    // Función que maneja el cambio en el select de repeticiones
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedValue(parseInt(e.target.value, 10));
        setErrors(prev => ({ ...prev, repetitions: false }));
    };

    // Función que maneja el cambio en el select de formatos
    const handleFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedFormat(e.target.value);
        setErrors(prev => ({ ...prev, format: false }));
    };
    
    //Funcion que maneha el cambio en el imput del nombre del video
    const handleVideoNameChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setVideoName(e.target.value)
    }
    
    // Manejador para el evento de cambio en el input de fecha.
    const handleDateChange = () => {
        const dateObj = new Date().setMonth(new Date().getMonth() + 1);
        const date = new Date(dateObj);

        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        setSelectedDate(formattedDate);
    };

    const validateForm = () => {
        const newErrors = {
            company: (user?.empresaInfo.empresas_permitidas.length || 0) > 0 && !companyText,
            repetitions: selectedValue === 0,
            format: !selectedFormat
        };

        setErrors(newErrors);

        // Retorna true si no hay errores
        return !Object.values(newErrors).some(error => error);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validar el formulario
        if (!validateForm()) {
            toast.error(
                <span>
                    <b>Campos incompletos</b>
                    <p>Por favor completa todos los campos requeridos</p>
                </span>,
                {
                    duration: 4000,
                    position: "top-right"
                }
            );
            return;
        }

        // Activar la barra de progreso
        setIsUploading(true);
        setUploadProgress(0);

        // Simular progreso
        const progressInterval = setInterval(() => {
            setUploadProgress(prev => {
                if (prev >= 90) {
                    clearInterval(progressInterval);
                    return 90;
                }
                return prev + 10;
            });
        }, 300);

        // Subir a Cloudinary con signal
        addNewVideo(video!, controller.signal)
            .then((response: VideoData) => {
                if (response != undefined) {
                    setUploadProgress(100);

                    // Liberar URL temporal
                    URL.revokeObjectURL(previewUrl!);
                    setPreviewUrl(undefined);
                    try {
                        if (videoName != undefined) {
                            const ads: Advertisement = {
                                companyName: companyText,
                                fileName: videoName,
                                URL: response.video.url,
                                repetitions: selectedValue,
                                expiration: new Date(selectedDate),
                                format: selectedFormat,
                                status: 'active'
                            }
                            createAdvertisement(ads).then((result) => {
                                setTimeout(() => {
                                    setIsUploading(false);
                                    setUploadProgress(0);
                                }, 500);

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
                        clearInterval(progressInterval);
                        setIsUploading(false);
                        setUploadProgress(0);

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
            })
            .catch((error) => {
                clearInterval(progressInterval);
                setIsUploading(false);
                setUploadProgress(0);

                if (error.message === 'Upload cancelled' ||
                    error.name === 'AbortError' ||
                    error.name === 'CanceledError') {
                    console.log('Subida cancelada por el usuario');
                    toast.error('Subida cancelada', {
                        duration: 3000,
                        position: "top-right"
                    });
                } else {
                    console.error('Error al subir:', error);
                    toast.error('Error al subir el video', {
                        duration: 3000,
                        position: "top-right"
                    });
                }
            })
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
                    navigate('/dashboard/advertisement');
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
        setIsAvailable('pointer-events-auto')
        handleDateChange();
        handleChangeCompanyText();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const handleBackButton = (event: PopStateEvent) => {
            event.preventDefault()
        };
        window.history.pushState(null, '', window.location.href);
        window.addEventListener('popstate', handleBackButton);
        return () => {
            window.removeEventListener('popstate', handleBackButton);
        };
    }, []);

    return (
        <div className="flex justify-center h-14/15 w-full px-10">
            {formVisible ?
                <div className="bg-[#ADC2D9] w-full sm:w-3/4 h-3/4 rounded-lg self-center" {...getRootProps()}>
                    <div className="w-full h-1/8 py-5 px-10 "><h1 className="text-[#023672] text-[18px] font-bold">Subir Video</h1></div>
                    <div className="flex items-center justify-center w-full h-5/8">
                        <div className="bg-[#859DBD] h-50 w-50 rounded-full flex justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width={128} height={128} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-upload"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 9l5 -5l5 5" /><path d="M12 4l0 12" /></svg>
                        </div>
                    </div>
                    <div className="flex flex-col w-full gap-2 h-2/8 items-center justify-center pb-5 px-5 text-center" >
                        {
                            isDragActive ?
                                <h1 className="text-white h-1/2">Suelta el archivo....</h1> :
                                <h1 className="text-white h-1/2">Arrastra y suelta archivos de video para subirlos</h1>
                        }

                        <button className="bg-[#023672] text-white text-[14px] h-13 px-2 text-center rounded-xl hover:bg-[#4185D4] cursor-pointer transition duration-150 ease-in-out" type="button">
                            <p>Seleccionar archivos</p>
                        </button>
                        <input {...getInputProps()} />
                    </div>
                </div>
                :
                <div className="flex flex-col w-full h-220 sm:h-full mt-10 rounded-xl relative">

                    {/* Overlay con barra de progreso centrada */}
                    {isUploading && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center rounded-xl">
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl w-96">
                                <h3 className="text-xl font-bold mb-4 text-center dark:text-white">Subiendo video...</h3>
                                <div className="bg-gray-200 rounded-full h-6 dark:bg-gray-700 overflow-hidden">
                                    <div
                                        className="bg-blue-600 h-full rounded-full transition-all duration-300 ease-out flex items-center justify-center"
                                        style={{ width: `${uploadProgress}%` }}
                                    >
                                        <span className="text-sm font-semibold text-white">
                                            {uploadProgress}%
                                        </span>
                                    </div>
                                </div>
                                <p className="text-center mt-4 text-gray-600 dark:text-gray-400 text-sm">
                                    Por favor espera mientras se completa la subida...
                                </p>
                            </div>
                        </div>
                    )}

                    <Form onSubmit={handleSubmit} onAbort={handleOnCancel} className="flex flex-col h-full p-3 sm:p-10 dark:bg-gray-800 rounded-xl">
                        <div className="flex flex-col sm:flex-row h-full">
                            <div className="w-full sm:w-1/2 px-3">
                                <h1 className="text-[25px] font-bold mb-8 dark:text-white">Informacion del Video-Anuncio</h1>
                                <label htmlFor="company_name" className="dark:text-white text-[13px]">
                                    Nombre de la empresa {(user?.empresaInfo.empresas_permitidas.length || 0) > 0 && <span className="text-red-500">*</span>}
                                </label>
                                <br />
                                <div className={`border-2 ${errors.company ? 'border-red-500' : 'border-[#0550AD]'} rounded-lg w-full h-10 dark:bg-gray-700 dark:text-white`}>
                                    {(user != undefined && user?.empresaInfo.empresas_permitidas.length > 0) ?
                                        <select 
                                            name="company_name" 
                                            id="company_name" 
                                            value={companyText}
                                            onChange={handleChangeCompanyText}
                                            className="w-full h-full border-[#0550AD] pl-4 cursor-pointer dark:bg-gray-700 dark:text-white">
                                            <option value="">Selecciona una opción...</option>
                                            {user?.empresaInfo.empresas_permitidas.map((option) => (
                                                <option key={option} value={option} className="cursor-pointer rounded-lg w-full dark:bg-gray-700 dark:text-white">
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                        : <input
                                            type="text"
                                            id="company_name"
                                            value={companyText}
                                            disabled={true}                                       
                                            placeholder="Ej. City Express"
                                            className="w-full h-full pl-4 dark:bg-gray-700" />
                                    }
                                </div>
                                {errors.company && <p className="text-red-500 text-xs mt-1">Selecciona una empresa</p>}
                                <br />
                                <label htmlFor="file_name" className="dark:text-white">Nombre del archivo</label>
                                <br />
                                <div className="border-2 border-[#0550AD] rounded-lg w-full h-10 dark:bg-gray-700 dark:text-white">
                                    <input type="text" name="file_name" id="file_name" defaultValue={videoName} onChange={handleVideoNameChange} placeholder="Nombre del archivo" className="w-full h-full pl-4 dark:bg-gray-700" />
                                </div>
                                <br />
                                <label htmlFor="repetitions_per_day" className="dark:text-white">
                                    Repeticiones por dia <span className="text-red-500">*</span>
                                </label>
                                <br />
                                <div className={`border-2 ${errors.repetitions ? 'border-red-500' : 'border-[#0550AD]'} rounded-lg w-1/2 h-10 cursor-pointer`}>
                                    <select value={selectedValue} onChange={handleChange} id="repetitions_per_day" className="w-full h-full border-[#0550AD] pl-4 cursor-pointer dark:bg-gray-700 dark:text-white">
                                        <option value="0">Selecciona una opción...</option>
                                        {options.map((option) => (
                                            <option key={option.value} value={option.value} className="cursor-pointer dark:bg-gray-700 dark:text-white">
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {errors.repetitions && <p className="text-red-500 text-xs mt-1">Selecciona el número de repeticiones</p>}
                                <br />
                                <label htmlFor="dateInput" className="dark:text-white">Fecha de Vencimiento</label>
                                <br />
                                <div className="border-2 border-[#0550AD] rounded-lg w-1/2 h-10">
                                    <input
                                        type="date"
                                        id="dateInput"
                                        value={selectedDate}
                                        onChange={handleDateChange}
                                        disabled={true}
                                        className="w-full h-full pl-4 border border-gray-300 rounded-lg p-2 focus:outline-none dark:bg-gray-700 dark:text-white" />
                                </div>
                                <br />
                                <label htmlFor="format_type" className="dark:text-white">
                                    Tipo de Formato <span className="text-red-500">*</span>
                                </label>
                                <br />
                                <div className={`border-2 ${errors.format ? 'border-red-500' : 'border-[#0550AD]'} rounded-lg w-1/2 h-10`}>
                                    <select
                                        value={selectedFormat}
                                        id="format_type"
                                        onChange={handleFormatChange}
                                        className="w-full h-full pl-4 border-[#0550AD] cursor-pointer dark:bg-gray-700 dark:text-white">
                                        <option value="" className="cursor-pointer dark:bg-gray-700 dark:text-white">Selecciona una opción...</option>
                                        {optionsFormat.map((option) => (
                                            <option key={option.value} value={option.value} className="cursor-pointer dark:bg-gray-700 dark:text-white">
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                {errors.format && <p className="text-red-500 text-xs mt-1">Selecciona un formato</p>}
                            </div>

                            <div className="flex flex-col w-full sm:w-1/2 h-full justify-center items-center p-10">
                                {videoName != '' ?
                                    <ReactPlayer
                                        ref={playerRef}
                                        src={previewUrl}
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
                        <div className="flex gap-2 sm:gap-15 h-full justify-center items-end">
                            <button
                                className={`bg-gray-300 px-10 w-1/2 py-2 rounded-full shadow-lg hover:bg-gray-400 cursor-pointer transition duration-150 ease-in-out ${isAvailable} ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                type="button"
                                onClick={handleOnCancel}
                                disabled={isUploading}>Cancelar</button>
                            <button
                                className={`text-white bg-[#023672] w-1/2 px-10 py-2 rounded-full shadow-lg hover:bg-[#4185D4] cursor-pointer transition duration-150 ease-in-out ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                type="submit"
                                disabled={isUploading}>Subir</button>
                        </div>
                    </Form>

                </div>
            }

        </div>
    )
}

export default AddAdsPage