import { useState } from "react";
import UserForm from "../../../components/Users/UserForm";
import UserTable from "../../../components/Users/UserTable";

function UserPage() {

    const [showModal, setShowModal] = useState(false);


    return (
        <div className="h-full w-full p-8 space-y-3">
            <div className="flex gap-3">
                <div className="bg-[#023672] text-white h-10 hover:bg-gray-200 cursor-pointer rounded-lg  w-40 flex justify-center items-center">
                    <p  onClick={() => setShowModal(true)}>Nuevo Usuario</p>
                </div>
                <div className="bg-[#023672] text-white h-10 hover:bg-gray-200 cursor-pointer rounded-lg  w-40 flex justify-center items-center">
                    <p>Eliminar Usuario</p>
                </div>
            </div>
            <UserTable />
            <UserForm isOpen={showModal} onClose={() => setShowModal(false)} />
        </div>
    )

}

export default UserPage;