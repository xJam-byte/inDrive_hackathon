import React from 'react';
import { Badge } from './ui/badge';
import { Clock, Plus } from 'lucide-react';

interface IncentiveChipProps {
  bonus: string;
  timeLeft?: string;
  size?: 'sm' | 'md';
  variant?: 'zone' | 'timer';
}

export function IncentiveChip({ bonus, timeLeft, size = 'md', variant = 'zone' }: IncentiveChipProps) {
  const isActive = timeLeft && timeLeft !== '00:00';
  
  if (variant === 'timer' && timeLeft) {
    return (
      <Badge 
        variant="secondary" 
        className={`bg-green-100 text-green-700 gap-1 ${size === 'sm' ? 'text-xs px-2 py-1' : 'text-sm px-3 py-1'}`}
      >
        <Clock className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
        {bonus} еще {timeLeft}
      </Badge>
    );
  }

  return (
    <Badge 
      variant="secondary" 
      className={`${isActive ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'} gap-1 ${
        size === 'sm' ? 'text-xs px-2 py-1' : 'text-sm px-3 py-1'
      }`}
    >
      <Plus className={size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'} />
      {bonus}
    </Badge>
  );
}