import { useMatches } from "react-router";
import useDashboardAnimation from "../../hooks/UseDashboardAnimation";
import type { RouterHandle } from "../../types/types";
import { useUser } from "../../hooks/useUser";
import DropMenu from "./DropMenu";
import { Menu } from "lucide-react";

interface HeaderProps {
    handleSidebarToggle?: () => void;
}

export default function Header({ handleSidebarToggle }: HeaderProps) {
    const { user } = useUser()
    const busCentralName = localStorage.getItem("busCentralName") || "Central Faustino Félix Serna";
    const matches = useMatches();
    // Hook para animaciones
    const { headerVisible } = useDashboardAnimation();

    const currentTitle = matches
        .filter((match) => (match.handle as RouterHandle)?.title)
        .map((match) => (match.handle as RouterHandle).title!)
        .pop();

    return (
        <>
            {/* Header con animación de entrada desde arriba */}
            <div className={`w-full h-1/15 p-1 px-5 py-3 flex justify-center bg-white dark:bg-gray-800 transform transition-all duration-500 ${headerVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
                }`}>
                <div className="w-full flex items-center justify-between">
                    <div className="flex items-center justify-start rtl:justify-end">
                        <Menu
                            className="dark:text-white hover:text-gray-300 hover:cursor-pointer mr-4 block lg:hidden"
                            onClick={handleSidebarToggle}>
                        </Menu>
                        <p className={`self-center flex gap-2 text-lg font-semibold 2xl:text-[22px] xl:text-[18px] text-[18px] text-[#023672] dark:text-white transform transition-all duration-500 ${headerVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
                            }
                            `} 
                            style={{ transitionDelay: '0.1s' }}>
                            {currentTitle}<span className="hidden sm:block">- {busCentralName}</span>
                        </p>
                    </div>

                    <DropMenu user={user} headerVisible={headerVisible}></DropMenu>
                </div>
            </div>
        </>
    );
}