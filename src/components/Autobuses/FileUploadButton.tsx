interface FileUploadButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export default function FileUploadButton({ onClick, disabled }: FileUploadButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="bg-[#023672] hover:bg-[#4185D4] px-8 py-2 rounded-lg text-white cursor-pointer transition-transform duration-200 hover:scale-102 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Subir
    </button>
  );
}