import React from 'react';
import { Button } from './ui/button';
import { Thermometer, Zap, Route, AlertTriangle, MapPin, Gift } from 'lucide-react';

interface LayerToggleProps {
  layers: {
    heatmap: boolean;
    lowSpeed: boolean;
    routes: boolean;
    anomalies: boolean;
    risk: boolean;
    incentives: boolean;
  };
  onToggle: (layer: string) => void;
  variant?: 'fab' | 'inline';
}

export function LayerToggle({ layers, onToggle, variant = 'fab' }: LayerToggleProps) {
  const layersConfig = [
    { key: 'heatmap', icon: Thermometer, label: 'Тепло', color: 'text-red-500' },
    { key: 'lowSpeed', icon: Zap, label: 'Узкие', color: 'text-orange-500' },
    { key: 'routes', icon: Route, label: 'Маршруты', color: 'text-blue-500' },
    { key: 'risk', icon: AlertTriangle, label: 'Риск', color: 'text-red-600' },
    { key: 'anomalies', icon: MapPin, label: 'Аномалии', color: 'text-purple-500' },
    { key: 'incentives', icon: Gift, label: 'Бонусы', color: 'text-green-500' },
  ];

  if (variant === 'fab') {
    return (
      <div className="fixed right-4 bottom-24 flex flex-col gap-2">
        {layersConfig.map(({ key, icon: Icon, label, color }) => (
          <Button
            key={key}
            size="sm"
            variant={layers[key as keyof typeof layers] ? "default" : "outline"}
            className={`w-12 h-12 rounded-full shadow-lg ${
              layers[key as keyof typeof layers] ? 'bg-[#21C274] hover:bg-[#21C274]/90' : ''
            }`}
            onClick={() => onToggle(key)}
          >
            <Icon className={`w-5 h-5 ${layers[key as keyof typeof layers] ? 'text-white' : color}`} />
          </Button>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2 p-3 bg-white border-b">
      {layersConfig.map(({ key, icon: Icon, label, color }) => (
        <Button
          key={key}
          size="sm"  
          variant={layers[key as keyof typeof layers] ? "default" : "outline"}
          className={`gap-2 ${
            layers[key as keyof typeof layers] ? 'bg-[#21C274] hover:bg-[#21C274]/90' : ''
          }`}
          onClick={() => onToggle(key)}
        >
          <Icon className={`w-4 h-4 ${layers[key as keyof typeof layers] ? 'text-white' : color}`} />
          <span className="text-xs">{label}</span>
        </Button>
      ))}
    </div>
  );
}