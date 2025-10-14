
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

function NotFoundPage() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [countdown, setCountdown] = useState(10);

    // Verificar si el usuario está loggeado
    useEffect(() => {
        // Aquí puedes adaptar la lógica según tu sistema de autenticación
        // Ejemplo: verificar token, localStorage, context, etc.
        const token = localStorage.getItem('authToken');
        const user = localStorage.getItem('user');
        setIsLoggedIn(!!(token && user));
    }, []);

    // Countdown para redirección automática
    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    // Redirigir automáticamente después del countdown
                    navigate(isLoggedIn ? '/dashboard' : '/login');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate, isLoggedIn]);

    const handleGoHome = () => {
        navigate(isLoggedIn ? '/dashboard' : '/login');
    };

    const handleGoBack = () => {
        navigate(-1); // Volver a la página anterior
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
                {/* Ilustración 404 */}
                <div className="mb-6">
                    <div className="text-8xl font-bold text-indigo-500 mb-2">404</div>
                    <div className="text-6xl">🔍</div>
                </div>

                {/* Título y descripción */}
                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                    ¡Página no encontrada!
                </h1>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                    Lo sentimos, la página que buscas no existe o ha sido movida. 
                    Puede que hayas escrito mal la URL o que el enlace esté obsoleto.
                </p>

                {/* Información de redirección automática */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-700">
                        Serás redirigido automáticamente a{' '}
                        <span className="font-semibold text-indigo-600">
                            {isLoggedIn ? 'tu dashboard' : 'la página de login'}
                        </span>{' '}
                        en <span className="font-bold text-indigo-500">{countdown}</span> segundos
                    </p>
                </div>

                {/* Botones de navegación */}
                <div className="space-y-3">
                    <button
                        onClick={handleGoHome}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-105"
                    >
                        {isLoggedIn ? '🏠 Ir al Dashboard' : '🔑 Ir al Login'}
                    </button>

                    <button
                        onClick={handleGoBack}
                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition duration-200"
                    >
                        ← Volver atrás
                    </button>
                </div>

                {/* Enlaces adicionales */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-sm text-gray-500 mb-3">¿Necesitas ayuda?</p>
                    <div className="flex justify-center space-x-4 text-sm">
                        <Link 
                            to="/help" 
                            className="text-indigo-600 hover:text-indigo-800 underline"
                        >
                            Centro de ayuda
                        </Link>
                        <Link 
                            to="/contact" 
                            className="text-indigo-600 hover:text-indigo-800 underline"
                        >
                            Contacto
                        </Link>
                    </div>
                </div>

                {/* Información adicional */}
                <div className="mt-6 text-xs text-gray-400">
                    Error 404 - Página no encontrada
                </div>
            </div>
        </div>
    );
}

export default NotFoundPage;