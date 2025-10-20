import { useRef, useState } from "react";
import { saveItineraryForCompany } from "../services/ItineraryService";
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from "../interfaces/types";

export default function useFileUpload(companyId: string, onSuccess: () => void) {
  const [file, setFile] = useState<File | null>(null);  
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): { valid: boolean; error?: string } => {
    if (!ALLOWED_FILE_TYPES.includes(file.type as typeof ALLOWED_FILE_TYPES[number])) {
      return { valid: false, error: 'Tipo de archivo no válido' };
    }
    if (file.size > MAX_FILE_SIZE) {
      return { valid: false, error: 'El archivo es demasiado grande (máx. 10MB)' };
    }
    return { valid: true };
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    const validation = validateFile(selectedFile);
    if (!validation.valid) {
      alert(validation.error);
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = async (date:string) => {
    if (!file) {
      alert('No hay ningún archivo seleccionado');
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append('company', companyId);
      formData.append('itineraries', file);
      formData.append('startDate', date);

      const response = await saveItineraryForCompany(formData);

      if (response.message === 'Datos guardado exitosamente') {
        alert('Itinerarios guardados exitosamente');
        setFile(null);
        onSuccess();
      } else {
        alert('Error al guardar los itinerarios');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error al guardar los itinerarios');
    } finally {
      setUploading(false);
    }
  };

  const openFilePicker = () => fileInputRef.current?.click();

  return {
    file,
    uploading,
    fileInputRef,
    handleFileChange,
    handleSubmit,
    openFilePicker,    
  };
}