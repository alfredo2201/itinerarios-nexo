import LoginForm from '../../components/Login/LoginForm';
import { usePageAnimation } from '../../hooks/usePageAnimation';

const COMPANY_TYPE = import.meta.env.VITE_COMPANY_TYPE!
const COMPANY_NAME = import.meta.env.VITE_COMPANY_NAME!

function LoginPage() {
    const isLoaded = usePageAnimation();

    return (
        <>
            <div className={`h-screen bg-[#F2F4F7] dark:bg-gray-900 flex flex-col items-center transition-all duration-700`}>

                <div className={`w-full bg-[#04386c] dark:bg-[#04386c] p-4 flex justify-between items-center text-white pe-8 justify-end`}>
                    <div className="text-right text-sm">
                        <p className="font-sans text-lg font-bold">{COMPANY_TYPE}</p>
                        <p className="font-sans text-lg font-bold">{COMPANY_NAME}</p>
                    </div>
                </div>

                {/* Contenedor del formulario con animación de entrada desde abajo */}
                <div className='w-full h-full bg-white dark:bg-gray-900 flex justify-center items-center px-4 py-8'>
                    <div className={`flex-col bg-white dark:bg-gray-800 p-8 rounded-md shadow-xl/30 w-full max-w-lg transform transition-all duration-700 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                        }`} style={{ transitionDelay: '0.2s' }}>

                        <div className="">
                            <LoginForm isLoaded={isLoaded} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginPage;