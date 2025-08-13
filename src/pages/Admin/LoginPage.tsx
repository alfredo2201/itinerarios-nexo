import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { UserProvider } from '../../context/useAuth';
import { useAuth } from '../../context/userContext';
import { useForm } from 'react-hook-form';
type LoginFormValues = {
    username: string;
    password: string;
}

const validation = Yup.object().shape({
    username: Yup.string().required('El nombre de usuario es obligatorio'),
    password: Yup.string().required('La contraseña es obligatoria')
})

function LoginPage() {
    const { loginUser } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({ resolver: yupResolver(validation) });
    return (
        <UserProvider>
            <div className='h-screen bg-[#F2F4F7] flex flex-col items-center'>
                <div className="w-full bg-[#04386c] p-4 flex justify-between items-center text-white pe-8 justify-end">
                    <div className="text-right text-sm">
                        <p className="font-sans text-lg font-bold">Central de autobuses</p>
                        <p className="font-sans text-lg font-bold">Faustino Félix Serna</p>
                    </div>
                </div>
                <div className="flex-col bg-white p-8 rounded-md shadow-xl/30 mt-30 w-full max-w-lg">
                    <div className=" ">
                        <form onSubmit={handleSubmit((form: LoginFormValues) => loginUser(form.username, form.password))} className="space-y-4">
                            <h2 className="text-center text-xl font-[Arial] font-semibold mb-6">Inicio de Sesión</h2>
                            <div className="mb-4">
                                <label htmlFor='username' className="block font-[Arial] text-sm mb-1">Nombre de Usuario</label>
                                <input
                                    id="username"
                                    {...register('username')}
                                    type="text"
                                    autoComplete='username'
                                    placeholder="Ej. jorgegal_663"
                                    className="w-full px-3 py-2 border-2 border-[#D9D9D9] rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                                />
                                {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor='password' className="block font-[Arial] text-sm mb-1">Contraseña</label>
                                <input
                                    id="password"
                                    {...register('password')}
                                    placeholder="********"
                                    type="password"
                                    autoComplete='current-password'
                                    className="w-full px-3 py-2 border-2 border-[#D9D9D9] rounded-lg  focus:outline-none focus:ring focus:border-blue-300"
                                />
                                {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-[#023672] text-white py-2 rounded-lg hover:bg-blue-800 transition-colors"
                            >
                                Iniciar Sesión
                            </button>
                            <div className="mt-4 text-sm text-start">
                                <a href="#" className="text-black hover:underline">
                                    ¿Ha olvidado su contraseña?
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </UserProvider>

    )
}
export default LoginPage;
