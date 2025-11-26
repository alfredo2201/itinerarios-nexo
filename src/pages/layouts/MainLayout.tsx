import { Outlet } from "react-router";
import useDashboardAnimation from "../../hooks/UseDashboardAnimation";
import Header from "../../components/MainLayout/Header";
import AsideBarMenu from "../../components/MainLayout/AsideBarMenu";
import { useState } from "react";

function MainLayout() {
    const [asidebarVisible, setAsidebarVisible] = useState(false);
    const { isLoaded, contentVisible } = useDashboardAnimation();

    const handleSidebarToggle = () => {
        setAsidebarVisible(!asidebarVisible);
    }
    
    return (
        <div className={`flex min-h-screen dark:bg-gray-900 flex-row transition-all duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>

            {/* Backdrop para móvil */}
            {asidebarVisible && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300"
                    onClick={handleSidebarToggle}
                />
            )}

            {/* Sidebar con animación */}
            <aside className={`
                w-auto transition-transform duration-300 ease-in-out
                fixed lg:sticky 
                z-50 lg:z-auto 
                top-0 left-0 
                h-screen
                ${asidebarVisible ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                <AsideBarMenu />
            </aside>

            {/* Contenedor de la segunda columna */}
            <div className="h-screen w-full flex-1 bg-white dark:bg-gray-900">
                {/* Header con overflow visible */}
                <div className="relative z-30">
                    <Header handleSidebarToggle={handleSidebarToggle} />
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