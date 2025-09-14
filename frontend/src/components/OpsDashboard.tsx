import React, { useState } from 'react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { MapComponent } from './MapComponent';
import { LayerToggle } from './LayerToggle';
import { MetricCard } from './MetricCard';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { ArrowLeft, BarChart3, Map, AlertTriangle, Gift, FileText } from 'lucide-react';

interface OpsDashboardProps {
  onBack: () => void;
}

export function OpsDashboard({ onBack }: OpsDashboardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [selectedHour, setSelectedHour] = useState('17-20');
  const [layers, setLayers] = useState({
    heatmap: true,
    lowSpeed: true,
    routes: true,
    anomalies: false,
    risk: false,
    incentives: true,
  });

  const handleLayerToggle = (layer: string) => {
    setLayers(prev => ({
      ...prev,
      [layer]: !prev[layer as keyof typeof prev]
    }));
  };

  const hotZones = [
    { name: 'Mega Astana', requests: 324, change: 12 },
    { name: 'Аэропорт', requests: 287, change: -5 },
    { name: 'ЖД Вокзал', requests: 198, change: 8 },
    { name: 'Назарбаев Центр', requests: 156, change: 22 },
    { name: 'Хан Шатыр', requests: 134, change: -3 },
  ];

  const bottlenecks = [
    { street: 'Кабанбай батыра', speed: '4.2 км/ч', peakHours: '08:00-10:00' },
    { street: 'Сарыарка', speed: '3.8 км/ч', peakHours: '17:30-19:30' },
    { street: 'Республики', speed: '5.1 км/ч', peakHours: '08:30-09:30' },
    { street: 'Туран', speed: '4.7 км/ч', peakHours: '18:00-19:00' },
  ];

  const incentiveZones = [
    { area: 'Есиль р-н', duration: '25 мин', bonus: '+20%', status: 'active' },
    { area: 'Алматы р-н', duration: '45 мин', bonus: '+15%', status: 'active' },
    { area: 'Сарыарка р-н', duration: '12 мин', bonus: '+30%', status: 'ending' },
  ];

  return (
    <div className="h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r shadow-sm">
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1>Ops Dashboard</h1>
          </div>
        </div>
        
        <nav className="p-4 space-y-2">
          <Button variant="ghost" className="w-full justify-start gap-2">
            <BarChart3 className="w-4 h-4" />
            Зоны
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Map className="w-4 h-4" />
            Узкие места
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <AlertTriangle className="w-4 h-4" />
            Аномалии
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Gift className="w-4 h-4" />
            Бонусы
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <FileText className="w-4 h-4" />
            Отчёты
          </Button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top controls */}
        <div className="bg-white border-b p-4">
          <div className="flex items-center gap-4">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Сегодня</SelectItem>
                <SelectItem value="yesterday">Вчера</SelectItem>
                <SelectItem value="week">Неделя</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedHour} onValueChange={setSelectedHour}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="07-10">07:00-10:00</SelectItem>
                <SelectItem value="17-20">17:00-20:00</SelectItem>
                <SelectItem value="all">Весь день</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-1">
          {/* Map area */}
          <div className="flex-1 relative">
            <LayerToggle 
              layers={layers} 
              onToggle={handleLayerToggle} 
              variant="inline" 
            />
            
            <MapComponent 
              layers={layers} 
              className="absolute inset-0 top-16"
            />
          </div>

          {/* Right panel */}
          <div className="w-96 bg-white border-l p-4 overflow-y-auto">
            <div className="space-y-6">
              {/* Top metrics */}
              <div className="grid grid-cols-2 gap-3">
                <MetricCard
                  title="Всего поездок"
                  value="1,247"
                  change={8}
                  size="sm"
                />
                <MetricCard
                  title="Ср. скорость"
                  value="18.3"
                  unit="км/ч"
                  change={-3}
                  size="sm"
                />
              </div>

              {/* Hot zones */}
              <Card className="p-4">
                <h3 className="mb-4">ТОП-5 горячих зон</h3>
                <div className="space-y-3">
                  {hotZones.map((zone, index) => (
                    <div key={zone.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-xs">
                          {index + 1}
                        </span>
                        <div>
                          <div className="font-medium text-sm">{zone.name}</div>
                          <div className="text-xs text-slate-600">{zone.requests} поездок</div>
                        </div>
                      </div>
                      <Badge variant={zone.change > 0 ? "default" : "secondary"} className="text-xs">
                        {zone.change > 0 ? '+' : ''}{zone.change}%
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Bottlenecks */}
              <Card className="p-4">
                <h3 className="mb-4">Узкие места</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">Улица</TableHead>
                      <TableHead className="text-xs">Скорость</TableHead>
                      <TableHead className="text-xs">Пик</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bottlenecks.map((item) => (
                      <TableRow key={item.street}>
                        <TableCell className="text-xs py-2">{item.street}</TableCell>
                        <TableCell className="text-xs py-2 text-orange-600">{item.speed}</TableCell>
                        <TableCell className="text-xs py-2">{item.peakHours}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>

              {/* Anomalies chart */}
              <Card className="p-4">
                <h3 className="mb-4">Аномалии</h3>
                <div className="h-24 flex items-end justify-between gap-1">
                  {[3, 7, 5, 12, 8, 6, 9].map((value, index) => (
                    <div
                      key={index}
                      className="bg-purple-200 rounded-t"
                      style={{
                        height: `${(value / 12) * 100}%`,
                        width: 'calc(100% / 7 - 2px)'
                      }}
                    />
                  ))}
                </div>
                <div className="text-xs text-slate-600 mt-2">
                  Доля отклонений: 4.2% (+0.8%)
                </div>
              </Card>

              {/* Active incentives */}
              <Card className="p-4">
                <h3 className="mb-4">Активные бонус-зоны</h3>
                <div className="space-y-3">
                  {incentiveZones.map((zone) => (
                    <div key={zone.area} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                      <div>
                        <div className="font-medium text-sm">{zone.area}</div>
                        <div className="text-xs text-slate-600">{zone.duration} осталось</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={zone.status === 'ending' ? 'destructive' : 'default'}
                          className="bg-green-100 text-green-700"
                        >
                          {zone.bonus}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}