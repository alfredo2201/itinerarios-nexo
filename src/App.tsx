import { createBrowserRouter, RouterProvider } from 'react-router'
/*Imports */
import LoginPage from './pages/LoginPage.tsx'
import MainPage from './pages/MainPage.tsx'
import MainLayout from './layouts/MainLayout.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'
import AdminBusesPage from './pages/Admin/Buses/AdminBusPage.tsx'
import DisplayPage from './pages/DisplayPage.tsx'
import DisplayExtendedPage from './pages/DisplayExtended.tsx'
import TrackingPage from './pages/Admin/TrackingPage.tsx'
import AdvertismentPage from './pages/Admin/AdvertismentPage.tsx'
import type { RouterHandle } from './interfaces/types.ts'
import BusInfoPage from './pages/Admin/Buses/BusInfoDisplay.tsx'
import ChildrenLayout from './layouts/ChildrenLayout.tsx'
const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "",
        element: <MainLayout />,
        children: [
            {
                path: "/home",
                element: <MainPage />,
                handle: { title: 'Itinerario' as RouterHandle }
            },
            {
                path: "/bus_info",
                element: <ChildrenLayout/>,
                handle: { title: 'Autobuses' as RouterHandle },
                children: [
                    {
                        path: "/bus_info",
                        element: <AdminBusesPage />,
                        handle: { title: 'Autobuses' as RouterHandle }
                    },
                    {
                        path: "/bus_info/all",
                        element: <BusInfoPage />,
                        handle: { title: 'Autobuses' as RouterHandle }
                    },
                ]
            },
            {
                path: "/tracking",
                element: <TrackingPage />,
                handle: { title: 'Rastreo' as RouterHandle }
            }, {
                path: "/advertisement",
                element: <AdvertismentPage />,
                handle: { title: 'Anuncios' as RouterHandle }
            },
        ]

    },
    {
        path: "displays",
        element: <DisplayPage />
    },

    {
        path: "displayExtended",
        element: <DisplayExtendedPage />
    },
    {
        path: "*",
        element: <NotFoundPage />
    },
])

function App() {
    return (
        <RouterProvider router={router} />
    );
}

export default App;