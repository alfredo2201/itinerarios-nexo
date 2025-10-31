import { useRef, useState } from "react";

interface FileUploadConfirmationProps {
  file: File;
  onSubmit: (date:string) => void;
  uploading: boolean;

}

export default function FileUploadConfirmation({ file, onSubmit, uploading }: FileUploadConfirmationProps) {
  const dateStart = useRef<HTMLInputElement>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
        <p className="font-bold mb-2">Archivo seleccionado:</p>
        <p>{file.name}</p>
        <p className="font-bold mt-2">Fecha de inicio </p>
        <div className="border-2 border-green-300 w-1/3 rounded-lg mt-2 p-2">
          <input
            ref={dateStart}
            value={selectedDate}
            onChange={handleDateChange}
            type="date"
            name="start"
            id="calendar-itinerary"
            className="w-full hover:cursor-pointer" />
        </div>
      </div>
      <button
        onClick={()=>{onSubmit(selectedDate)}}
        disabled={uploading}
        className="bg-[#023672] hover:bg-[#4185D4] px-8 py-2 rounded-lg text-white cursor-pointer transition-transform duration-200 hover:scale-102 inline-block self-center disabled:opacity-50"
        type="button"
      >
        {uploading ? 'Guardando...' : 'Guardar'}
      </button>
    </div>
  );
}