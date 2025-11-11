import { Wrench } from 'lucide-react';

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1e3a5f] rounded-full mb-6 animate-bounce">
          <Wrench className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-light text-gray-900 mb-2">
          Trabajando en ello
        </h1>
        <p className="text-sm text-gray-500">
          Esta funcionalidad estará disponible pronto
        </p>
      </div>
    </div>
  );
};
