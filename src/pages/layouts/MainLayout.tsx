import { Outlet, useMatches } from "react-router";
import BoxAsidebar from "../../components/BoxSidebar/BoxAsidebar";
import type { RouterHandle } from "../../interfaces/types";
import { useAuth } from "../../context/userContext";
import { useEffect, useState } from "react";
interface BoxInfoProps {
    title: string,
    url: string
    icon: string
}
const infoDisplay: BoxInfoProps[] = [
    {
        title: "Itinerario",
        url: "itinerary",
        icon: "M1.5 5.25C1.91421 5.25 2.25 4.91421 2.25 4.5C2.25 4.08579 1.91421 3.75 1.5 3.75C1.08579 3.75 0.75 4.08579 0.75 4.5C0.75 4.91421 1.08579 5.25 1.5 5.25ZM4 4.5C4 4.22386 4.22386 4 4.5 4H13.5C13.7761 4 14 4.22386 14 4.5C14 4.77614 13.7761 5 13.5 5H4.5C4.22386 5 4 4.77614 4 4.5ZM4.5 7C4.22386 7 4 7.22386 4 7.5C4 7.77614 4.22386 8 4.5 8H13.5C13.7761 8 14 7.77614 14 7.5C14 7.22386 13.7761 7 13.5 7H4.5ZM4.5 10C4.22386 10 4 10.2239 4 10.5C4 10.7761 4.22386 11 4.5 11H13.5C13.7761 11 14 10.7761 14 10.5C14 10.2239 13.7761 10 13.5 10H4.5ZM2.25 7.5C2.25 7.91421 1.91421 8.25 1.5 8.25C1.08579 8.25 0.75 7.91421 0.75 7.5C0.75 7.08579 1.08579 6.75 1.5 6.75C1.91421 6.75 2.25 7.08579 2.25 7.5ZM1.5 11.25C1.91421 11.25 2.25 10.9142 2.25 10.5C2.25 10.0858 1.91421 9.75 1.5 9.75C1.08579 9.75 0.75 10.0858 0.75 10.5C0.75 10.9142 1.08579 11.25 1.5 11.25Z"
    },
    {
        title: "Pantallas",
        url: "/displays",
        icon: "M1 3.25C1 3.11193 1.11193 3 1.25 3H13.75C13.8881 3 14 3.11193 14 3.25V10.75C14 10.8881 13.8881 11 13.75 11H1.25C1.11193 11 1 10.8881 1 10.75V3.25ZM1.25 2C0.559643 2 0 2.55964 0 3.25V10.75C0 11.4404 0.559644 12 1.25 12H5.07341L4.82991 13.2986C4.76645 13.6371 5.02612 13.95 5.37049 13.95H9.62951C9.97389 13.95 10.2336 13.6371 10.1701 13.2986L9.92659 12H13.75C14.4404 12 15 11.4404 15 10.75V3.25C15 2.55964 14.4404 2 13.75 2H1.25ZM9.01091 12H5.98909L5.79222 13.05H9.20778L9.01091 12Z"
    },
]
const infoUsers: BoxInfoProps[] = [
    {
        title: "Administrar Usuario",
        url: "users",
        icon: "M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z"
    }
]
const infoAdmin: BoxInfoProps[] = [
    {
        title: "Compañias",
        url: "transports_info",
        icon: "M5 1C5 0.447715 5.44772 0 6 0H9C9.55228 0 10 0.447715 10 1V2H14C14.5523 2 15 2.44772 15 3V6C15 6.8888 14.6131 7.68734 14 8.23608V11.5C14 12.3284 13.3284 13 12.5 13H2.5C1.67157 13 1 12.3284 1 11.5V8.2359C0.38697 7.68721 0 6.88883 0 6V3C0 2.44772 0.447716 2 1 2H5V1ZM9 1V2H6V1H9ZM1 3H5H5.5H9.5H10H14V6C14 6.654 13.6866 7.23467 13.1997 7.6004C12.8655 7.85144 12.4508 8 12 8H8V7.5C8 7.22386 7.77614 7 7.5 7C7.22386 7 7 7.22386 7 7.5V8H3C2.5493 8 2.1346 7.85133 1.80029 7.60022C1.31335 7.23446 1 6.65396 1 6V3ZM7 9H3C2.64961 9 2.31292 8.93972 2 8.82905V11.5C2 11.7761 2.22386 12 2.5 12H12.5C12.7761 12 13 11.7761 13 11.5V8.82915C12.6871 8.93978 12.3504 9 12 9H8V9.5C8 9.77614 7.77614 10 7.5 10C7.22386 10 7 9.77614 7 9.5V9Z"
    },
    {
        title: "Rastreo",
        url: "tracking",
        icon: "M0.877075 7.50207C0.877075 3.84319 3.84319 0.877075 7.50208 0.877075C11.1609 0.877075 14.1271 3.84319 14.1271 7.50207C14.1271 11.1609 11.1609 14.1271 7.50208 14.1271C3.84319 14.1271 0.877075 11.1609 0.877075 7.50207ZM1.84898 7.00003C2.0886 4.26639 4.26639 2.0886 7.00003 1.84898V4.50003C7.00003 4.77617 7.22388 5.00003 7.50003 5.00003C7.77617 5.00003 8.00003 4.77617 8.00003 4.50003V1.84862C10.7356 2.08643 12.9154 4.26502 13.1552 7.00003H10.5C10.2239 7.00003 10 7.22388 10 7.50003C10 7.77617 10.2239 8.00003 10.5 8.00003H13.1555C12.9176 10.7369 10.7369 12.9176 8.00003 13.1555V10.5C8.00003 10.2239 7.77617 10 7.50003 10C7.22388 10 7.00003 10.2239 7.00003 10.5V13.1552C4.26502 12.9154 2.08643 10.7356 1.84862 8.00003H4.50003C4.77617 8.00003 5.00003 7.77617 5.00003 7.50003C5.00003 7.22388 4.77617 7.00003 4.50003 7.00003H1.84898Z"
    },
    {
        title: "Anuncios",
        url: "advertisement",
        icon: "M14 2.58711L1.85163 13H13.5C13.7761 13 14 12.7761 14 12.5V2.58711ZM0.762879 13.8067L0.825396 13.8796L0.854717 13.8545C1.05017 13.9478 1.26899 14 1.5 14H13.5C14.3284 14 15 13.3284 15 12.5V2.5C15 1.93949 14.6926 1.45078 14.2371 1.19331L14.1746 1.12037L14.1453 1.1455C13.9498 1.05222 13.731 1 13.5 1H1.5C0.671573 1 0 1.67157 0 2.5V12.5C0 13.0605 0.307435 13.5492 0.762879 13.8067ZM1 12.4129L13.1484 2H1.5C1.22386 2 1 2.22386 1 2.5V12.4129Z"
    },
]
const navUsers = infoUsers.map(item =>
    <BoxAsidebar key={item.url} title={item.title} url={item.url} pathIcon={item.icon} />
)
const navAdmin = infoDisplay.map(item =>
    <BoxAsidebar key={item.url} title={item.title} url={item.url} pathIcon={item.icon} />
)
const navItinerario = infoAdmin.map(item =>
    <BoxAsidebar key={item.url} title={item.title} url={item.url} pathIcon={item.icon} />
)

