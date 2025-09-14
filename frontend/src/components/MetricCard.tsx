import React from 'react';
import { Card } from './ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  sparkline?: number[];
  unit?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function MetricCard({ title, value, change, sparkline, unit, size = 'md' }: MetricCardProps) {
  const getTrendIcon = () => {
    if (!change) return <Minus className="w-4 h-4 text-slate-400" />;
    if (change > 0) return <TrendingUp className="w-4 h-4 text-green-500" />;
    return <TrendingDown className="w-4 h-4 text-red-500" />;
  };

  const getTrendColor = () => {
    if (!change) return 'text-slate-600';
    return change > 0 ? 'text-green-500' : 'text-red-500';
  };

  const cardPadding = size === 'sm' ? 'p-3' : size === 'lg' ? 'p-6' : 'p-4';
  const titleSize = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base';
  const valueSize = size === 'sm' ? 'text-lg' : size === 'lg' ? 'text-3xl' : 'text-2xl';

  return (
    <Card className={cardPadding}>
      <div className="flex items-start justify-between mb-2">
        <h4 className={`text-slate-600 ${titleSize}`}>{title}</h4>
        {change !== undefined && (
          <div className="flex items-center gap-1">
            {getTrendIcon()}
            <span className={`text-sm ${getTrendColor()}`}>
              {Math.abs(change)}%
            </span>
          </div>
        )}
      </div>
      
      <div className="flex items-baseline gap-1 mb-3">
        <span className={`${valueSize} text-slate-900`}>
          {value}
        </span>
        {unit && <span className="text-slate-500">{unit}</span>}
      </div>

      {sparkline && sparkline.length > 0 && (
        <div className="h-8">
          <svg width="100%" height="100%" viewBox="0 0 100 32">
            <path
              d={`M ${sparkline.map((point, index) => 
                `${(index / (sparkline.length - 1)) * 100},${32 - (point / Math.max(...sparkline)) * 28}`
              ).join(' L ')}`}
              fill="none"
              stroke="#21C274"
              strokeWidth="2"
              className="opacity-70"
            />
          </svg>
        </div>
      )}
    </Card>
  );
}