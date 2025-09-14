import React from 'react';
import { Button } from './ui/button';
import { MapComponent } from './MapComponent';
import { DriverBadge } from './DriverBadge';
import { Card } from './ui/card';
import { Navigation, ArrowLeft, AlertTriangle } from 'lucide-react';

interface DriverTripProps {
  onBack: () => void;
}

export function DriverTrip({ onBack }: DriverTripProps) {
  const layers = {
    heatmap: false,
    lowSpeed: true,
    routes: false,
    anomalies: false,
    risk: true,
    incentives: false,
  };

  const trip = {
    eta: '15 мин',
    distance: '8.2 км',
    passenger: 'Айгуль',
    destination: 'Аэропорт Астана'
  };

  return (
    <div className="h-screen bg-slate-50 relative">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-white shadow-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1>В поездке</h1>
              <p className="text-sm text-slate-600">{trip.passenger} → {trip.destination}</p>
            </div>
          </div>
          <Button size="sm" className="bg-red-500 hover:bg-red-600">
            Завершить
          </Button>
        </div>
      </div>

      {/* Trip info bar */}
      <div className="absolute top-16 left-0 right-0 z-20 bg-[#21C274] text-white px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span>ETA: {trip.eta}</span>
            <span>Осталось: {trip.distance}</span>
          </div>
          <DriverBadge comfort={84} eco="A" size="sm" />
        </div>
      </div>

      {/* Risk zone alert */}
      <div className="absolute top-28 left-4 right-4 z-20">
        <Card className="p-3 bg-red-50 border-red-200">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="text-red-700 text-sm">
              Впереди зона риска через 500 м. Снизьте скорость.
            </p>
          </div>
        </Card>
      </div>

      {/* Map with route */}
      <MapComponent 
        layers={layers} 
        className="absolute inset-0 pt-40"
      >
        {/* Active route */}
        <div className="absolute inset-0">
          <svg width="100%" height="100%" viewBox="0 0 400 600">
            <defs>
              <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#21C274"/>
                <stop offset="60%" stopColor="#21C274"/>
                <stop offset="80%" stopColor="#FFA500"/>
                <stop offset="100%" stopColor="#FF6B6B"/>
              </linearGradient>
            </defs>
            <path 
              d="M50 500 Q150 400 200 300 Q280 200 350 100" 
              stroke="url(#routeGradient)" 
              strokeWidth="6" 
              fill="none"
            />
          </svg>
        </div>

        {/* Current location */}
        <div className="absolute top-96 left-36">
          <div className="w-8 h-8 bg-[#2B7BFF] rounded-full border-4 border-white shadow-lg flex items-center justify-center">
            <Navigation className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Destination */}
        <div className="absolute top-32 right-12">
          <div className="w-8 h-8 bg-red-500 rounded-full border-4 border-white shadow-lg flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
        </div>

        {/* Speed indicator on route */}
        <div className="absolute top-56 left-56">
          <div className="bg-orange-500 text-white px-2 py-1 rounded text-xs">
            ≤5 км/ч
          </div>
        </div>
      </MapComponent>

      {/* Bottom passenger info */}
      <div className="absolute bottom-0 left-0 right-0 bg-white p-4 rounded-t-2xl shadow-2xl border-t">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white">{trip.passenger[0]}</span>
          </div>
          <div className="flex-1">
            <h3>{trip.passenger}</h3>
            <p className="text-slate-600 text-sm">{trip.destination}</p>
          </div>
          <div className="text-right">
            <div className="text-lg">2,500 ₸</div>
            <div className="text-green-600 text-sm">На маршруте</div>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-slate-600">Comfort score</div>
            <div className="text-lg text-blue-600">84/100</div>
          </div>
          <div>
            <div className="text-slate-600">Eco rank</div>
            <div className="text-lg text-green-600">A</div>
          </div>
        </div>
      </div>
    </div>
  );
}