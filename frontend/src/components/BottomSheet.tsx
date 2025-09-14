import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Star, Clock, MapPin } from 'lucide-react';

interface Driver {
  id: string;
  name: string;
  rating: number;
  eta: string;
  distance: string;
  comfort: number;
  eco: string;
}

interface BottomSheetProps {
  type: 'drivers' | 'metrics';
  drivers?: Driver[];
  children?: React.ReactNode;
  className?: string;
}

export function BottomSheet({ type, drivers = [], children, className = "" }: BottomSheetProps) {
  const mockDrivers: Driver[] = [
    { id: '1', name: 'Азамат', rating: 4.9, eta: '3 мин', distance: '200 м', comfort: 87, eco: 'A' },
    { id: '2', name: 'Дамир', rating: 4.8, eta: '5 мин', distance: '400 м', comfort: 92, eco: 'A' },
    { id: '3', name: 'Серик', rating: 4.7, eta: '7 мин', distance: '600 м', comfort: 85, eco: 'B' },
  ];

  const displayDrivers = drivers.length > 0 ? drivers : mockDrivers;

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl border-t ${className}`}>
      {/* Handle */}
      <div className="flex justify-center py-3">
        <div className="w-10 h-1 bg-slate-300 rounded-full"></div>
      </div>

      <div className="px-4 pb-6">
        {type === 'drivers' && (
          <>
            <h3 className="mb-4">Ближайшие водители</h3>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {displayDrivers.map((driver) => (
                <Card key={driver.id} className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-[#21C274] rounded-full flex items-center justify-center">
                        <span className="text-white">{driver.name[0]}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span>{driver.name}</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-slate-600">{driver.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 mt-1">
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
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                        Comfort {driver.comfort}
                      </Badge>
                      <Badge variant="secondary" className="bg-green-50 text-green-700">
                        Eco {driver.eco}
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}
        
        {children}
      </div>
    </div>
  );
}