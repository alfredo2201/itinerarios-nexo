import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import type { UserResponseDto } from "../../models/User";
import { useNavigate } from 'react-router';

interface DropMenuProps {
    user: UserResponseDto | undefined;
    headerVisible: boolean;
    handleLogout: () => void;
}

export default function DropMenu({ user, headerVisible, handleLogout }: DropMenuProps) {
    const navigate = useNavigate();
    return (
        <div className={`flex items-center ms-3 transform transition-all duration-500 ${
            headerVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
        }`} style={{ transitionDelay: '0.2s' }}>
            <div className="flex flex-row gap-2 justify-center items-center">
                <p className="text-center hidden lg:inline dark:text-white text-gray-800 font-medium">
                    {user ? `${user?.firstName} ${user?.lastName}` : ''}
                </p>
                
                <Menu as="div" className="relative">
                    {/* Button */}
                    <Menu.Button className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600 transition-all duration-200 hover:scale-110 active:scale-95  cursor-pointer">
                        <span className="sr-only">Open user menu</span>
                        <img
                            className="w-7 h-7 sm:w-8 sm:h-8 rounded-full"
                            alt="user photo"
                            src="https://www.reshot.com/preview-assets/icons/F3N5JXHBEG/user-F3N5JXHBEG.svg"
                        />
                    </Menu.Button>

                    {/* Dropdown menu with transition */}
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-md shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700 focus:outline-none z-50">
                            {/* User info header */}
                            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                                <p className="text-sm text-gray-900 dark:text-white">
                                    {user?.firstName} {user?.lastName}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                    {user?.email}
                                </p>
                            </div>

                            {/* Menu items */}
                            <div className="py-2"
                            >
                                <Menu.Item >
                                    {({ active }) => (
                                        <span
                                            onClick={() => navigate("/dashboard/users/profile")}
                                            className={`block px-4 py-2 text-sm cursor-pointer ${
                                                active
                                                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                                                    : 'text-gray-700 dark:text-gray-300'
                                            }`}
                                        >
                                            Ver Perfil
                                        </span>
                                    )}
                                </Menu.Item>
                                
                                <Menu.Item>
                                    {({ active }) => (
                                        <span
                                            onClick={() => navigate("/dashboard/users/settings")}
                                            className={`block px-4 py-2 text-sm cursor-pointer ${
                                                active
                                                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                                                    : 'text-gray-700 dark:text-gray-300'
                                            }`}
                                        >
                                            Configuración
                                        </span>
                                    )}
                                </Menu.Item>
                                
                                <Menu.Item>
                                    {({ active }) => (
                                        <button
                                            onClick={handleLogout}
                                            className={`block w-full text-left px-4 py-2 text-sm cursor-pointer ${
                                                active
                                                    ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                                                    : 'text-gray-700 dark:text-gray-300'
                                            }`}
                                        >
                                            Cerrar Sesión
                                        </button>
                                    )}
                                </Menu.Item>
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </div>
    );
}
