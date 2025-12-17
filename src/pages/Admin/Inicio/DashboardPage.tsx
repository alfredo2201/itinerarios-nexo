import React, { useState, useMemo } from 'react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Bus, Users, Calendar, TrendingUp } from 'lucide-react';

// Tipos basados en tu frontend
enum SubscriptionPlan {
  BASIC = 'BASIC',
  PREMIUM = 'PREMIUM',
  ENTERPRISE = 'ENTERPRISE'
}

type Company = {
  _id?: string;
  companyName: string;
  image: string;
  webPage?: string;
  numberContact?: string;
  suscriptionPlan?: SubscriptionPlan;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

type Transport = {
  _id?: string;
  companyId: string;
  registration?: string;
  code?: string;
  gpsCode?: string;
  gpsStatus: string;
  lastSeen: Date;
  lastLocation: {
    type: 'Point';
    coordinates: [number, number];
  };
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

type Advertisement = {
  _id?: string;
  companyName: string;
  fileName: string;
  URL?: string;
  repetitions: number;
  expiration: Date;
  format: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

type Itinerary = {
  _id?: string;
  transportationId?: string;
  companyId?: string;
  departureTime: Date;
  origin: {
    name: string;
    longText?: string;
    address?: string;
    coordinates?: { latitude: number; longitude: number };
  };
  destination: {
    name: string;
    longText?: string;
    address?: string;
    coordinates?: { latitude: number; longitude: number };
  };
  company?: Company;
  transport?: Transport;
  estimatedDuration: number;
  status: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// Tipos extendidos para el dashboard
type CompanyWithMetrics = Company & {
  transportCount: number;
  itineraryCount: number;
}

type ChartData = {
  name: string;
  value: number;
}

// Datos de ejemplo
const mockData: {
  companies: CompanyWithMetrics[];
  transportation: Transport[];
  itineraries: Itinerary[];
  advertisements: Advertisement[];
} = {
  companies: [
    { 
      _id: '1', 
      companyName: 'TransExpress', 
      image: 'https://via.placeholder.com/150',
      suscriptionPlan: SubscriptionPlan.PREMIUM, 
      isActive: true, 
      transportCount: 15, 
      itineraryCount: 45 
    },
    { 
      _id: '2', 
      companyName: 'Viajes Rápidos', 
      image: 'https://via.placeholder.com/150',
      suscriptionPlan: SubscriptionPlan.ENTERPRISE, 
      isActive: true, 
      transportCount: 25, 
      itineraryCount: 78 
    },
    { 
      _id: '3', 
      companyName: 'AutoBuses del Norte', 
      image: 'https://via.placeholder.com/150',
      suscriptionPlan: SubscriptionPlan.BASIC, 
      isActive: true, 
      transportCount: 8, 
      itineraryCount: 22 
    },
    { 
      _id: '4', 
      companyName: 'Transporte Seguro', 
      image: 'https://via.placeholder.com/150',
      suscriptionPlan: SubscriptionPlan.PREMIUM, 
      isActive: false, 
      transportCount: 12, 
      itineraryCount: 0 
    },
  ],
  transportation: [
    { 
      _id: '1', 
      code: 'BUS-001', 
      gpsStatus: 'active', 
      companyId: '1', 
      lastSeen: new Date(),
      lastLocation: { type: 'Point', coordinates: [-109.9342, 27.4827] }
    },
    { 
      _id: '2', 
      code: 'BUS-002', 
      gpsStatus: 'active', 
      companyId: '1', 
      lastSeen: new Date(),
      lastLocation: { type: 'Point', coordinates: [-110.9559, 29.0729] }
    },
    { 
      _id: '3', 
      code: 'BUS-003', 
      gpsStatus: 'maintenance', 
      companyId: '2', 
      lastSeen: new Date(),
      lastLocation: { type: 'Point', coordinates: [-110.9559, 29.0729] }
    },
    { 
      _id: '4', 
      code: 'BUS-004', 
      gpsStatus: 'offline', 
      companyId: '2', 
      lastSeen: new Date(Date.now() - 86400000),
      lastLocation: { type: 'Point', coordinates: [-111.0217, 27.9258] }
    },
    { 
      _id: '5', 
      code: 'BUS-005', 
      gpsStatus: 'active', 
      companyId: '3', 
      lastSeen: new Date(),
      lastLocation: { type: 'Point', coordinates: [-109.9342, 27.4827] }
    },
  ],
  itineraries: [
    { 
      _id: '1', 
      status: 'scheduled', 
      departureTime: new Date(), 
      companyId: '1', 
      transportationId: '1',
      origin: { name: 'Ciudad Obregón' }, 
      destination: { name: 'Hermosillo' },
      estimatedDuration: 180
    },
    { 
      _id: '2', 
      status: 'in-progress', 
      departureTime: new Date(), 
      companyId: '1', 
      transportationId: '2',
      origin: { name: 'Hermosillo' }, 
      destination: { name: 'Guaymas' },
      estimatedDuration: 120
    },
    { 
      _id: '3', 
      status: 'completed', 
      departureTime: new Date(Date.now() - 3600000), 
      companyId: '2', 
      transportationId: '3',
      origin: { name: 'Navojoa' }, 
      destination: { name: 'Los Mochis' },
      estimatedDuration: 240
    },
    { 
      _id: '4', 
      status: 'scheduled', 
      departureTime: new Date(), 
      companyId: '2', 
      transportationId: '4',
      origin: { name: 'Guaymas' }, 
      destination: { name: 'Ciudad Obregón' },
      estimatedDuration: 120
    },
    { 
      _id: '5', 
      status: 'cancelled', 
      departureTime: new Date(), 
      companyId: '3', 
      transportationId: '5',
      origin: { name: 'Hermosillo' }, 
      destination: { name: 'Nogales' },
      estimatedDuration: 180
    },
  ],
  advertisements: [
    { 
      _id: '1', 
      companyName: 'Coca-Cola', 
      fileName: 'coca-cola-ad.mp4',
      status: 'active', 
      repetitions: 150, 
      expiration: new Date(Date.now() + 86400000 * 30),
      format: 'video/mp4'
    },
    { 
      _id: '2', 
      companyName: 'Pepsi', 
      fileName: 'pepsi-ad.mp4',
      status: 'active', 
      repetitions: 120, 
      expiration: new Date(Date.now() + 86400000 * 15),
      format: 'video/mp4'
    },
    { 
      _id: '3', 
      companyName: 'Bimbo', 
      fileName: 'bimbo-ad.jpg',
      status: 'expired', 
      repetitions: 200, 
      expiration: new Date(Date.now() - 86400000 * 5),
      format: 'image/jpeg'
    },
  ]
};

const Dashboard: React.FC = () => {
  const [selectedView, setSelectedView] = useState<string>('overview');

  // Cálculos de métricas
  const metrics = useMemo(() => {
    const activeCompanies = mockData.companies.filter(c => c.isActive).length;
    const totalTransports = mockData.transportation.length;
    const activeTransports = mockData.transportation.filter(t => t.gpsStatus === 'active').length;
    const todayItineraries = mockData.itineraries.filter(i => i.status !== 'cancelled').length;
    const activeAds = mockData.advertisements.filter(a => a.status === 'active').length;

    return {
      activeCompanies,
      totalTransports,
      activeTransports,
      todayItineraries,
      activeAds,
      transportUtilization: ((activeTransports / totalTransports) * 100).toFixed(1)
    };
  }, []);

  // Datos para gráficos con tipado explícito
  const subscriptionData = useMemo((): ChartData[] => {
    const plans: Record<string, number> = {};
    mockData.companies.forEach(company => {
      const plan = company.suscriptionPlan || SubscriptionPlan.BASIC;
      plans[plan] = (plans[plan] || 0) + 1;
    });
    return Object.entries(plans).map(([name, value]) => ({ name, value }));
  }, []);

  const gpsStatusData = useMemo((): ChartData[] => {
    const statuses: Record<string, number> = {};
    mockData.transportation.forEach(transport => {
      statuses[transport.gpsStatus] = (statuses[transport.gpsStatus] || 0) + 1;
    });
    return Object.entries(statuses).map(([name, value]) => ({ name, value }));
  }, []);

  const itineraryStatusData = useMemo((): ChartData[] => {
    const statuses: Record<string, number> = {};
    mockData.itineraries.forEach(itinerary => {
      statuses[itinerary.status] = (statuses[itinerary.status] || 0) + 1;
    });
    return Object.entries(statuses).map(([name, value]) => ({ name, value }));
  }, []);

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  return (
    <div className="min-h-screen bg-gray-50 p-6 dark:bg-gray-900 ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 dark:text-white">Dashboard de Transporte</h1>
          <p className="text-gray-600 dark:text-white">Monitoreo en tiempo real de operaciones</p>
        </div>

        {/* Métricas principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            icon={<Bus className="w-6 h-6" />}
            title="Transportes Activos"
            value={`${metrics.activeTransports}/${metrics.totalTransports}`}
            subtitle={`${metrics.transportUtilization}% en operación`}
            color="blue"
          />
          <MetricCard
            icon={<Calendar className="w-6 h-6" />}
            title="Itinerarios Hoy"
            value={metrics.todayItineraries.toString()}
            subtitle="Viajes programados"
            color="green"
          />
          <MetricCard
            icon={<Users className="w-6 h-6" />}
            title="Empresas Activas"
            value={metrics.activeCompanies.toString()}
            subtitle={`de ${mockData.companies.length} total`}
            color="purple"
          />
          <MetricCard
            icon={<TrendingUp className="w-6 h-6" />}
            title="Anuncios Activos"
            value={metrics.activeAds.toString()}
            subtitle="Campañas en curso"
            color="orange"
          />
        </div>

        {/* Navegación de vistas */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {['overview'].map((view) => (
            <button
              key={view}
              onClick={() => setSelectedView(view)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${
                selectedView === view
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {view === 'overview' && 'Resumen'}
            </button>
          ))}
        </div>

        {/* Vista de Resumen */}
        {selectedView === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ChartCard title="Planes de Suscripción">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={subscriptionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {subscriptionData.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Estado GPS de Transportes">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={gpsStatusData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Estado de Itinerarios">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={itineraryStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {itineraryStatusData.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </ChartCard>

            <ChartCard title="Actividad por Empresa">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mockData.companies.filter(c => c.isActive)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="companyName" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="transportCount" fill="#3b82f6" name="Transportes" />
                  <Bar dataKey="itineraryCount" fill="#10b981" name="Itinerarios" />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          </div>
        )}
      </div>
    </div>
  );
};

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  subtitle: string;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

const MetricCard: React.FC<MetricCardProps> = ({ icon, title, value, subtitle, color }) => {
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    orange: 'bg-orange-500'
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`${colorClasses[color]} text-white p-3 rounded-lg`}>
          {icon}
        </div>
      </div>
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  );
};

interface ChartCardProps {
  title: string;
  children: React.ReactNode;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, children }) => (
  <div className="bg-white rounded-lg shadow p-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
    {children}
  </div>
);

export default Dashboard;