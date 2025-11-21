import { Outlet } from "react-router";
import BoxAsidebar from "../../components/BoxSidebar/BoxAsidebar";
import { useUser } from "../../hooks/useUser";
import { logoutAPI } from "../../services/AuthService";
import useDashboardAnimation from "../../hooks/UseDashboardAnimation";
import Header from "../../components/MainLayout/Header";
import { useUserPermissions } from "../../hooks/useUserPermissions";
import { infoAdmin, infoDisplay, infoUsers } from "../../constants/navegation.constants";

const navAdmin = infoDisplay.map(item =>
    <BoxAsidebar key={item.url} title={item.title} url={item.url} pathIcon={item.icon} />
)
const navItinerario = infoAdmin.map(item =>
    <BoxAsidebar key={item.url} title={item.title} url={item.url} pathIcon={item.icon} />
)

function MainLayout() {
    const { isAdmin } = useUserPermissions()
    const { setUserContext } = useUser();
    const { isLoaded, sidebarVisible, contentVisible } = useDashboardAnimation();
    const handleLogout = async () => {
        await logoutAPI().then(
            () => {
                setTimeout(() => {
                    setUserContext(undefined);
                    window.location.href = '/';
                }, 100);
            }
        );
    }



    return (
        <div className={`flex min-h-screen dark:bg-gray-900 flex-row transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'
            }`}>

            {/* Sidebar con animación de entrada desde la izquierda */}
            <div className={`sticky w-auto transition-all duration-500 ${sidebarVisible
                ? 'translate-x-0 opacity-100'
                : '-translate-x-full opacity-0'
                } hidden lg:block`}>
                <aside
                    id="logo-sidebar"
                    className="top-0 left-0 z-40 w-60 h-screen pt-20 border-r border-gray-600 bg-[#023672]"
                    aria-label="Sidebar"
                >
                    <div className="w-auto px-3 pb-4 overflow-y-auto bg-[#023672]">

                        {/* Sección Admin con animación escalonada */}
                        <div className={`transform transition-all duration-500 ${sidebarVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                            }`} style={{ transitionDelay: '0.1s' }}>
                            <ul className="space-y-2 font-medium">
                                {navAdmin}
                            </ul>
                        </div>

                        <hr className={`h-px my-4 bg-white border-0 dark:bg-white transition-all duration-300 ${sidebarVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                            }`} style={{ transitionDelay: '0.2s' }} />

                        {/* Sección Administrar */}
                        <div className={`transform transition-all duration-500 ${sidebarVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                            }`} style={{ transitionDelay: '0.3s' }}>
                            <p className="text-white font-medium p-2">Administrar</p>
                            <ul className="space-y-2 font-medium">
                                {navItinerario}
                            </ul>
                        </div>

                        <hr className={`h-px my-4 bg-white border-0 dark:bg-white transition-all duration-300 ${sidebarVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                            }`} style={{ transitionDelay: '0.4s' }} />

                        {/* Sección Usuarios */}
                        {isAdmin && (
                            <div className={`transform transition-all duration-500 ${sidebarVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                                }`} style={{ transitionDelay: '0.5s' }}>
                                <p className="text-white font-medium p-2">Usuarios</p>
                                <ul>
                                    {
                                        infoUsers.map(item =>
                                            <BoxAsidebar key={item.url} title={item.title} url={item.url} pathIcon={item.icon} />
                                        )
                                    }
                                </ul>
                            </div>
                        )}
                    </div>
                </aside>
            </div>

            {/* Contenedor de la segunda columna */}
            <div className="h-screen w-full flex-1 bg-white dark:bg-gray-900">
                {/* Header con overflow visible */}
                <div className="relative z-50">
                    <Header handleLogout={handleLogout}></Header>
                </div>

                {/* Contenedor del Outlet */}
                <div className={`w-full h-14/15 transform transition-all duration-700 dark:bg-gray-900 bg-gray-100 overflow-y-auto scrollbar-hide ${contentVisible
                    ? 'translate-y-0 opacity-100 scale-100'
                    : 'translate-y-4 opacity-0 scale-98'
                    }`}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default MainLayout;