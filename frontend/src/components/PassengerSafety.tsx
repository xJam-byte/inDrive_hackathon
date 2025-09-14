import React from 'react';
import { Button } from './ui/button';
import { MapComponent } from './MapComponent';
import { SafetyBanner } from './SafetyBanner';
import { Navigation, ArrowLeft } from 'lucide-react';

interface PassengerSafetyProps {
  onBack: () => void;
}

export function PassengerSafety({ onBack }: PassengerSafetyProps) {
  const layers = {
    heatmap: false,
    lowSpeed: false,
    routes: false,
    anomalies: false,
    risk: false,
    incentives: false,
  };

  const handleContact = () => {
    alert('Connecting to driver...');
  };

  const handleShare = () => {
    alert('Sharing trip details...');
  };

  return (
    <div className="h-screen bg-slate-50 relative">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-white shadow-sm">
        <div className="flex items-center gap-3 p-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1>В пути</h1>
        </div>
      </div>

      {/* Safety Banner */}
      <div className="absolute top-16 left-0 right-0 z-20">
        <SafetyBanner 
          message="Маршрут отклоняется от типового. Уточните у водителя причину."
          onContact={handleContact}
          onShare={handleShare}
        />
      </div>

      {/* Map with route deviation */}
      <MapComponent 
        layers={layers} 
        className="absolute inset-0 pt-32"
      >
        {/* Standard route corridor (dashed) */}
        <div className="absolute inset-0">
          <svg width="100%" height="100%" viewBox="0 0 400 600">
            <defs>
              <pattern id="dashed" patternUnits="userSpaceOnUse" width="8" height="8">
                <rect width="4" height="8" fill="#8b5cf6" opacity="0.6"/>
              </pattern>
            </defs>
            <path 
              d="M50 500 Q150 400 200 300 Q250 200 350 100" 
              stroke="url(#dashed)" 
              strokeWidth="20" 
              fill="none"
              opacity="0.4"
            />
          </svg>
        </div>

        {/* Current route (green) */}
        <div className="absolute inset-0">
          <svg width="100%" height="100%" viewBox="0 0 400 600">
            <path 
              d="M50 500 Q100 450 150 350 Q180 280 220 200 Q280 150 350 100" 
              stroke="#21C274" 
              strokeWidth="6" 
              fill="none"
            />
          </svg>
        </div>

        {/* Current location */}
        <div className="absolute top-96 left-36">
          <div className="w-6 h-6 bg-[#2B7BFF] rounded-full border-4 border-white shadow-lg flex items-center justify-center">
            <Navigation className="w-3 h-3 text-white" />
          </div>
        </div>

        {/* Destination */}
        <div className="absolute top-32 right-12">
          <div className="w-8 h-8 bg-red-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
        </div>
      </MapComponent>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 bg-white p-4 rounded-t-2xl shadow-2xl border-t">
        <div className="text-center mb-4">
          <h3>Поездка в аэропорт</h3>
          <p className="text-slate-600">Азамат • BMW X3 • A 123 BC 02</p>
        </div>
        
        <div className="flex justify-between items-center text-sm text-slate-600 mb-4">
          <div>
            <div>ETA: 12 мин</div>
            <div>Осталось: 8.2 км</div>
          </div>
          <div className="text-right">
            <div>Стоимость: 2,500 ₸</div>
            <div className="text-green-600">На маршруте</div>
          </div>
        </div>
      </div>
    </div>
  );
}