import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {  } from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { loginAPI } from '../../services/AuthService';
import { useUser } from '../../hooks/useUser';

type LoginFormValues = {
    username: string;
    password: string;
}

const validation = Yup.object().shape({
    username: Yup.string().required('El nombre de usuario es obligatorio'),
    password: Yup.string().required('La contraseña es obligatoria')
})

// Hook personalizado para manejar animaciones de entrada
const usePageAnimation = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoaded(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return isLoaded;
};

function LoginPage() {
    // Agrega el contexto de autenticación
    const { setUserContext } = useUser();
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({ resolver: yupResolver(validation) });
    const [isLoading, setIsLoading] = useState(false);
    const isLoaded = usePageAnimation();

    const handleLogin = async (form: LoginFormValues) => {
        setIsLoading(true);
        try {
            const user = await loginAPI({ email: form.username, password: form.password });        
            setUserContext(user);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className={`h-screen bg-[#F2F4F7] flex flex-col items-center transition-all duration-700`}>
            
                <div className={`w-full bg-[#04386c] p-4 flex justify-between items-center text-white pe-8 justify-end`}>
                    <div className="text-right text-sm">
                        <p className="font-sans text-lg font-bold">Central de autobuses</p>
                        <p className="font-sans text-lg font-bold">Faustino Félix Serna</p>
                    </div>
                </div>

                {/* Contenedor del formulario con animación de entrada desde abajo */}
                <div className={`flex-col bg-white p-8 rounded-md shadow-xl/30 mt-30 w-full max-w-lg transform transition-all duration-700 ${
                    isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`} style={{ transitionDelay: '0.2s' }}>
                    
                    <div className="">
                        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
                            
                            {/* Título con animación de fade in */}
                            <h2 className={`text-center text-xl font-[Arial] font-semibold mb-6 transform transition-all duration-500 ${
                                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                            }`} style={{ transitionDelay: '0.3s' }}>
                                Inicio de Sesión
                            </h2>
                            
                            {/* Campo Username con animación */}
                            <div className={`mb-4 transform transition-all duration-500 ${
                                isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                            }`} style={{ transitionDelay: '0.4s' }}>
                                <label htmlFor='username' className="block font-[Arial] text-sm mb-1">
                                    Correo Electrónico y/o Usuario
                                </label>
                                <input
                                    id="username"
                                    {...register('username')}
                                    type="text"
                                    autoComplete='username'
                                    placeholder="Ej. jorgegal_663@ejemplo.com"
                                    className="w-full px-3 py-2 border-2 border-[#D9D9D9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04386c] focus:border-[#04386c] transition-all duration-300 hover:border-[#04386c]/50 hover:shadow-sm"
                                />
                                {errors.username && (
                                    <p className="text-red-500 text-sm mt-1 animate-pulse">
                                        {errors.username.message}
                                    </p>
                                )}
                            </div>
                            
                            {/* Campo Password con animación */}
                            <div className={`mb-4 transform transition-all duration-500 ${
                                isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                            }`} style={{ transitionDelay: '0.5s' }}>
                                <label htmlFor='password' className="block font-[Arial] text-sm mb-1">
                                    Contraseña
                                </label>
                                <input
                                    id="password"
                                    {...register('password')}
                                    placeholder="********"
                                    type="password"
                                    autoComplete='current-password'
                                    className="w-full px-3 py-2 border-2 border-[#D9D9D9] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#04386c] focus:border-[#04386c] transition-all duration-300 hover:border-[#04386c]/50 hover:shadow-sm"
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-1 animate-pulse">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>
                            
                            {/* Botón de submit con animaciones y estados */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-2 rounded-lg font-semibold transform transition-all duration-500 ${
                                    isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                                } ${
                                    isLoading 
                                        ? 'bg-gray-400 cursor-not-allowed scale-100' 
                                        : 'bg-[#023672] hover:bg-blue-800 hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg'
                                } text-white`}
                                style={{ transitionDelay: '0.6s' }}
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Iniciando...</span>
                                    </div>
                                ) : (
                                    'Iniciar Sesión'
                                )}
                            </button>
                            
                            {/* Link de contraseña olvidada con animación */}
                            <div className={`mt-4 text-sm text-start transform transition-all duration-500 ${
                                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                            }`} style={{ transitionDelay: '0.7s' }}>
                                <a 
                                    href="#" 
                                    className="text-black hover:underline hover:text-[#04386c] transition-colors duration-200"
                                >
                                    ¿Ha olvidado su contraseña?
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LoginPage;