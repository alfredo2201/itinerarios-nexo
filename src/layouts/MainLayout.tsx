import { Outlet, useMatches } from "react-router";
import BoxAsidebar from "../components/BoxSidebar/BoxAsidebar";
import TopBar from "../components/Bar/TopBox";
import type { RouterHandle } from "../interfaces/types";
interface BoxInfoProps {
    title: string,
    url: string
}

const infoDisplay: BoxInfoProps[] = [
    { title: "Itinerario", url: "home" },
    { title: "Pantallas", url: "displays" },
]

const infoAdmin: BoxInfoProps[] = [
    { title: "Autobuses", url: "bus_info" },
    { title: "Rastreo", url: "tracking" },
    { title: "Anuncios", url: "advertisement" },
]

const navAdmin = infoDisplay.map(item =>
    <BoxAsidebar key={item.url} title={item.title} url={item.url} />
)

const navItinerario = infoAdmin.map(item =>
    <BoxAsidebar key={item.url} title={item.title} url={item.url} />
)

function MainLayout() {
    const matches = useMatches();

    const currentTitle = matches
        .filter((match) => (match.handle as RouterHandle)?.title)
        .map((match) => (match.handle as RouterHandle).title!)
        .pop();
    return (
        <div className="flex flex-row">
            <div className="bg-[#023672] transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-[#023672] dark:border-gray-700">
                <aside id="logo-sidebar" className="top-0 left-0 z-40 w-80 h-dvh pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-[#023672] dark:border-gray-700" aria-label="Sidebar">
                    <div className="w-80 px-3 pb-4 overflow-y-auto bg-white dark:bg-[#023672]">
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
                </aside>
            </div>                
            <div className="w-full flex flex-col">
                <TopBar pageName={currentTitle} busCentralName="Central Faustino Felix Serna" ></TopBar>
                <div className="bg-[#F2F4F7] w-full h-full px-10 py-6 " >
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default MainLayout;