import { createBrowserRouter, RouterProvider } from "react-router";
import { Toaster } from "react-hot-toast";
import React from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "sweetalert2/src/sweetalert2.scss";

/* Imports de páginas */
import MainPage from "./pages/Admin/Itinerarios/MainPage.tsx";
import MainLayout from "./pages/layouts/MainLayout.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import AdminBusesPage from "./pages/Admin/Transporte/TransportPage.tsx";
import DisplayPage from "./pages/Display/DisplayPage.tsx";
import TrackingPage from "./pages/Admin/Rastreo/TrackingPage.tsx";
import AdvertismentPage from "./pages/Admin/Anuncios/AdvertismentPage.tsx";
import BusInfoPage from "./pages/Admin/Transporte/TransportInfoPage.tsx";
import ChildrenLayout from "./pages/layouts/ChildrenLayout.tsx";
import BusAddPage from "./pages/Admin/Transporte/AddCompanyPage.tsx";
import AddAdsPage from "./pages/Admin/Anuncios/AddAdsPage.tsx";
import DisplayVerticalPage from "./pages/Display/DisplayVerticalPage.tsx";
import UserPage from "./pages/Admin/Usuarios/UsersPage.tsx";
import Unauthorized from "./components/Unauthorized.tsx";
import LoginRoute from "./components/Login/LoginRoute.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import ProfileUserPage from "./pages/Admin/Usuarios/ProfileUserPage.tsx";
import SettingsPage from "./pages/Admin/Usuarios/settingsPage.tsx";

/* Contexto y tipos */
import { UserProvider } from "./hooks/useAuth.tsx";
import { UserRole } from "./models/User.ts";
import type { RouterHandle } from "./types/types.ts";
import MaintenancePage from "./pages/MaintenancePage.tsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserProvider>
        <LoginRoute />
      </UserProvider>
    ),
    handle: { title: "Iniciar Sesión" as RouterHandle },
    errorElement: <NotFoundPage />,
    index: true,
  },
  {
    path: "/login",
    element: (
      <UserProvider>
        <LoginRoute />
      </UserProvider>
    ),
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
    handle: { title: "Acceso Denegado" as RouterHandle },
  },
  // ✅ Rutas protegidas
  {
    element: (
      <UserProvider>
        <ProtectedRoute
          allowedRoles={[
            UserRole.ADMINISTRADOR,
            UserRole.EDITOR,
            UserRole.VISUALIZADOR,
          ]}
        />
      </UserProvider>

    ),
    children: [
      {
        path: "/dashboard",
        element: (
          <UserProvider>
            <MainLayout />
          </UserProvider>
        ),
        handle: { title: "Bienvenido/a" as RouterHandle },
        children: [
          {
            path: "/dashboard/itinerary",
            element: <MainPage />,
            handle: { title: "Itinerario" as RouterHandle },
          },
          // 🔒 Solo admin
          {
            element: (
              <ProtectedRoute allowedRoles={[UserRole.ADMINISTRADOR]} />
            ),
            children: [
              {
                path: "/dashboard/users",
                element: <UserPage />,
                handle: { title: "Usuarios" as RouterHandle },
              },
            ],
          },
          // 🔒 Solo admin, editor, visualizador
          {
            element: (
              <ProtectedRoute allowedRoles={[UserRole.ADMINISTRADOR, UserRole.EDITOR, UserRole.VISUALIZADOR]} />
            ),
            children: [
              {
                path: "/dashboard/users/profile",
                element: <ProfileUserPage />,
                handle: { title: "Perfil de Usuario" as RouterHandle },
              },
              {
                path: "/dashboard/users/settings",
                element: <MaintenancePage />,
                handle: { title: "Configuraciones" as RouterHandle },
              },
            ],
          },
          // 🔒 Admin y Editor
          {
            element: (
              <ProtectedRoute
                allowedRoles={[UserRole.ADMINISTRADOR, UserRole.EDITOR, UserRole.VISUALIZADOR]}
              />
            ),
            children: [
              {
                path: "/dashboard/transports_info",
                element: <ChildrenLayout />,
                handle: { title: "Autobuses" as RouterHandle },
                children: [
                  {
                    path: "/dashboard/transports_info",
                    element: <AdminBusesPage />,
                    handle: { title: "Autobuses" as RouterHandle },
                  },
                  {
                    path: "/dashboard/transports_info/all",
                    element: <BusInfoPage />,
                    handle: { title: "Autobuses" as RouterHandle },
                  },
                  {
                    path: "/dashboard/transports_info/add",
                    element: <BusAddPage />,
                    handle: { title: "Agregar Autobús" as RouterHandle },
                  },
                ],
              },
              {
                path: "/dashboard/tracking",
                element: <ChildrenLayout />,
                handle: { title: "Rastreo" as RouterHandle },
                children: [
                  {
                    path: "/dashboard/tracking",
                    element: <MaintenancePage />,
                    handle: { title: "Rastreo" as RouterHandle },
                  },
                ],
              },
              {
                path: "/dashboard/advertisement",
                element: <ChildrenLayout />,
                handle: { title: "Anuncios" as RouterHandle },
                children: [
                  {
                    path: "/dashboard/advertisement",
                    element: <AdvertismentPage />,
                    handle: { title: "Anuncios" as RouterHandle },
                  },
                  {
                    path: "/dashboard/advertisement/add",
                    element: <AddAdsPage />,
                    handle: { title: "Agregar Anuncio" as RouterHandle },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  // 🟢 Rutas públicas (Display)
  {
    path: "/displays",
    element: <DisplayPage />,
  },
  {
    path: "/displayExtended",
    element: <DisplayPage />,
  },
  {
    path: "/vertical-display",
    element: <DisplayVerticalPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

function App() {
  return (
    <React.StrictMode>      
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </React.StrictMode>
  );
}

export default App;