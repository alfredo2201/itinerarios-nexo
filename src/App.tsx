import { createBrowserRouter, RouterProvider } from 'react-router'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
/*Imports */
import LoginPage from './pages/Admin/LoginPage.tsx'
import MainPage from './pages/Admin/Inicio/MainPage.tsx'
import MainLayout from './layouts/MainLayout.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'
import AdminBusesPage from './pages/Admin/Buses/AdminBusPage.tsx'
import DisplayPage from './pages/DisplayPage.tsx'
import DisplayExtendedPage from './pages/DisplayExtended.tsx'
import TrackingPage from './pages/Admin/Rastreo/TrackingPage.tsx'
import AdvertismentPage from './pages/Admin/Anuncios/AdvertismentPage.tsx'
import type { RouterHandle } from './interfaces/types.ts'
import BusInfoPage from './pages/Admin/Buses/BusInfoDisplay.tsx'
import ChildrenLayout from './layouts/ChildrenLayout.tsx'
import BusAddPage from './pages/Admin/Buses/BusAddPage.tsx'
import { Toaster } from 'react-hot-toast'
import AddAdsPage from './pages/Admin/Anuncios/AddAdsPage.tsx'
import React from 'react';
const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/",
        element: <MainLayout />,
        handle: { title: 'Bienvenido/a' as RouterHandle },
        children: [
            {
                path: "/home",
                element: <MainPage />,
                handle: { title: 'Itinerario' as RouterHandle }
            },
            {
                path: "/bus_info",
                element: <ChildrenLayout />,
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
                    }, {
                        path: "/bus_info/add",
                        element: <BusAddPage />,
                        handle: { title: 'Autobuses' as RouterHandle }
                    }
                ]
            },
            {
                path: "/tracking",
                element: <ChildrenLayout />,
                handle: { title: 'Rastreo' as RouterHandle },
                children: [
                    {
                        path: "/tracking",
                        element: <TrackingPage />,
                        handle: { title: 'Rastreo' as RouterHandle }
                    },

                ]
            }, {
                path: "/advertisement",
                element: <ChildrenLayout />,
                handle: { title: 'Anuncios' as RouterHandle },
                children: [
                    {
                        path: "/advertisement",
                        element: <AdvertismentPage />,
                        handle: { title: 'Anuncios' as RouterHandle }
                    },
                    {
                        path: "/advertisement/add",
                        element: <AddAdsPage />,
                        handle: { title: 'Anuncios' as RouterHandle }
                    }
                ]
            },
        ]

    },
    {
        path: "/displays",
        element: <DisplayPage />
    },

    {
        path: "/displayExtended",
        element: <DisplayExtendedPage />
    },
    {
        path: "*",
        element: <NotFoundPage />
    },
])

function App() {

    return (
        <React.StrictMode>
            <Toaster position="top-right" />
            <RouterProvider router={router} />
        </React.StrictMode>

    );
}

export default App;