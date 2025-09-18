import { createBrowserRouter, Navigate, RouterProvider } from 'react-router'
import { Toaster } from 'react-hot-toast'
import React from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'sweetalert2/src/sweetalert2.scss';
/*Imports */
import LoginPage from './pages/Admin/LoginPage.tsx'
import MainPage from './pages/Admin/Inicio/MainPage.tsx'
import MainLayout from './pages/layouts/MainLayout.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'
import AdminBusesPage from './pages/Admin/Transporte/TransportPage.tsx'
import DisplayPage from './pages/Display/DisplayPage.tsx'
import TrackingPage from './pages/Admin/Rastreo/TrackingPage.tsx'
import AdvertismentPage from './pages/Admin/Anuncios/AdvertismentPage.tsx'
import type { RouterHandle } from './interfaces/types.ts'
import BusInfoPage from './pages/Admin/Transporte/TransportInfoPage.tsx'
import ChildrenLayout from './pages/layouts/ChildrenLayout.tsx'
import BusAddPage from './pages/Admin/Transporte/AddCompanyPage.tsx'
import AddAdsPage from './pages/Admin/Anuncios/AddAdsPage.tsx'
import { UserProvider } from './context/useAuth.tsx';
import DisplayVerticalPage from './pages/Display/DisplayVerticalPage.tsx';
import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const router = createBrowserRouter([
    {
        path: "/",
        element: <UserProvider><LoginPage/></UserProvider>,
        handle: { title: 'Iniciar Sesión' as RouterHandle },
        errorElement: <NotFoundPage />,
        index: true // Ruta principal
    },
    {
        path: "/login",
        element: <Navigate to="/" replace /> // Redirección a la ruta principal
    },    
    {
        path: "/dashboard", // Cambiado de "/" a "/dashboard"
        element:<UserProvider><MainLayout /></UserProvider>,        
        handle: { title: 'Bienvenido/a' as RouterHandle },
        children: [
            {
                path: "/dashboard/itinerary", // Actualizado el path
                element: <MainPage />,
                handle: { title: 'Itinerario' as RouterHandle }
            },
            {
                path: "/dashboard/transports_info", // Actualizado el path
                element: <ChildrenLayout />,
                handle: { title: 'Autobuses' as RouterHandle },
                children: [
                    {
                        path: "/dashboard/transports_info",
                        element: <AdminBusesPage />,
                        handle: { title: 'Autobuses' as RouterHandle }
                    },
                    {
                        path: "/dashboard/transports_info/all",
                        element: <BusInfoPage />,
                        handle: { title: 'Autobuses' as RouterHandle }
                    }, {
                        path: "/dashboard/transports_info/add",
                        element: <BusAddPage />,
                        handle: { title: 'Autobuses' as RouterHandle }
                    }
                ]
            },
            {
                path: "/dashboard/tracking", // Actualizado el path
                element: <ChildrenLayout />,
                handle: { title: 'Rastreo' as RouterHandle },
                children: [
                    {
                        path: "/dashboard/tracking",
                        element: <TrackingPage />,
                        handle: { title: 'Rastreo' as RouterHandle }
                    },
                ]
            }, {
                path: "/dashboard/advertisement", // Actualizado el path
                element: <ChildrenLayout />,
                handle: { title: 'Anuncios' as RouterHandle },
                children: [
                    {
                        path: "/dashboard/advertisement",
                        element: <AdvertismentPage />,
                        handle: { title: 'Anuncios' as RouterHandle }
                    },
                    {
                        path: "/dashboard/advertisement/add",
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
        element: <DisplayPage/>
    },
    {
        path: "/vertical-display",
        element: <DisplayVerticalPage />
    },
    {
        path: "*",
        element: <NotFoundPage />
    },
])

function App() {
    return (
        <React.StrictMode>
            <RouterProvider router={router} />
            <Toaster position="top-right" />
        </React.StrictMode>

    );
}

export default App;