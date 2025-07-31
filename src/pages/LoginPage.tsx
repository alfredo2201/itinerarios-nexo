import LoginForm from "../components/Form/LoginForm";

function LoginPage() {
    return (
        <div className='h-screen bg-[#F2F4F7] flex flex-col items-center'>
            <div className="w-full bg-[#04386c] p-4 flex justify-between items-center text-white pe-8 justify-end">
                <div className="text-right text-sm">
                    <p className="font-sans text-lg font-bold">Central de autobuses</p>
                    <p className="font-sans text-lg font-bold">Faustino Félix Serna</p>
                </div>
            </div>
            <LoginForm />
        </div>
    )
}
export default LoginPage;