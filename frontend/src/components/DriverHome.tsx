import React, { useState } from 'react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { MapComponent } from './MapComponent';
import { LayerToggle } from './LayerToggle';
import { IncentiveChip } from './IncentiveChip';
import { Card } from './ui/card';
import { ArrowLeft, Target } from 'lucide-react';

interface DriverHomeProps {
  onBack: () => void;
}

export function DriverHome({ onBack }: DriverHomeProps) {
  const [isOnline, setIsOnline] = useState(true);
  const [layers, setLayers] = useState({
    heatmap: true,
    lowSpeed: true,
    routes: false,
    anomalies: false,
    risk: true,
    incentives: true,
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
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1>Водитель</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className={`text-sm ${isOnline ? 'text-green-600' : 'text-slate-600'}`}>
              {isOnline ? 'Онлайн' : 'Оффлайн'}
            </span>
            <Switch checked={isOnline} onCheckedChange={setIsOnline} />
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="absolute top-16 left-0 right-0 z-20 bg-[#21C274] text-white px-4 py-2">
        <div className="flex items-center justify-between">
          <span>Заявок за день: 12</span>
          <span>Заработано: 28,500 ₸</span>
        </div>
      </div>

      {/* Map */}
      <MapComponent 
        layers={layers} 
        className="absolute inset-0 pt-24"
      >
        {/* Incentive zone labels */}
        <div className="absolute top-20 left-16">
          <IncentiveChip bonus="+20%" timeLeft="30 мин" variant="timer" />
        </div>
        
        <div className="absolute top-64 right-16">
          <IncentiveChip bonus="+15%" timeLeft="45 мин" variant="timer" />
        </div>

        {/* Driver location */}
        <div className="absolute top-80 left-48">
          <div className="w-8 h-8 bg-[#2B7BFF] rounded-full border-4 border-white shadow-lg flex items-center justify-center">
            <Target className="w-4 h-4 text-white" />
          </div>
        </div>
      </MapComponent>

      {/* Layer controls */}
      <div className="absolute top-28 left-0 right-0 z-20">
        <LayerToggle 
          layers={layers} 
          onToggle={handleLayerToggle} 
          variant="inline" 
        />
      </div>

      {/* Recommendations */}
      <div className="absolute bottom-4 left-4 right-4 z-20">
        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Target className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="text-blue-800 mb-1">Рекомендация</h4>
              <p className="text-blue-700 text-sm">
                Двигайтесь в район Mega — высокий спрос на поездки. 
                Активна бонусная зона +20% еще 25 минут.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}