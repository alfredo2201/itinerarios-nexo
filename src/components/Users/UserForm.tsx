import { useState } from "react";
import { Department, UserRole } from "../../models/User";
import { validateConfirmPassword, validatePassword } from "../../utils/validations";

import { handleError } from "../../helpers/ErrorHandler";
import type { FormDataUser } from "../../types/user.types";
import { registerUserAPI } from "../../services/AuthService";
import toast from "react-hot-toast";


interface ModalFormProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function UserForm({ isOpen, onClose }: ModalFormProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState<FormDataUser>({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: UserRole.VISUALIZADOR,
        permissions: {
            archivos: {
                subir: false,
                eliminar: false,
                descargar: false
            },
            itinerarios: {
                ver_todos: false,
                ver_detalles: false,
                buscar_filtrar: false
            },
            usuarios: {
                crear: false,
                editar: false,
                eliminar: false,
                ver_lista: false
            },
            sistema: {
                configuracion: false,
                logs_archivos: false
            }
        },
        empresaInfo: {
            empresa: '',
            cargo: '',
            departamento: undefined,
            acceso_restringido: false,
            empresas_permitidas: []
        }
    });

    const totalSteps = 3;

    if (!isOpen) return null;

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

    const handleNext = () => {
        if (currentStep <= totalSteps) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Datos del formulario:', formData);
        try {
            registerUserAPI(formData).then(() => {
                // Aquí puedes agregar alguna notificación de éxito si lo deseas
                toast.success('Usuario registrado con éxito');
            }).finally(() => {
                onClose();
                setCurrentStep(1);
                setFormData({
                    firstName: '',
                    lastName: '',
                    phone: '',
                    email: '',
                    password: '',
                    confirmPassword: '',
                    role: UserRole.VISUALIZADOR,
                    permissions: {
                        archivos: {
                            subir: false,
                            eliminar: false,
                            descargar: false
                        },
                        itinerarios: {
                            ver_todos: false,
                            ver_detalles: false,
                            buscar_filtrar: false
                        },
                        usuarios: {
                            crear: false,
                            editar: false,
                            eliminar: false,
                            ver_lista: false
                        },
                        sistema: {
                            configuracion: false,
                            logs_archivos: false
                        }
                    },
                    empresaInfo: {
                        empresa: '',
                        cargo: '',
                        departamento: undefined,
                        acceso_restringido: false,
                        empresas_permitidas: []
                    }
                })
            })
        } catch (error) {
            handleError(error)
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-h-[600px] overflow-y-auto p-6 mx-10 relative animate-fadeIn">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-2xl cursor-pointer"
                >
                    ✕
                </button>

                <h2 className="text-2xl font-semibold mb-4 text-center">Usuarios</h2>

                {/* Progress Bar */}
                <div className="mb-6 px-30 2xl:px-100">
                    <div className="flex mb-2 mx-2 translate-x-26 2xl:translate-x-28 overflow-x-auto scrollbar-hide">
                        {[1, 2, 3].map((step) => (
                            <div key={step} className={`flex items-center flex-1`}>
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold animate-fadeUp ${currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                                    }`}>
                                    {step}
                                </div>
                                {step < 3 && (
                                    <div className={`flex-1 h-1 mx-3  ${currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                                        }`} />
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between text-xs text-gray-600 mx-20">
                        <span>Información Personal</span>
                        <span>Permisos y Rol</span>
                        <span>Información Laboral</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Paso 1: Información Personal */}
                    {currentStep === 1 && (
                        <div className="h-64 grid grid-cols-2 gap-4 animate-fadeIn">
                            <div>
                                <label htmlFor="firstName">Nombre:</label>
                                <input
                                    className="h-10 w-full rounded-md border border-gray-300 px-3"
                                    type="text"
                                    id="firstName"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="lastName">Apellido:</label>
                                <input
                                    className="h-10 w-full rounded-md border border-gray-300 px-3"
                                    type="text"
                                    id="lastName"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="phone">Teléfono:</label>
                                <input
                                    className="h-10 w-full rounded-md border border-gray-300 px-3"
                                    type="tel"
                                    id="phone"
                                    autoComplete="off"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <label htmlFor="email">Correo Electrónico:</label>
                                <input
                                    className="h-10 w-full rounded-md border border-gray-300 px-3"
                                    type="email"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    autoComplete="off"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password">Contraseña:</label>
                                <div className="relative">
                                    <input
                                        className="h-10 w-full rounded-md border border-gray-300 px-3 pr-10"
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        autoComplete="off"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-2 top-2 text-gray-500"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        tabIndex={-1}
                                    >
                                        {showPassword ?
                                            <img
                                                className="h-6"
                                                src="https://res.cloudinary.com/dazthovzk/image/upload/v1761761219/invisible_tut4a8.png"
                                                alt="Ocultar contraseña"
                                            /> :
                                            <img
                                                className="h-6"
                                                src="https://res.cloudinary.com/dazthovzk/image/upload/v1761761215/ojo_xnucvi.png"
                                                alt="Mostrar contraseña"
                                            />}
                                    </button>
                                </div>
                                {formData.password && formData.confirmPassword !== undefined && (
                                    <div className="text-red-500 text-xs mt-1">
                                        {validatePassword(formData.password) ? '' : 'La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una minúscula, un número y un carácter especial.'}
                                    </div>
                                )}
                            </div>
                            <div>
                                <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
                                <div className="relative">
                                    <input
                                        className="h-10 w-full rounded-md border border-gray-300 px-3 pr-10"
                                        type={showConfirmPassword ? "text" : "password"}
                                        id="confirmPassword"
                                        value={formData.confirmPassword || ""}
                                        onChange={handleInputChange}
                                        required
                                        autoComplete="off"
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-2 top-2 text-gray-500"
                                        onClick={() => setShowConfirmPassword((prev) => !prev)}
                                        tabIndex={-1}
                                    >
                                        {showConfirmPassword ?
                                            <img
                                                className="h-6"
                                                src="https://res.cloudinary.com/dazthovzk/image/upload/v1761761219/invisible_tut4a8.png"
                                                alt="Ocultar contraseña"
                                            /> :
                                            <img
                                                className="h-6"
                                                src="https://res.cloudinary.com/dazthovzk/image/upload/v1761761215/ojo_xnucvi.png"
                                                alt="Mostrar contraseña"
                                            />}
                                    </button>
                                </div>
                                {/* Mensaje de error de validación */}
                                {formData.password && formData.confirmPassword !== undefined && (
                                    <div className="text-red-500 text-xs mt-1">
                                        {validateConfirmPassword(formData.password, formData.confirmPassword)}
                                    </div>
                                )}
                            </div>
                        </div>

                    )}

                    {/* Paso 2: Permisos y Rol */}
                    {currentStep === 2 && (
                        <div className="grid grid-cols-2 gap-4 mb-4 animate-fadeIn">
                            <div className="flex flex-col">
                                <label htmlFor="role">Rol:</label>
                                <select
                                    className="h-10 rounded-md border border-gray-300 px-3"
                                    id="role"
                                    value={formData.role}
                                    onChange={handleInputChange}
                                    required
                                >
                                    {Object.entries(UserRole).map(([key, value]) => (
                                        <option key={key} value={value}>{value}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="permissions">Permisos:</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="gap-2">
                                        Archivos:
                                        <div className="gap-2">
                                            <label className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.permissions.archivos.subir}
                                                    onChange={(e) => handlePermissionChange('archivos', 'subir', e.target.checked)}
                                                />
                                                Subir
                                            </label>
                                        </div>
                                        <div>
                                            <label className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.permissions.archivos.eliminar}
                                                    onChange={(e) => handlePermissionChange('archivos', 'eliminar', e.target.checked)}
                                                />
                                                Eliminar
                                            </label>
                                        </div>
                                        <div>
                                            <label className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.permissions.archivos.descargar}
                                                    onChange={(e) => handlePermissionChange('archivos', 'descargar', e.target.checked)}
                                                />
                                                Descargar
                                            </label>
                                        </div>
                                    </div>
                                    <div className="gap-2">
                                        Itinerarios:
                                        <div>
                                            <label
                                                className="flex items-center gap-2"
                                                htmlFor="itinerarios-ver-todos">
                                                <input
                                                    id="itinerarios-ver-todos"
                                                    type="checkbox"
                                                    checked={formData.permissions.itinerarios.ver_todos}
                                                    onChange={(e) => handlePermissionChange('itinerarios', 'ver_todos', e.target.checked)}
                                                />
                                                Ver Todos
                                            </label>
                                        </div>
                                        <div>
                                            <label className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.permissions.itinerarios.ver_detalles}
                                                    onChange={(e) => handlePermissionChange('itinerarios', 'ver_detalles', e.target.checked)}
                                                />
                                                Ver detalles</label>
                                        </div>
                                        <div>
                                            <label className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.permissions.itinerarios.buscar_filtrar}
                                                    onChange={(e) => handlePermissionChange('itinerarios', 'buscar_filtrar', e.target.checked)}
                                                />Buscar/Filtrar
                                            </label>
                                        </div>
                                    </div>
                                    <div className="gap-2">
                                        Usuarios:
                                        <div>
                                            <label className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.permissions.usuarios.ver_lista}
                                                    onChange={(e) => handlePermissionChange('usuarios', 'ver_lista', e.target.checked)}
                                                />
                                                Ver Lista
                                            </label>
                                        </div>
                                        <div>

                                            <label className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.permissions.usuarios.crear}
                                                    onChange={(e) => handlePermissionChange('usuarios', 'crear', e.target.checked)}
                                                />
                                                Crear
                                            </label>
                                        </div>
                                        <div>
                                            <label className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.permissions.usuarios.editar}
                                                    onChange={(e) => handlePermissionChange('usuarios', 'editar', e.target.checked)}
                                                />
                                                Editar
                                            </label>
                                        </div>
                                        <div>

                                            <label className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.permissions.usuarios.eliminar}
                                                    onChange={(e) => handlePermissionChange('usuarios', 'eliminar', e.target.checked)}
                                                />Eliminar
                                            </label>
                                        </div>
                                    </div>
                                    <div className="gap-2">
                                        Sistema:
                                        <div>

                                            <label className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.permissions.sistema.configuracion}
                                                    onChange={(e) => handlePermissionChange('sistema', 'configuracion', e.target.checked)}
                                                />Configuración
                                            </label>
                                        </div>
                                        <div>

                                            <label className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.permissions.sistema.logs_archivos}
                                                    onChange={(e) => handlePermissionChange('sistema', 'logs_archivos', e.target.checked)}
                                                />Logs de Archivos
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Paso 3: Información Laboral */}
                    {currentStep === 3 && (
                        <div>
                            <div className="h-64 grid grid-cols-2 gap-4 animate-fadeIn">
                                <div>
                                    <label htmlFor="empresa">Empresa:</label>
                                    <input
                                        id="empresa"
                                        className="h-10 w-full rounded-md border border-gray-300 px-3"
                                        type="text"
                                        value={formData.empresaInfo.empresa || ''}
                                        onChange={(e) => handleEmpresaInfoChange('empresa', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="cargo">Cargo:</label>
                                    <input
                                        id="cargo"
                                        className="h-10 w-full rounded-md border border-gray-300 px-3"
                                        type="text"
                                        value={formData.empresaInfo.cargo || ''}
                                        onChange={(e) => handleEmpresaInfoChange('cargo', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="department">Departamento:</label>
                                    <select
                                        id="department"
                                        className="h-10 w-full rounded-md border border-gray-300 px-3"
                                        value={formData.empresaInfo.departamento || ''}
                                        onChange={(e) => handleEmpresaInfoChange('departamento', e.target.value as Department)}
                                    >
                                        <option value="">Seleccionar...</option>
                                        {Object.entries(Department).map(([key, value]) => (
                                            <option key={key} value={value}>{value}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex">
                                    <label htmlFor="acceso_restringido" className="flex self-center gap-2">
                                        <input
                                            id="acceso_restringido"
                                            type="checkbox"
                                            checked={formData.empresaInfo.acceso_restringido}
                                            onChange={(e) => handleEmpresaInfoChange('acceso_restringido', e.target.checked)}
                                        />
                                        Acceso Restringido
                                    </label>
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="empresas_permitidas">Empresas Permitidas (separadas por coma):</label>
                                    <input
                                        id="empresas_permitidas"
                                        className="h-10 w-full rounded-md border border-gray-300 px-3"
                                        type="text"
                                        value={formData.empresaInfo.empresas_permitidas.join(', ')}
                                        onChange={(e) => handleEmpresaInfoChange('empresas_permitidas', e.target.value.split(',').map(s => s.trim()))}
                                        placeholder="Empresa1, Empresa2, Empresa3"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Botones de navegación */}
                    <div className="flex justify-between mt-6 pt-4 border-t">
                        <button
                            type="button"
                            onClick={handlePrev}
                            disabled={currentStep === 1}
                            className={`px-6 py-2 rounded-md font-medium ${currentStep === 1
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                                }`}
                        >
                            Anterior
                        </button>

                        {currentStep <= totalSteps ? (
                            <button
                                type="button"
                                onClick={handleNext}
                                className="px-6 py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700"
                            >
                                Siguiente
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="px-6 py-2 bg-green-600 text-white rounded-md font-medium hover:bg-green-700"
                            >
                                Guardar
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}