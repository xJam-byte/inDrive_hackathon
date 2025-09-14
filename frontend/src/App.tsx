import React, { useState } from 'react';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { PassengerHome } from './components/PassengerHome';
import { PassengerSafety } from './components/PassengerSafety';
import { PassengerBooking } from './components/PassengerBooking';
import { DriverHome } from './components/DriverHome';
import { DriverTrip } from './components/DriverTrip';
import { OpsDashboard } from './components/OpsDashboard';
import { Car, Users, BarChart3 } from 'lucide-react';

type Screen = 'menu' | 'passenger-home' | 'passenger-safety' | 'passenger-booking' | 'driver-home' | 'driver-trip' | 'ops-dashboard';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('menu');

  const screens = [
    {
      id: 'passenger-home' as Screen,
      title: 'Passenger / Home',
      description: 'Карта с поиском и тепловой картой спроса',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      id: 'passenger-safety' as Screen,
      title: 'Passenger / Safety',
      description: 'Предупреждение об отклонении маршрута',
      icon: Users,
      color: 'bg-red-500'
    },
    {
      id: 'passenger-booking' as Screen,
      title: 'Passenger / Booking',
      description: 'Подтверждение поездки с рейтингами',
      icon: Users,
      color: 'bg-green-500'
    },
    {
      id: 'driver-home' as Screen,
      title: 'Driver / Home',
      description: 'Карта с бонусными зонами и рекомендациями',
      icon: Car,
      color: 'bg-purple-500'
    },
    {
      id: 'driver-trip' as Screen,
      title: 'Driver / Trip',
      description: 'Активная поездка с предупреждениями',
      icon: Car,
      color: 'bg-orange-500'
    },
    {
      id: 'ops-dashboard' as Screen,
      title: 'Ops Dashboard',
      description: 'Веб-панель с аналитикой и метриками',
      icon: BarChart3,
      color: 'bg-indigo-500'
    }
  ];

  const handleBack = () => {
    setCurrentScreen('menu');
  };

  const handleConfirmBooking = () => {
    alert('Поездка подтверждена! Водитель уже едет к вам.');
    setCurrentScreen('menu');
  };

  if (currentScreen !== 'menu') {
    switch (currentScreen) {
      case 'passenger-home':
        return <PassengerHome onBack={handleBack} />;
      case 'passenger-safety':
        return <PassengerSafety onBack={handleBack} />;
      case 'passenger-booking':
        return <PassengerBooking onBack={handleBack} onConfirm={handleConfirmBooking} />;
      case 'driver-home':
        return <DriverHome onBack={handleBack} />;
      case 'driver-trip':
        return <DriverTrip onBack={handleBack} />;
      case 'ops-dashboard':
        return <OpsDashboard onBack={handleBack} />;
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl mb-2">inDrive Geo Intelligence</h1>
          <p className="text-slate-600">
            Прототип системы анализа геоданных для оптимизации транспортных сервисов
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {screens.map((screen) => {
            const Icon = screen.icon;
            return (
              <Card 
                key={screen.id} 
                className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setCurrentScreen(screen.id)}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 ${screen.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2">{screen.title}</h3>
                    <p className="text-sm text-slate-600 mb-4">
                      {screen.description}
                    </p>
                    <Button size="sm" className="bg-[#21C274] hover:bg-[#21C274]/90">
                      Открыть
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 p-6 bg-white rounded-lg border">
          <h2 className="text-xl mb-4">Ключевые возможности</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="mb-2">📊 Тепловые карты спроса</h4>
              <p className="text-slate-600">Визуализация плотности заявок в режиме реального времени</p>
            </div>
            <div>
              <h4 className="mb-2">🚦 Анализ узких мест</h4>
              <p className="text-slate-600">Определение участков с низкой скоростью движения</p>
            </div>
            <div>
              <h4 className="mb-2">⚠️ Детекция аномалий</h4>
              <p className="text-slate-600">Выявление нестандартных маршрутов и поведения</p>
            </div>
            <div>
              <h4 className="mb-2">💰 Динамические бонусы</h4>
              <p className="text-slate-600">Автоматическое стимулирование водителей в нужных зонах</p>
            </div>
            <div>
              <h4 className="mb-2">🛡️ Индекс комфорта</h4>
              <p className="text-slate-600">Оценка качества поездки на основе телематики</p>
            </div>
            <div>
              <h4 className="mb-2">🌱 Эко-метрики</h4>
              <p className="text-slate-600">Мониторинг экологического воздействия поездок</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}