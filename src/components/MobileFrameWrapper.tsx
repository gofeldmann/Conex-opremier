import React from 'react';
import { Smartphone, QrCode, Wifi, Battery, Signal } from 'lucide-react';

interface MobileFrameWrapperProps {
  isSimulated: boolean;
  onToggleSimulated: () => void;
  children: React.ReactNode;
}

export const MobileFrameWrapper: React.FC<MobileFrameWrapperProps> = ({
  isSimulated,
  onToggleSimulated,
  children,
}) => {
  if (!isSimulated) {
    return <div className="min-h-screen bg-[#f2f5fd] flex flex-col">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-slate-900 py-6 px-2 flex flex-col items-center justify-center font-sans">
      {/* Simulation Banner */}
      <div className="mb-3 text-center text-white flex items-center gap-3 bg-slate-800/90 px-4 py-2 rounded-2xl border border-slate-700 shadow-md">
        <Smartphone className="w-4 h-4 text-amber-400" />
        <span className="text-xs font-bold text-amber-300">Modo de Simulação Smartphone QR Code</span>
        <button
          onClick={onToggleSimulated}
          className="text-[11px] underline text-blue-300 hover:text-white ml-2 font-medium"
        >
          Sair para Tela Cheia
        </button>
      </div>

      {/* Mobile Phone Mockup Chassis */}
      <div className="w-full max-w-[412px] bg-slate-950 rounded-[48px] p-3 shadow-2xl border-4 border-slate-700 relative overflow-hidden flex flex-col h-[850px] max-h-[92vh]">
        {/* Top Speaker & Camera Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-36 h-6 bg-slate-950 rounded-b-2xl z-50 flex items-center justify-center gap-2">
          <div className="w-12 h-1 bg-slate-800 rounded-full"></div>
          <div className="w-3 h-3 bg-slate-900 rounded-full border border-slate-800"></div>
        </div>

        {/* Status Bar */}
        <div className="bg-navy-950 text-white text-[11px] pt-2 px-6 pb-1 flex items-center justify-between shrink-0 z-40 select-none font-medium" style={{ backgroundColor: '#002B5C' }}>
          <span>9:41</span>
          <div className="flex items-center gap-1.5 text-blue-200">
            <Signal className="w-3 h-3" />
            <Wifi className="w-3 h-3" />
            <Battery className="w-4 h-4 text-emerald-400" />
          </div>
        </div>

        {/* Smartphone Screen Viewport */}
        <div className="flex-1 bg-[#f2f5fd] rounded-[36px] overflow-y-auto flex flex-col relative no-scrollbar">
          {children}
        </div>

        {/* Bottom Home Indicator Line */}
        <div className="py-2 flex items-center justify-center bg-slate-950 shrink-0">
          <div className="w-32 h-1 bg-slate-600 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
