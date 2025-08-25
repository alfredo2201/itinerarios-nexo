import { useCallback, useRef, useState } from "react";
import ReactPlayer from "react-player";

import { useDropzone } from "react-dropzone";
import { Form, useNavigate } from "react-router";

function AddAdsPage() {
    const [formVisible, setFormVisible] = useState(true)
    const playerRef = useRef(null)
    const [videoName, setVideoName] = useState<File>();
    const navigate = useNavigate();

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setVideoName(acceptedFiles[0])
        setFormVisible(!formVisible)
        console.log(acceptedFiles[0])
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'video/mp4': ['.mp4']
        }
    })

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            // Simulación de envío (puedes reemplazar con una petición real)
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Marcar éxito en sessionStorage
            sessionStorage.setItem('formSuccess', 'true');

            // Redirigir
            navigate('/advertisement');
        } catch (error) {
            // Puedes también agregar una notificación de error aquí
            console.error(error);
        }

    }
    return (
        <div className=" flex justify-center h-9/10 w-full px-10">
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
                <div className="flex flex-col bg-white w-full h-full rounded-lg mt-10">
                    
                        <Form onSubmit={handleSubmit} className="flex flex-col w-full h-full p-10">
                            <div className="flex h-full">
                                <div className="w-1/2 px-3">
                                    <h1 className="text-[25px] font-bold mb-8">Informacion del Video-Anuncio</h1>
                                    <label htmlFor="">Nombre del archivo</label>
                                    <br />
                                    <div className="border-2 border-[#0550AD] rounded-lg w-full h-10 ">
                                        <input type="text" defaultValue={videoName?.name} id="" placeholder="Nombre del archivo" className="w-full h-full pl-4" />
                                    </div>
                                    <br />
                                    <label htmlFor="">Repeticiones por dia</label>
                                    <br />
                                    <div className="border-2 border-[#0550AD] rounded-lg w-1/2 h-10 cursor-pointer">
                                        <select name="" id="" className="w-full h-full border-[#0550AD] pl-4 cursor-pointer">
                                            <option value="">50</option>
                                            <option value="">100</option>
                                            <option value="">150</option>
                                            <option value="">200</option>
                                        </select>
                                    </div>
                                    <br />
                                    <label htmlFor="">Fecha de Vencimiento</label>
                                    <br />
                                    <div className="border-2 border-[#0550AD] rounded-lg w-1/2 h-10">
                                        <input type="date" name="" id="" className="w-full h-full pl-4 border border-gray-300 rounded-lg p-2 focus:outline-none" /></div>
                                    <br />
                                    <label htmlFor="">Tipo de Formato</label>
                                    <br />
                                    <div className="border-2 border-[#0550AD] rounded-lg w-1/2 h-10">
                                        <select name="" id="" className="w-full h-full pl-4">
                                            <option value="">16:9 Full-HD</option>
                                            <option value="">9:16 Full-HD</option>
                                            <option value="">21:9 Full-HD</option>
                                        </select></div>
                                </div>

                                <div className="flex flex-col w-1/2 h-full justify-center items-center p-10">
                                    {videoName?.name != '' ?
                                        <ReactPlayer
                                            ref={playerRef}
                                            src={videoName?.webkitRelativePath}
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
                                    <h1 className="pt-5 font-semibold">Previsualizacion del video</h1>
                                </div>
                            </div>
                            <div className="flex gap-15 h-full justify-center items-end">
                                <button className="bg-gray-300 px-10 py-2 rounded-full shadow-lg hover:bg-gray-400 cursor-pointer transition duration-150 ease-in-out" onClick={()=> navigate('/advertisement')}>Cancelar</button>
                                <button className="text-white bg-[#023672] px-10 py-2 rounded-full shadow-lg hover:bg-[#4185D4] cursor-pointer transition duration-150 ease-in-out" type="submit">Subir archivo</button>
                            </div>
                        </Form>

                    </div>            
            }

        </div>
    )
}

export default AddAdsPage