import { UserIcon } from "lucide-react";
import UserEditForm from "../../../components/Users/UserEditForm";

export default function EditUserPage() {
   
    return (
        <div className="h-full dark:bg-gray-900 p-6 " >
            <div className="max-w-6xl mx-auto">
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
                    <div className="bg-[#023672] dark:bg-gray-800 px-8 py-6">
                        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                            <UserIcon className="w-8 h-8" />
                            Editor de Usuarios
                        </h1>
                        <p className="text-blue-100 mt-2">Gestiona la información y permisos del usuario</p>
                    </div>
                    <UserEditForm></UserEditForm>                 
                </div>
            </div>
        </div>
    );
}