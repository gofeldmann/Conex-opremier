import React, { useState } from 'react';
import { PetProfile } from '../types';
import { QrCode, Smartphone, Dog, Cat, Sparkles, Award } from 'lucide-react';
import { DEFAULT_PATRICIA_AVATAR, FALLBACK_PATRICIA_AVATAR } from '../utils/defaultImages';

interface HeaderProps {
  petProfile?: PetProfile;
  onOpenPetModal?: () => void;
  isMobileSimulated: boolean;
  onToggleMobileSimulated: () => void;
  userQuizPoints: number;
  avatarUrl?: string;
}

export const Header: React.FC<HeaderProps> = ({
  isMobileSimulated,
  onToggleMobileSimulated,
  userQuizPoints,
  avatarUrl = DEFAULT_PATRICIA_AVATAR,
}) => {
  const [showQrModal, setShowQrModal] = useState(false);

  return (
    <>
      <header className="w-full max-w-3xl mx-auto px-4 pt-4">
        {/* Top Header Card matching Screenshot 1 */}
        <div className="bg-[#2532f5] text-white p-5 sm:p-6 rounded-[28px] sm:rounded-[32px] shadow-md flex items-center justify-between gap-4 relative overflow-hidden">
          <div className="flex items-center gap-3.5 relative z-10">
            <div className="relative shrink-0">
              <img
                src={avatarUrl || DEFAULT_PATRICIA_AVATAR}
                alt="Dra. Patrícia"
                referrerPolicy="no-referrer"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-white/90 shadow-sm bg-white/20"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = FALLBACK_PATRICIA_AVATAR;
                }}
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-sky-400 border-2 border-[#2532f5] rounded-full"></span>
            </div>

            <div>
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
                Infos PremieRpet
              </h1>
              <p className="text-xs sm:text-sm text-blue-100/90 font-medium mt-0.5">
                Dúvidas sobre a alimentação do seu pet
              </p>
            </div>
          </div>

          {/* Quick Controls Badges */}
          <div className="flex items-center gap-2 relative z-10 shrink-0">
            <button
              onClick={onToggleMobileSimulated}
              className={`p-2 rounded-full transition hidden md:flex items-center justify-center ${
                isMobileSimulated
                  ? 'bg-white text-[#2532f5] font-bold shadow-sm'
                  : 'bg-white/15 hover:bg-white/25 text-white'
              }`}
              title="Alternar modo celular / desktop"
            >
              <Smartphone className="w-4 h-4" />
            </button>

            <button
              onClick={() => setShowQrModal(true)}
              className="p-2 rounded-full bg-white/15 hover:bg-white/25 text-white transition"
              title="Visualizar QR Code mobile"
            >
              <QrCode className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* QR Code Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-[32px] max-w-sm w-full p-6 text-center shadow-2xl relative border border-slate-100">
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 font-bold text-lg"
            >
              ✕
            </button>

            <div className="w-12 h-12 rounded-full bg-[#2532f5] text-white mx-auto mb-3 flex items-center justify-center">
              <QrCode className="w-6 h-6" />
            </div>

            <h3 className="font-extrabold text-slate-900 text-lg mb-1">Acesso via Smartphone</h3>
            <p className="text-xs text-slate-600 mb-4">
              Escaneie o QR Code no seu celular para abrir o chatbot PremieRpet no seu smartphone!
            </p>

            <div className="bg-slate-50 p-4 rounded-2xl border-2 border-dashed border-[#2532f5]/30 inline-block mb-4 shadow-inner">
              <div className="w-44 h-44 bg-white p-2 rounded-xl flex flex-col items-center justify-center gap-2 border border-slate-200">
                <div className="grid grid-cols-5 gap-1.5 w-full h-full p-1 bg-slate-900 rounded-lg text-white font-mono text-[8px] items-center justify-center">
                  <div className="col-span-5 text-center text-blue-300 font-bold">PREMIERPET QR</div>
                  <div className="col-span-2 bg-[#2532f5] h-8 rounded-xs"></div>
                  <div className="col-span-3 bg-white text-slate-900 font-bold p-1 rounded-xs text-[7px] flex items-center justify-center">
                    SCAN ME
                  </div>
                  <div className="col-span-5 bg-blue-500 text-white p-1 font-bold text-[8px] rounded-xs text-center">
                    INFOS PREMIERPET
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-[#2532f5] bg-blue-50 py-2.5 px-3 rounded-full border border-blue-200">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Otimizado para smartphones!
            </div>
          </div>
        </div>
      )}
    </>
  );
};

