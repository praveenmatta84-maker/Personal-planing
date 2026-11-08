import React from 'react';
import { WifiOff, Check } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-40 flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-900/90 text-white backdrop-blur-md text-[11px] font-medium shadow-lg border border-white/20 animate-in fade-in duration-200">
      <WifiOff className="w-3.5 h-3.5 text-orange-400 shrink-0" />
      <span>Offline Mode — All data saved locally</span>
      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
    </div>
  );
};
