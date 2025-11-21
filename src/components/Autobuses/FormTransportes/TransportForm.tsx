import { useRef, useState } from "react";
import { Form, useNavigate } from "react-router";
import { insertNewCompanyAndInfo } from "../../../services/CompanyService";
import toast from "react-hot-toast";

export default function TransportForm() {
    const fileInputLogo = useRef<HTMLInputElement | null>(null)
    const fileInputItinerarios = useRef<HTMLInputElement | null>(null)
    const inputName = useRef<HTMLInputElement | null>(null)
    const inputWebPage = useRef<HTMLInputElement | null>(null)
    const inputNumberContact = useRef<HTMLInputElement | null>(null)
    const [fileLogoName, setFileLogoName] = useState<string>("Sin Archivos seleccionados");
    const [fileItinerarioName, setFileItinerarioName] = useState<string>("Sin Archivos seleccionados");
    const [fileItinerario, setFileItinerario] = useState<File | null>(null);
    const [imagePreviewUrl, setImagePreviewUrl] = useState<string | undefined>(undefined);
    const [selectedSuscripcion, setSelectedSuscripcion] = useState<string>("");
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
            formData.append('company_name', inputName.current?.value || '')
            formData.append('company_logo', fileInputLogo.current?.files?.[0] || '');
            formData.append('itineraries', fileItinerario || '');
            formData.append('web_page', inputWebPage.current?.value || '');
            formData.append('contact_number', inputNumberContact.current?.value || '');

            // Simulación de envío (puedes reemplazar con una petición real)
            console.log('Datos enviados:', Object.fromEntries(formData));
            insertNewCompanyAndInfo(formData).then((response) => {
                if (response.message === 'Compañía creada exitosamente') {
                    // Marcar éxito en sessionStorage
                    toast.success('Compañía creada exitosamente');
                    // Redirigir
                    navigate('/dashboard/transports_info');
                } else {
                    toast.error('Error al crear la compañía');
                    navigate('/dashboard/transports_info');
                }
            })

        } catch (error) {
            toast.error('Algo salió mal al crear la compañía');
            console.error(error);
        }

    }
    return (
        <Form onSubmit={handleSubmit} className="flex flex-col gap-2 px-8 w-8/9 h-full">
            <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-2">
                    <label htmlFor="nombre_autobus" className="dark:text-white">Nombre de L&iacute;nea de Transporte</label>
                    <input
                        ref={inputName}
                        placeholder="Ej. Autobuses del Pacifico"
                        className="w-full py-3 px-4 border-1 border-[#D9D9D9] rounded flex items-center gap-4 shadow-sm dark:bg-gray-700 dark:text-white"
                        type="text"
                        name=""
                        id="nombre_autobus" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="pag_web" className="dark:text-white">P&aacute;gina web</label>
                    <input
                        ref={inputWebPage}
                        placeholder="Ej. www.autobusesdelpacifico.com"
                        className="w-full py-3 px-4 border-1 border-[#D9D9D9] rounded flex items-center gap-4 shadow-sm dark:bg-gray-700 dark:text-white"
                        type="text"
                        name=""
                        id="pag_web" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="contact_number" className="dark:text-white">N&uacute;mero de atenci&oacute;n al cliente</label>
                    <input
                        ref={inputNumberContact}
                        placeholder="+52 123 456 7890"
                        className="w-full py-3 px-4 border-1 border-[#D9D9D9] rounded flex items-center gap-4 shadow-sm dark:bg-gray-700 dark:text-white"
                        type="text"
                        name=""
                        id="contact_number" />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="suscription" className="dark:text-white">Suscripci&oacute;n</label>
                    <select
                        className="w-full py-3 px-4 border-1 border-[#D9D9D9] rounded flex items-center gap-4 shadow-sm cursor-pointer dark:bg-gray-700 dark:text-white"
                        name="suscription"
                        id="suscription"
                        value={selectedSuscripcion}
                        onChange={(e) => setSelectedSuscripcion(e.target.value)}>
                        <option value="" className="dark:text-white cursor-pointer">Seleccionar suscripci&oacute;n</option>
                        <option value="basica" className="dark:text-white cursor-pointer">B&aacute;sica</option>
                        <option value="premium" className="dark:text-white cursor-pointer">Premium</option>
                        <option value="empresarial" className="dark:text-white cursor-pointer">Empresarial</option>
                    </select>
                </div>
            </div>
            <label className="dark:text-white">Logo</label>
            <div className="w-full min-w-40 p-2 border-1 border-[#D9D9D9] rounded flex items-center gap-4 shadow-sm dark:bg-gray-700">
                <button
                    type="button"
                    onClick={() => fileInputLogo.current?.click()}
                    className="w-50 cursor-pointer bg-white text-black text-center text-[13px] font-semibold px-4 py-2 rounded-full shadow hover:shadow-md transition dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white">
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
            <label className="dark:text-white">Itinerarios</label>
            <div className="w-full p-2 border-1 border-[#D9D9D9] rounded flex items-center gap-4 shadow-sm dark:bg-gray-700">
                <button
                    type="button"
                    onClick={() => fileInputItinerarios.current?.click()}
                    className=" w-50 cursor-pointer bg-white text-black text-center text-[13px] font-semibold px-4 py-2 rounded-full shadow hover:shadow-md transition dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white">
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
                <button className="bg-gray-300 hover:bg-gray-100 cursor-pointer  w-1/6 h-10 min-w-20 rounded-full justify-items-start transition duration-150 ease-in-out"
                    onClick={() => navigate('/dashboard/transports_info')}>Cancelar</button>
                <button className="bg-[#023672] hover:bg-[#0251B3] cursor-pointer text-white w-1/6 h-10 min-w-20 rounded-full justify-end transition duration-150 ease-in-out"
                    type="submit"
                    value="Agregar">Guardar</button>
            </div>
        </Form>
    )
}