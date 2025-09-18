import { Outlet, useMatches } from "react-router";
import BoxAsidebar from "../../components/BoxSidebar/BoxAsidebar";
import type { RouterHandle } from "../../interfaces/types";
import { ExitIcon } from "@radix-ui/react-icons";
import { useAuth } from "../../context/userContext";
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

const navAdmin = infoDisplay.map(item =>
    <BoxAsidebar key={item.url} title={item.title} url={item.url} pathIcon={item.icon} />
)

const navItinerario = infoAdmin.map(item =>
    <BoxAsidebar key={item.url} title={item.title} url={item.url} pathIcon={item.icon} />
)

function MainLayout() {
    const { logout } = useAuth();
    const busCentralName = localStorage.getItem("busCentralName") || "Central Faustino Félix Serna";
    const matches = useMatches();

    const handleLogout = () => {
        logout();
    }

    const currentTitle = matches
        .filter((match) => (match.handle as RouterHandle)?.title)
        .map((match) => (match.handle as RouterHandle).title!)
        .pop();
    return (

        <div className="flex h-dvh flex-row ">
            <div className="w-70 transition-transform -translate-x-full md:translate-x-0 hidden lg:block">
                <aside id="logo-sidebar" className="top-0 left-0 z-40 w-60 h-dvh pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-[#023672] dark:border-gray-700" aria-label="Sidebar">
                    <div className="w-auto px-3 pb-4 overflow-y-auto bg-white dark:bg-[#023672]">
                        <ul className="space-y-2 font-medium">
                            {navAdmin}
                        </ul>
                        <hr className="h-px my-4 bg-white border-0 dark:bg-white" />
                        <p className="text-white font-medium p-2">Administrar</p>
                        <ul className="space-y-2 font-medium">
                            {navItinerario}
                        </ul>
                        <hr className="h-px my-4 bg-white border-0 dark:bg-white" />
                    </div>
                    <div className="flex h-1/2 items-end">
                        <div onClick={handleLogout} className="flex flex-row justify-start items-center gap-2 p-2 w-1/3 ml-3 text-white rounded-full cursor-pointer hover:bg-[#4185D4] dark:hover:bg-[#4185D4] group transition duration-150 ease-in-out">
                            <ExitIcon></ExitIcon>
                            <p>Logout</p>
                        </div>
                    </div>
                </aside>
            </div>
            {/* Contenedor de toda las segunda columna */}
            <div className="w-full h-full flex flex-col grow ">
                {/*Contenedor del titulo */}
                <div className="w-full h-25 lg:h-15 p-5 sm:p-3 lg:px-8 lg:pl-8 bg-white">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end ">
                            <span className="self-center text-xl font-semibold sm:text-2xl text-[#023672]">{currentTitle} - {busCentralName}</span>
                        </div>

                        <div className="flex items-center ms-3">
                            <div>
                                <button type="button" className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" aria-expanded="false" data-dropdown-toggle="dropdown-user">
                                    <span className="sr-only">Open user menu</span>
                                    <img className="w-7 h-7 sm:w-8 sm:h-8 rounded-full" alt="user photo" src="https://www.reshot.com/preview-assets/icons/F3N5JXHBEG/user-F3N5JXHBEG.svg" />
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
                {/*Contenedor del Oulet donde se renderizara todo el sistema */}
                <div className="w-full h-full" >
                    <Outlet />
                </div>
            </div>

        </div>


    )
}

export default MainLayout;