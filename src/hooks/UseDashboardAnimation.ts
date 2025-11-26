import { useEffect, useState } from "react";

// Hook para animaciones de entrada del dashboard
export default function useDashboardAnimation() {
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

    const handleSidebarToggle = () => {
        setSidebarVisible(!sidebarVisible);
    }

    return {
        isLoaded,
        sidebarVisible,
        headerVisible,
        contentVisible,
        handleSidebarToggle
    };
};