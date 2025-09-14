import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { DriverBadge } from './DriverBadge';
import { Star, Clock, MapPin, ArrowLeft } from 'lucide-react';

interface PassengerBookingProps {
  onBack: () => void;
  onConfirm: () => void;
}

export function PassengerBooking({ onBack, onConfirm }: PassengerBookingProps) {
  const driver = {
    name: 'Азамат',
    rating: 4.9,
    car: 'BMW X3',
    plate: 'A 123 BC 02',
    eta: '3 мин',
    distance: '200 м',
    comfort: 92,
    eco: 'A',
    price: '2,500 ₸'
  };

  return (
    <div className="h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1>Подтверждение поездки</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 space-y-6">
        {/* Route info */}
        <Card className="p-4">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-[#21C274] rounded-full"></div>
              <div>
                <div className="font-medium">Торговый центр Mega</div>
                <div className="text-sm text-slate-600">ул. Кабанбай батыра, 42</div>
              </div>
            </div>
            <div className="ml-6 h-8 w-0.5 bg-slate-200"></div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div>
                <div className="font-medium">Аэропорт Астана</div>
                <div className="text-sm text-slate-600">Международный аэропорт</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Driver info */}
        <Card className="p-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-[#21C274] rounded-full flex items-center justify-center">
              <span className="text-white text-xl">{driver.name[0]}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium">{driver.name}</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-slate-600">{driver.rating}</span>
                </div>
              </div>
              <div className="text-sm text-slate-600">{driver.car} • {driver.plate}</div>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1 text-sm text-slate-600">
                  <Clock className="w-3 h-3" />
                  {driver.eta}
                </div>
                <div className="flex items-center gap-1 text-sm text-slate-600">
                  <MapPin className="w-3 h-3" />
                  {driver.distance}
                </div>
              </div>
            </div>
          </div>
          
          <DriverBadge comfort={driver.comfort} eco={driver.eco} size="md" />
        </Card>

        {/* Trip details */}
        <Card className="p-4">
          <h3 className="mb-3">Детали поездки</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-600">Расстояние</span>
              <span>~15 км</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Время в пути</span>
              <span>~20 мин</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-600">Стоимость</span>
              <span className="font-medium">{driver.price}</span>
            </div>
          </div>
        </Card>

        {/* Environmental impact */}
        <Card className="p-4 bg-green-50 border-green-200">
          <h4 className="text-green-800 mb-2">🌱 Экологический эффект</h4>
          <div className="text-sm text-green-700">
            <div>CO₂ сохранено: ~3.2 кг</div>
            <div>vs. личный автомобиль</div>
          </div>
        </Card>
      </div>

      {/* Bottom CTA */}
      <div className="p-4 bg-white border-t">
        <Button 
          className="w-full py-4 bg-[#21C274] hover:bg-[#21C274]/90"
          onClick={onConfirm}
        >
          Подтвердить поездку за {driver.price}
        </Button>
      </div>
    </div>
  );
}