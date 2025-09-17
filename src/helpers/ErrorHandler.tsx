import axios from "axios";
import toast from "react-hot-toast";

export const handleError = async (error: unknown) => {
    if (axios.isAxiosError(error)) {
        // Handle Axios errors
        console.error("Axios error:", error.message);
        if (error.response) {
            // The request was made and the server responded with a status code
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
            console.error("Response headers:", error.response.headers);
            toast.error(`Error: ${error.response.data.message || "Ha ocurrido un error"}`);
        } else if (error.request) {
            // The request was made but no response was received
            console.error("Request data:", error.request);
            toast.error("No response received from the server.");
        } else if(error?.status == 401){
            toast.error("Acceso no autorizado. Por favor, inicie sesión.");
            window.history.pushState({},"LoginPage","/login");
        }
    } else {
        // Handle other types of errors
        console.error("!!! Sucedio algun error:", error);
        toast.error("Ha ocurrido un error 2.");
    }
}