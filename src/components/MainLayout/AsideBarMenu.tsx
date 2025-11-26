import { infoAdmin, infoDisplay, infoUsers } from "../../constants/navegation.constants";
import useDashboardAnimation from "../../hooks/UseDashboardAnimation";
import { useUserPermissions } from "../../hooks/useUserPermissions";
import BoxAsidebar from "../BoxSidebar/BoxAsidebar";

export default function AsideBarMenu() {
    const { isAdmin } = useUserPermissions()
    const { sidebarVisible } = useDashboardAnimation();
    return (
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
                        {
                            infoDisplay.map(item =>
                                <BoxAsidebar key={item.url} title={item.title} url={item.url} pathIcon={item.icon} />
                            )
                        }
                    </ul>
                </div>

                <hr className={`h-px my-4 bg-white border-0 dark:bg-white transition-all duration-300 ${sidebarVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                    }`} style={{ transitionDelay: '0.2s' }} />

                {/* Sección Administrar */}
                <div className={`transform transition-all duration-500 ${sidebarVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    }`} style={{ transitionDelay: '0.3s' }}>
                    <p className="text-white font-medium p-2">Administrar</p>
                    <ul className="space-y-2 font-medium">
                        {
                            infoAdmin.map(item =>
                                <BoxAsidebar key={item.url} title={item.title} url={item.url} pathIcon={item.icon} />
                            )
                        }
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
    );
}
