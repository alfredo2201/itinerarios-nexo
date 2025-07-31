function LoginForm() {
  return (
    <div className="flex-col bg-white p-8 rounded-md shadow-xl/30 mt-30 w-full max-w-lg">
      <div className=" ">
        <form>
          <h2 className="text-center text-xl font-[Arial] font-semibold mb-6">Inicio de Sesión</h2>
          <div className="mb-4">
            <label className="block font-[Arial] text-sm mb-1">Nombre de Usuario</label>
            <input
              type="text"
              placeholder="Ej. jorgegal_663"
              className="w-full px-3 py-2 border-2 border-[#D9D9D9] rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block font-[Arial] text-sm mb-1">Contraseña</label>
            <input
              type="password"
              className="w-full px-3 py-2 border-2 border-[#D9D9D9] rounded-lg  focus:outline-none focus:ring focus:border-blue-300"
            />
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
  )
}

export default LoginForm;