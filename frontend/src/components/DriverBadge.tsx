import React from 'react';
import { Badge } from './ui/badge';
import { Leaf, Shield } from 'lucide-react';

interface DriverBadgeProps {
  comfort?: number;
  eco?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function DriverBadge({ comfort = 85, eco = 'A', size = 'md' }: DriverBadgeProps) {
  const getComfortColor = (score: number) => {
    if (score >= 90) return 'bg-green-100 text-green-700';
    if (score >= 80) return 'bg-blue-100 text-blue-700';
    if (score >= 70) return 'bg-yellow-100 text-yellow-700';
    return 'bg-red-100 text-red-700';
  };

  const getEcoColor = (grade: string) => {
    if (grade === 'A') return 'bg-green-100 text-green-700';
    if (grade === 'B') return 'bg-yellow-100 text-yellow-700';
    return 'bg-orange-100 text-orange-700';
  };

  const iconSize = size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4';
  const textSize = size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-sm' : 'text-xs';

  return (
    <div className="flex gap-2">
      <Badge variant="secondary" className={`${getComfortColor(comfort)} ${textSize} gap-1`}>
        <Shield className={iconSize} />
        Comfort {comfort}
      </Badge>
      <Badge variant="secondary" className={`${getEcoColor(eco)} ${textSize} gap-1`}>
        <Leaf className={iconSize} />
        Eco {eco}
      </Badge>
    </div>
  );
}