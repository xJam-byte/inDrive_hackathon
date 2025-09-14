import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { MapComponent } from './MapComponent';
import { LayerToggle } from './LayerToggle';
import { BottomSheet } from './BottomSheet';
import { Search, Navigation, ArrowLeft } from 'lucide-react';

interface PassengerHomeProps {
  onBack: () => void;
}

export function PassengerHome({ onBack }: PassengerHomeProps) {
  const [layers, setLayers] = useState({
    heatmap: true,
    lowSpeed: false,
    routes: false,
    anomalies: false,
    risk: false,
    incentives: false,
  });

  const handleLayerToggle = (layer: string) => {
    setLayers(prev => ({
      ...prev,
      [layer]: !prev[layer as keyof typeof prev]
    }));
  };

  return (
    <div className="h-screen bg-slate-50 relative">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-white shadow-sm">
        <div className="flex items-center gap-3 p-4">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input 
              placeholder="Куда едем?" 
              className="pl-10 pr-4 py-3 rounded-2xl border-slate-200 bg-slate-50"
            />
          </div>
        </div>
      </div>

      {/* Map */}
      <MapComponent 
        layers={layers} 
        className="absolute inset-0 pt-20"
      >
        {/* Hot spot marker */}
        <div className="absolute top-48 left-32">
          <div className="relative">
            <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
            <div className="absolute -top-12 -left-16 bg-white px-3 py-2 rounded-lg shadow-lg border text-xs whitespace-nowrap">
              <div className="text-slate-900">Горячая точка</div>
              <div className="text-slate-600">Пройдите 200 м</div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
            </div>
          </div>
        </div>

        {/* Current location */}
        <div className="absolute top-80 left-48">
          <div className="w-6 h-6 bg-[#2B7BFF] rounded-full border-4 border-white shadow-lg flex items-center justify-center">
            <Navigation className="w-3 h-3 text-white" />
          </div>
        </div>
      </MapComponent>

      {/* Layer Toggle FAB */}
      <LayerToggle 
        layers={layers} 
        onToggle={handleLayerToggle} 
        variant="fab" 
      />

      {/* Bottom Sheet */}
      <BottomSheet type="drivers" />
    </div>
  );
}