// Hook para animaciones de entrada del dashboard
const useDashboardAnimation = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [headerVisible, setHeaderVisible] = useState(false);
    const [contentVisible, setContentVisible] = useState(false);

    useEffect(() => {
        // Secuencia de animaciones
        const timers = [
            setTimeout(() => setIsLoaded(true), 100),
            setTimeout(() => setSidebarVisible(true), 200),
            setTimeout(() => setHeaderVisible(true), 400),
            setTimeout(() => setContentVisible(true), 600)
        ];

        return () => timers.forEach(timer => clearTimeout(timer));
    }, []);

    return {
        isLoaded,
        sidebarVisible,
        headerVisible,
        contentVisible
    };
};

function MainLayout() {
    const { logout,user } = useAuth();
    const busCentralName = localStorage.getItem("busCentralName") || "Central Faustino Félix Serna";
    const matches = useMatches();
    
    // Hook para animaciones
    const { isLoaded, sidebarVisible, headerVisible, contentVisible } = useDashboardAnimation();

    const handleLogout = () => {
        logout();
    }

    const currentTitle = matches
        .filter((match) => (match.handle as RouterHandle)?.title)
        .map((match) => (match.handle as RouterHandle).title!)
        .pop();

    return (
        <div className={`flex min-h-screen flex-row transition-all duration-700 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
        }`}>
            
            {/* Sidebar con animación de entrada desde la izquierda */}
            <div className={`sticky w-auto transition-all duration-500 ${
                sidebarVisible 
                    ? 'translate-x-0 opacity-100' 
                    : '-translate-x-full opacity-0'
            } hidden lg:block`}>
                <aside 
                    id="logo-sidebar" 
                    className="top-0 left-0 z-40 w-60 h-screen pt-20 bg-white border-r border-gray-200 dark:bg-[#023672] dark:border-gray-700" 
                    aria-label="Sidebar"
                >
                    <div className="w-auto px-3 pb-4 overflow-y-auto bg-white dark:bg-[#023672]">
                        
                        {/* Sección Admin con animación escalonada */}
                        <div className={`transform transition-all duration-500 ${
                            sidebarVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                        }`} style={{ transitionDelay: '0.1s' }}>
                            <ul className="space-y-2 font-medium">
                                {navAdmin}
                            </ul>
                        </div>
                        
                        <hr className={`h-px my-4 bg-white border-0 dark:bg-white transition-all duration-300 ${
                            sidebarVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                        }`} style={{ transitionDelay: '0.2s' }} />
                        
                        {/* Sección Administrar */}
                        <div className={`transform transition-all duration-500 ${
                            sidebarVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                        }`} style={{ transitionDelay: '0.3s' }}>
                            <p className="text-white font-medium p-2">Administrar</p>
                            <ul className="space-y-2 font-medium">
                                {navItinerario}
                            </ul>
                        </div>
                        
                        <hr className={`h-px my-4 bg-white border-0 dark:bg-white transition-all duration-300 ${
                            sidebarVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                        }`} style={{ transitionDelay: '0.4s' }} />
                        
                        {/* Sección Usuarios */}
                        <div className={`transform transition-all duration-500 ${
                            sidebarVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                        }`} style={{ transitionDelay: '0.5s' }}>
                            <p className="text-white font-medium p-2">Usuarios</p>
                            <ul>
                                {navUsers}
                            </ul>
                        </div>
                    </div>
                    
                    {/* Botón de logout con animación */}
                    <div className={`flex items-end transform transition-all duration-500 ${
                        sidebarVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                    }`} style={{ transitionDelay: '0.6s' }}>
                        <div 
                            onClick={handleLogout} 
                            className="flex flex-row justify-start items-center gap-2 py-2 px-4 w-40 ml-3 text-white rounded-full cursor-pointer hover:bg-[#4185D4] dark:hover:bg-[#4185D4] group transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
                        >
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 1C2.44771 1 2 1.44772 2 2V13C2 13.5523 2.44772 14 3 14H10.5C10.7761 14 11 13.7761 11 13.5C11 13.2239 10.7761 13 10.5 13H3V2L10.5 2C10.7761 2 11 1.77614 11 1.5C11 1.22386 10.7761 1 10.5 1H3ZM12.6036 4.89645C12.4083 4.70118 12.0917 4.70118 11.8964 4.89645C11.7012 5.09171 11.7012 5.40829 11.8964 5.60355L13.2929 7H6.5C6.22386 7 6 7.22386 6 7.5C6 7.77614 6.22386 8 6.5 8H13.2929L11.8964 9.39645C11.7012 9.59171 11.7012 9.90829 11.8964 10.1036C12.0917 10.2988 12.4083 10.2988 12.6036 10.1036L14.8536 7.85355C15.0488 7.65829 15.0488 7.34171 14.8536 7.14645L12.6036 4.89645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path>
                            </svg>
                            <p>Cerrar Sesion</p>
                        </div>
                    </div>
                </aside>
            </div>

            {/* Contenedor de la segunda columna */}
            <div className="h-screen flex-1 overflow-y-auto scrollbar-hide">
                
                {/* Header con animación de entrada desde arriba */}
                <div className={`w-full h-1/15 lg:h-1/15 p-1 2xl:p-3 lg:px-8 lg:pl-8 bg-white transform transition-all duration-500 ${
                    headerVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
                }`}>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <span className={`self-center text-lg font-semibold 2xl:text-2xl text-[#023672] transform transition-all duration-500 ${
                                headerVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                            }`} style={{ transitionDelay: '0.1s' }}>
                                {currentTitle} - {busCentralName}
                            </span>
                        </div>

                        <div className={`flex items-center ms-3 transform transition-all duration-500 ${
                            headerVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                        }`} style={{ transitionDelay: '0.2s' }}>
                            <div className="flex flex-row gap-2 justify-center items-center">
                                <p className="text-center">{user?.userName}</p>
                                <button 
                                    type="button" 
                                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 transition-all duration-200 hover:scale-110 active:scale-95" 
                                    aria-expanded="false" 
                                    data-dropdown-toggle="dropdown-user"
                                >
                                    <span className="sr-only">Open user menu</span>
                                    <img 
                                        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full" 
                                        alt="user photo" 
                                        src="https://www.reshot.com/preview-assets/icons/F3N5JXHBEG/user-F3N5JXHBEG.svg" 
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contenedor del Outlet con animación de fade in */}
                <div className={`w-full h-14/15 transform transition-all duration-700 ${
                    contentVisible 
                        ? 'translate-y-0 opacity-100 scale-100' 
                        : 'translate-y-4 opacity-0 scale-98'
                } `}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default MainLayout;