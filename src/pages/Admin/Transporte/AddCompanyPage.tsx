import { useRef, useState } from "react";
import { Form, useNavigate } from "react-router";

function BusAddPage() {
    const fileInputLogo = useRef<HTMLInputElement | null>(null)
    const fileInputItinerarios = useRef<HTMLInputElement | null>(null)
    const [fileLogoName, setFileLogoName] = useState<string>("Sin Archivos seleccionados");
    const [fileItinerarioName, setFileItinerarioName] = useState<string>("Sin Archivos seleccionados");
    const [fileItinerario,setFileItinerario]= useState<File | null>(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | undefined>(undefined);
    const navigate = useNavigate();

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith("image/")) {
            const imageUrl = URL.createObjectURL(file);
            setImagePreviewUrl(imageUrl);
            setFileLogoName(file.name);
        } else {
            setImagePreviewUrl(undefined);
        }
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];        
        if (file && (file.type.startsWith("text/") || file.type === "application/vnd.ms-excel" || file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")) {            
            setFileItinerarioName(file.name);
            setFileItinerario(file);
        } else if (file) {
            setFileItinerarioName(file.name);
        } else {
            setImagePreviewUrl(undefined);
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const formData = new FormData(event.currentTarget);
            formData.append('logo', fileInputLogo.current?.files?.[0] || '');
            formData.append('itinerarios', fileItinerario || ''); 
            console.log(fileItinerario);                      
            // Simulación de envío (puedes reemplazar con una petición real)            
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Marcar éxito en sessionStorage
            sessionStorage.setItem('formSuccess', 'true');

            // Redirigir
            navigate('/dashboard/transports_info');
        } catch (error) {
            // Puedes también agregar una notificación de error aquí
            console.error(error);
        }

    }
    return (
        <div className="flex items-center justify-center w-full h-full">
            <div className="flex flex-col bg-white w-3/4 h-3/4 gap-4 items-center font-[roboto] rounded-lg shadow-lg">
                <h1 className="text-[#0A3871] text-[35px] font-bold p-10">Agregar Compañia de Trasnporte</h1>
                <Form onSubmit={handleSubmit} className="flex flex-col gap-2 px-8 w-8/9 h-full">
                    <label htmlFor="nombre_autobus">Nombre de Linea de Transporte</label>
                    <input
                        placeholder="Ej. Autobuses del Pacifico"
                        className="w-full py-3 px-4 border-1 border-[#D9D9D9] rounded flex items-center gap-4 shadow-sm"
                        type="text"
                        name=""
                        id="nombre_autobus" />
                    <p>Logo</p>
                    <div className="w-full min-w-40 p-2 border-1 border-[#D9D9D9] rounded flex items-center gap-4 shadow-sm">
                        <button
                            type="button"
                            onClick={() => fileInputLogo.current?.click()}
                            className="w-50 cursor-pointer bg-white text-black text-center text-[13px] font-semibold px-4 py-2 rounded-full shadow hover:shadow-md transition">
                            Seleccionar archivo
                        </button>
                        <span className="text-gray-400 text-[12px]">{fileLogoName}</span>
                        <img src={imagePreviewUrl} className="h-8 " />
                        <input
                            ref={fileInputLogo}
                            onChange={(e) => handleImageChange(e)}
                            id="archivo"
                            type="file"
                            className="hidden"
                            accept="image/png, image/jpeg, image/jpg" />
                    </div>
                    <p>Itinerarios</p>
                    <div className="w-full p-2 border-1 border-[#D9D9D9] rounded flex items-center gap-4 shadow-sm">
                        <button
                            type="button"
                            onClick={() => fileInputItinerarios.current?.click()}
                            className=" w-50 cursor-pointer bg-white text-black text-center text-[13px] font-semibold px-4 py-2 rounded-full shadow hover:shadow-md transition">
                            Seleccionar archivo
                        </button>
                        <span className="text-gray-400 text-[12px]">{fileItinerarioName}</span>
                        <input
                            ref={fileInputItinerarios}
                            onChange={(e) => handleFileChange(e)}
                            id="archivo"
                            type="file"
                            className="hidden"
                            accept="text/csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" />
                    </div>
                    <div className="flex flex-row w-full pt-10 px-7 justify-between">
                        <button className="bg-[#CCCCCC] hover:bg-[#A6A5A5] cursor-pointer  w-1/6 h-10 min-w-20 rounded-full justify-items-start transition duration-150 ease-in-out"
                            onClick={() => navigate('/bus_info')}>Cancelar</button>
                        <button className="bg-[#023672] hover:bg-[#0251B3] cursor-pointer text-white w-1/6 h-10 min-w-20 rounded-full justify-end transition duration-150 ease-in-out"
                            type="submit"
                            value="Agregar">Guardar</button>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default BusAddPage;