import { useState } from "react";
import { useLocation } from "react-router";
import { User as UserIcon, Lock, Building2, Shield, FileText, Route, Users, Settings } from 'lucide-react';
import type { FormDataUser } from "../../../types/user.types";
import { Department, UserRole, type User } from "../../../models/User";

export default function EditUserPage() {
    const location = useLocation();
    const userToEdit = location.state?.user as User | undefined;
    const [formData, setFormData] = useState<FormDataUser>({
        firstName: userToEdit?.firstName || '',
        lastName: userToEdit?.lastName || '',
        phone: userToEdit?.phone || '',
        email: userToEdit?.email || '',
        password: '**********',
        confirmPassword: '**********',
        role: userToEdit?.role || UserRole.VISUALIZADOR,
        permissions: userToEdit?.permissions || {
            archivos: {
                subir: false,
                eliminar: false,
                descargar: false,
            },
            itinerarios: {
                ver_todos: false,
                ver_detalles: false,
                buscar_filtrar: false,
            },
            usuarios: {
                crear: false,
                editar: false,
                eliminar: false,
                ver_lista: false,
            },
            sistema: {
                configuracion: false,
                logs_archivos: false,
            },
        },
        empresaInfo: userToEdit?.empresaInfo || {
            empresa: '',
            cargo: '',
            departamento: undefined,
            acceso_restringido: false,
            empresas_permitidas: [],
        },
    });
    const [nuevaEmpresa, setNuevaEmpresa] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handlePermissionChange = (category: string, permission: string, checked: boolean) => {
        setFormData(prev => ({
            ...prev,
            permissions: {
                ...prev.permissions,
                [category]: {
                    ...prev.permissions[category as keyof typeof prev.permissions],
                    [permission]: checked
                }
            }
        }));
    };

    const handleEmpresaInfoChange = (field: string, value: any) => {
        setFormData(prev => ({
            ...prev,
            empresaInfo: {
                ...prev.empresaInfo,
                [field]: value
            }
        }));
    };

    const agregarEmpresa = () => {
        if (nuevaEmpresa.trim()) {
            setFormData(prev => ({
                ...prev,
                empresaInfo: {
                    ...prev.empresaInfo,
                    empresas_permitidas: [...prev.empresaInfo.empresas_permitidas, nuevaEmpresa.trim()]
                }
            }));
            setNuevaEmpresa('');
        }
    };

    const eliminarEmpresa = (index: number) => {
        setFormData(prev => ({
            ...prev,
            empresaInfo: {
                ...prev.empresaInfo,
                empresas_permitidas: prev.empresaInfo.empresas_permitidas.filter((_, i) => i !== index)
            }
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Datos del formulario:', formData);
        alert('Usuario guardado correctamente');
    };

    return (
        <div className="min-h-screen dark:bg-gray-900 p-6 " >
            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="bg-[#023672] dark:bg-gray-800 px-8 py-6">
                        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                            <UserIcon className="w-8 h-8" />
                            Editor de Usuarios
                        </h1>
                        <p className="text-blue-100 mt-2">Gestiona la información y permisos del usuario</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 dark:bg-gray-700">
                        {/* Información Personal */}
                        <div className="mb-8 dark:text-white">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                                <UserIcon className="w-5 h-5 text-[#023672]" />
                                Información Personal
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">Nombre</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">Apellido</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        onChange={handleInputChange}
                                        value={formData.lastName}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">Teléfono</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Seguridad */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                                <Lock className="w-5 h-5 text-[#023672]" />
                                Seguridad
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">Contraseña</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">Confirmar Contraseña</label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">Rol</label>
                                    <select
                                        name="role"
                                        value={formData.role}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border dark:text-white border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option className="dark:bg-gray-800" value={UserRole.VISUALIZADOR}>Visualizador</option>
                                        <option className="dark:bg-gray-800" value={UserRole.EDITOR}>Editor</option>
                                        <option className="dark:bg-gray-800" value={UserRole.ADMINISTRADOR}>Administrador</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Información de Empresa */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                                <Building2 className="w-5 h-5 text-[#023672] " />
                                Información de Empresa
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">Empresa</label>
                                    <input
                                        type="text"
                                        value={formData.empresaInfo.empresa}
                                        onChange={(e) => handleEmpresaInfoChange('empresa', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">Cargo</label>
                                    <input
                                        type="text"
                                        value={formData.empresaInfo.cargo}
                                        onChange={(e) => handleEmpresaInfoChange('cargo', e.target.value)}
                                        className="w-full dark:text-white px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">Departamento</label>
                                    <select
                                        id="department"
                                        className="w-full px-4 py-2 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        value={formData.empresaInfo.departamento || ''}
                                        onChange={(e) => handleEmpresaInfoChange('departamento', e.target.value as Department)}
                                    >
                                        <option value="">Seleccionar...</option>
                                        {Object.entries(Department).map(([key, value]) => (
                                            <option key={key} value={value}>{value}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.empresaInfo.acceso_restringido}
                                        onChange={(e) => handleEmpresaInfoChange('acceso_restringido', e.target.checked)}
                                        className="w-4 h-4 text-[#023672] rounded focus:ring-2 focus:ring-blue-500"
                                    />
                                    <span className="text-sm font-medium text-gray-700 dark:text-white">Acceso Restringido</span>
                                </label>
                            </div>

                            {formData.empresaInfo.acceso_restringido && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">Empresas Permitidas</label>
                                    <div className="flex gap-2 mb-2">
                                        <input
                                            type="text"
                                            value={nuevaEmpresa}
                                            onChange={(e) => setNuevaEmpresa(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), agregarEmpresa())}
                                            className="flex-1 px-4 py-2 dark:text-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Agregar empresa..."
                                        />
                                        <button
                                            type="button"
                                            onClick={agregarEmpresa}
                                            className="px-4 py-2 bg-[#023672] text-white rounded-lg hover:bg-blue-700 transition"
                                        >
                                            Agregar
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {formData.empresaInfo.empresas_permitidas.map((empresa, index) => (
                                            <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                                                {empresa}
                                                <button
                                                    type="button"
                                                    onClick={() => eliminarEmpresa(index)}
                                                    className="text-[#023672] hover:text-blue-800"
                                                >
                                                    ×
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Permisos */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                                <Shield className="w-5 h-5 text-[#023672]" />
                                Permisos
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Archivos */}
                                <div className="bg-gray-50 p-4 rounded-lg dark:text-white dark:bg-gray-600">
                                    <h3 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                                        <FileText className="w-4 h-4 text-[#023672] " />
                                        Archivos
                                    </h3>
                                    {Object.entries(formData.permissions.archivos).map(([key, value]) => (
                                        <label key={key} className="flex items-center gap-2 mb-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={value}
                                                onChange={(e) => handlePermissionChange('archivos', key, e.target.checked)}
                                                className="w-4 h-4 text-[#023672] dark:text-white rounded focus:ring-2 focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-gray-700 dark:text-white capitalize">{key.replace('_', ' ')}</span>
                                        </label>
                                    ))}
                                </div>

                                {/* Itinerarios */}
                                <div className="bg-gray-50 p-4 rounded-lg dark:text-white dark:bg-gray-600">
                                    <h3 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                                        <Route className="w-4 h-4 text-[#023672]" />
                                        Itinerarios
                                    </h3>
                                    {Object.entries(formData.permissions.itinerarios).map(([key, value]) => (
                                        <label key={key} className="flex items-center gap-2 mb-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={value}
                                                onChange={(e) => handlePermissionChange('itinerarios', key, e.target.checked)}
                                                className="w-4 h-4 text-[#023672]  rounded focus:ring-2 focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-gray-700 dark:text-white capitalize">{key.replace('_', ' ')}</span>
                                        </label>
                                    ))}
                                </div>

                                {/* Usuarios */}
                                <div className="bg-gray-50 p-4 rounded-lg dark:text-white dark:bg-gray-600">
                                    <h3 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                                        <Users className="w-4 h-4 text-[#023672]" />
                                        Usuarios
                                    </h3>
                                    {Object.entries(formData.permissions.usuarios).map(([key, value]) => (
                                        <label key={key} className="flex items-center gap-2 mb-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={value}
                                                onChange={(e) => handlePermissionChange('usuarios', key, e.target.checked)}
                                                className="w-4 h-4 text-[#023672] rounded focus:ring-2 focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-gray-700 dark:text-white capitalize">{key.replace('_', ' ')}</span>
                                        </label>
                                    ))}
                                </div>

                                {/* Sistema */}
                                <div className="bg-gray-50 p-4 rounded-lg dark:text-white dark:bg-gray-600">
                                    <h3 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                                        <Settings className="w-4 h-4 text-[#023672]" />
                                        Sistema
                                    </h3>
                                    {Object.entries(formData.permissions.sistema).map(([key, value]) => (
                                        <label key={key} className="flex items-center gap-2 mb-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={value}
                                                onChange={(e) => handlePermissionChange('sistema', key, e.target.checked)}
                                                className="w-4 h-4 text-[#023672] rounded focus:ring-2 focus:ring-blue-500"
                                            />
                                            <span className="text-sm text-gray-700 dark:text-white capitalize">{key.replace('_', ' ')}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Botones de Acción */}
                        <div className="flex gap-4 pt-6 border-t border-gray-200 dark:border-gray-600">
                            <button
                                type="submit"
                                className="flex-1 bg-[#023672] text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg hover:shadow-xl"
                            >
                                Guardar Usuario
                            </button>
                            <button
                                type="button"
                                onClick={() => window.location.reload()}
                                className="flex-1 bg-gray-200 text-gray-700 dark:text-white dark:bg-gray-900 dark:hover:bg-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                            >
                                Cancelar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}