import { Save, Moon, Sun, Monitor, Trash2, Plus } from 'lucide-react';
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { InitialView, Theme, type SavedFilter, type UserPreferences } from '../../../models/User';
import { useUser } from '../../../hooks/useUser';
import { updateProfileAPI } from '../../../services/UsersServices';


const SettingsPage = () => {
  const { user } = useUser();
  const [preferences, setPreferences] = useState<UserPreferences>({
    tema: user?.preferencias.tema || Theme.SYSTEM,
    vista_inicial: user?.preferencias.vista_inicial || InitialView.LISTA_ITINERARIOS,
    filtros_guardados: user?.preferencias.filtros_guardados || [],
    notificaciones: {
      nuevos_archivos: user?.preferencias.notificaciones.nuevos_archivos || true,
      actualizaciones_sistema: user?.preferencias.notificaciones.actualizaciones_sistema || true
    }
  });

  const [showNewFilter, setShowNewFilter] = useState(false);
  const [newFilter, setNewFilter] = useState<SavedFilter>({
    nombre: "",
    filtros: {}
  });

  const handleThemeChange = (theme: Theme) => {
    setPreferences({ ...preferences, tema: theme });
    console.log('Tema cambiado a:', theme);
    toast.success('Tema actualizado', {
      style: {
        background: '#1e3a5f',
        color: '#fff',
      },
    });
  };

  const handleInitialViewChange = (view: InitialView) => {
    setPreferences({ ...preferences, vista_inicial: view });
    toast.success('Vista inicial actualizada', {
      style: {
        background: '#1e3a5f',
        color: '#fff',
      },
    });
  };

  const handleNotificationChange = (key: keyof typeof preferences.notificaciones) => {
    setPreferences({
      ...preferences,
      notificaciones: {
        ...preferences.notificaciones,
        [key]: !preferences.notificaciones[key]
      }
    });
  };

  const handleAddFilter = () => {
    if (newFilter.nombre.trim()) {
      setPreferences({
        ...preferences,
        filtros_guardados: [...preferences.filtros_guardados, newFilter]
      });
      setNewFilter({ nombre: "", filtros: {} });
      setShowNewFilter(false);
      toast.success('Filtro guardado correctamente', {
        style: {
          background: '#1e3a5f',
          color: '#fff',
        },
      });
    } else {
      toast.error('El nombre del filtro es requerido', {
        style: {
          background: '#dc2626',
          color: '#fff',
        },
      });
    }
  };

  const handleDeleteFilter = (index: number) => {
    setPreferences({
      ...preferences,
      filtros_guardados: preferences.filtros_guardados.filter((_, i) => i !== index)
    });
    toast.success('Filtro eliminado', {
      style: {
        background: '#1e3a5f',
        color: '#fff',
      },
    });
  };

  const handleSave = () => {
    updateProfileAPI({ preferencias: preferences }).then(() => {
      toast.success('Configuración guardada exitosamente', {
        duration: 4000,
        style: {
          background: '#1e3a5f',
          color: '#fff',
        },
      });
    });

  };

  const getThemeIcon = (theme: Theme) => {
    switch (theme) {
      case Theme.LIGHT:
        return <Sun className="w-4 h-4" />;
      case Theme.DARK:
        return <Moon className="w-4 h-4" />;
      case Theme.SYSTEM:
        return <Monitor className="w-4 h-4" />;
    }
  };

  const getViewLabel = (view: InitialView) => {
    switch (view) {
      case InitialView.LISTA_ITINERARIOS:
        return "Itinerarios";
      case InitialView.MAPA:
        return "Mapa";
      case InitialView.ANUNCIOS:
        return "Anuncios";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <Toaster position="top-right" />
      <div className="max-w-2xl mx-auto">
        {/* Sección: Tema */}
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Apariencia</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {Object.values(Theme).map((theme) => (
              <button
                key={theme}
                onClick={() => handleThemeChange(theme)}
                className={`flex items-center gap-2 px-4 py-2 text-sm border rounded-lg transition-colors ${preferences.tema === theme
                  ? 'border-[#1e3a5f] bg-[#1e3a5f] text-white'
                  : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
              >
                {getThemeIcon(theme)}
                <span className="capitalize">
                  {theme === Theme.LIGHT ? 'Claro' : theme === Theme.DARK ? 'Oscuro' : 'Sistema'}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Sección: Vista Inicial */}
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Vista inicial</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {Object.values(InitialView).map((view) => (
              <button
                key={view}
                onClick={() => handleInitialViewChange(view)}
                className={`px-4 py-2 text-sm border rounded-lg transition-colors ${preferences.vista_inicial === view
                  ? 'border-[#1e3a5f] bg-[#1e3a5f] text-white'
                  : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
              >
                {getViewLabel(view)}
              </button>
            ))}
          </div>
        </div>

        {/* Sección: Filtros Guardados */}
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-medium text-gray-900 dark:text-white">Filtros guardados</h2>
            <button
              onClick={() => setShowNewFilter(!showNewFilter)}
              className="text-sm text-[#1e3a5f] dark:text-blue-400 hover:text-[#152d47] dark:hover:text-blue-300 transition-colors flex items-center gap-1 font-medium"
            >
              <Plus className="w-4 h-4" />
              Nuevo
            </button>
          </div>

          {/* Formulario para nuevo filtro */}
          {showNewFilter && (
            <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg space-y-3 border border-gray-200 dark:border-gray-600">
              <input
                type="text"
                placeholder="Nombre del filtro"
                value={newFilter.nombre}
                onChange={(e) => setNewFilter({ ...newFilter, nombre: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:outline-none focus:border-[#1e3a5f] dark:focus:border-blue-500 focus:ring-1 focus:ring-[#1e3a5f] dark:focus:ring-blue-500"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Empresa"
                  value={newFilter.filtros.empresa || ''}
                  onChange={(e) => setNewFilter({
                    ...newFilter,
                    filtros: { ...newFilter.filtros, empresa: e.target.value }
                  })}
                  className="px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:outline-none focus:border-[#1e3a5f] dark:focus:border-blue-500 focus:ring-1 focus:ring-[#1e3a5f] dark:focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Ruta"
                  value={newFilter.filtros.ruta || ''}
                  onChange={(e) => setNewFilter({
                    ...newFilter,
                    filtros: { ...newFilter.filtros, ruta: e.target.value }
                  })}
                  className="px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 rounded-lg focus:outline-none focus:border-[#1e3a5f] dark:focus:border-blue-500 focus:ring-1 focus:ring-[#1e3a5f] dark:focus:ring-blue-500"
                />
              </div>
              <button
                onClick={handleAddFilter}
                className="w-full px-4 py-2 text-sm bg-[#1e3a5f] dark:bg-blue-600 text-white rounded-lg hover:bg-[#152d47] dark:hover:bg-blue-700 transition-colors"
              >
                Guardar filtro
              </button>
            </div>
          )}

          {/* Lista de filtros */}
          <div className="space-y-2">
            {preferences.filtros_guardados.map((filter, index) => (
              <div key={index} className="p-4 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 rounded-lg hover:border-[#1e3a5f] dark:hover:border-blue-500 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">{filter.nombre}</h3>
                  <button
                    onClick={() => handleDeleteFilter(index)}
                    className="text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-gray-600 dark:text-gray-300">
                  {filter.filtros.empresa && (
                    <span className="px-2 py-1 bg-[#1e3a5f]/10 dark:bg-blue-500/20 text-[#1e3a5f] dark:text-blue-300 rounded">
                      {filter.filtros.empresa}
                    </span>
                  )}
                  {filter.filtros.ruta && (
                    <span className="px-2 py-1 bg-[#1e3a5f]/10 dark:bg-blue-500/20 text-[#1e3a5f] dark:text-blue-300 rounded">
                      {filter.filtros.ruta}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sección: Notificaciones */}
        <div className="mb-8 bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Notificaciones</h2>
          <div className="space-y-3">
            <label className="flex items-center justify-between cursor-pointer group">
              <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                Nuevos archivos
              </span>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={preferences.notificaciones.nuevos_archivos}
                  onChange={() => handleNotificationChange('nuevos_archivos')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 rounded-full peer peer-checked:bg-[#1e3a5f] dark:peer-checked:bg-blue-600 transition-colors"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
              </div>
            </label>
            <label className="flex items-center justify-between cursor-pointer group">
              <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                Actualizaciones del sistema
              </span>
              <div className="relative">
                <input
                  type="checkbox"
                  checked={preferences.notificaciones.actualizaciones_sistema}
                  onChange={() => handleNotificationChange('actualizaciones_sistema')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 rounded-full peer peer-checked:bg-[#1e3a5f] dark:peer-checked:bg-blue-600 transition-colors"></div>
                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
              </div>
            </label>
          </div>
        </div>

        {/* Botón Guardar */}
        <button
          onClick={handleSave}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#1e3a5f] dark:bg-blue-600 text-white text-sm rounded-lg hover:bg-[#152d47] dark:hover:bg-blue-700 transition-colors"
        >
          <Save className="w-4 h-4" />
          Guardar cambios
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;