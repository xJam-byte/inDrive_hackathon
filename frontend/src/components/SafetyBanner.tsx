import React from 'react';
import { Button } from './ui/button';
import { AlertTriangle, Phone, Share2 } from 'lucide-react';

interface SafetyBannerProps {
  message: string;
  onContact?: () => void;
  onShare?: () => void;
}

export function SafetyBanner({ message, onContact, onShare }: SafetyBannerProps) {
  return (
    <div className="bg-red-500 text-white p-4 mx-4 mt-4 rounded-lg shadow-lg">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <p className="mb-3">{message}</p>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="secondary"
              className="bg-white text-red-600 hover:bg-red-50"
              onClick={onContact}
            >
              <Phone className="w-4 h-4 mr-2" />
              Связаться
            </Button>
            <Button 
              size="sm" 
              variant="secondary"
              className="bg-white text-red-600 hover:bg-red-50"
              onClick={onShare}
            >
              <Share2 className="w-4 h-4 mr-2" />
              Поделиться
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}