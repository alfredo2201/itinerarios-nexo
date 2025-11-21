import { ALLOWED_FILE_TYPES } from "../../../types/types";
import FileUploadButton from "../../Autobuses/FileUploadButton";

interface TransportHeaderProps {
    logo: string;
    canEdit: boolean;
    uploading: boolean;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
    onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onOpenFilePicker: () => void;
}

function TransportHeader({ 
    logo, 
    canEdit, 
    uploading, 
    fileInputRef, 
    onFileChange, 
    onOpenFilePicker 
}: TransportHeaderProps) {
    return (
        <div className="my-3 flex justify-center justify-start sm:justify-between px-7">
            <img src={logo} alt="Company Logo" className="h-10 2xl:h-15" />
            {canEdit && (
                <>
                    <FileUploadButton onClick={onOpenFilePicker} disabled={uploading} />
                    <input
                        className="hidden"
                        ref={fileInputRef}
                        onChange={onFileChange}
                        type="file"
                        accept={ALLOWED_FILE_TYPES.join(', ')}
                    />
                </>
            )}
        </div>
    );
}

export default TransportHeader;