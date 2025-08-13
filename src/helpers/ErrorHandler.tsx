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
            toast.error(`Error: ${error.response.data.message || "An error occurred"}`);
        } else if (error.request) {
            // The request was made but no response was received
            console.error("Request data:", error.request);
            toast.error("No response received from the server.");
        } else if(error?.status == 401){
            toast.error("Unauthorized access. Please log in again.");
            window.history.pushState({},"LoginPage","/login");
        }
    } else {
        // Handle other types of errors
        console.error("Unexpected error:", error);
        toast.error("An unexpected error occurred.");
    }
}