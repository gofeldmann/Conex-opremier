import React from 'react';
import { BookOpen, Sparkles, Droplets, ShieldCheck, Heart, ArrowRight, Dog, Cat, MessageSquare } from 'lucide-react';

interface TutorGuideProps {
  onAskInChat: (question: string) => void;
}

export const TutorGuide: React.FC<TutorGuideProps> = ({ onAskInChat }) => {
  const transitionSteps = [
    { days: 'Dias 1 e 2', ratio: '25% PremieR + 75% Ração Antiga', desc: 'Introdução suave para acostumar a microbiota intestinal do pet.' },
    { days: 'Dias 3 e 4', ratio: '50% PremieR + 50% Ração Antiga', desc: 'Metade a metade. Monitore a consistência e firmeza das fezes.' },
    { days: 'Dias 5 e 6', ratio: '75% PremieR + 25% Ração Antiga', desc: 'Fase final de adaptação. Maior absorção dos nutrientes nobres.' },
    { days: 'Dia 7 em diante', ratio: '100% PremieRpet!', desc: 'Adaptação concluída! Seu pet agora desfruta de nutrição Super Premium.' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 text-white p-6 rounded-3xl shadow-lg border border-amber-400/30">
        <div className="max-w-2xl">
          <span className="bg-amber-400 text-slate-950 font-bold text-xs px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-2 inline-block">
            Guia de Cuidados PremieRpet
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Manual de Boas Práticas para Tutores 📖
          </h2>
          <p className="text-xs text-emerald-100 mt-2">
            Aprenda a fazer a transição correta da ração, combinar alimentos úmidos para maior hidratação e manter seu pet com saúde e vitalidade.
          </p>
        </div>
      </div>

      {/* 7-Day Transition Plan */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Como Fazer a Transição da Ração em 7 Dias
            </h3>
            <p className="text-xs text-slate-500">
              Essencial para evitar desconforto abdominal, diarreia transitória ou recusa do novo alimento.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {transitionSteps.map((step, idx) => (
            <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                  {step.days}
                </span>
                <h4 className="font-bold text-slate-900 text-xs mt-2">{step.ratio}</h4>
                <p className="text-[11px] text-slate-600 mt-1 leading-snug">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Best Practice Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Hydration & Wet Food Card */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-100 text-cyan-800 flex items-center justify-center font-bold">
            <Droplets className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-slate-900 text-base">Mix Feeding & Hidratação</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Oferecer sachês e latas de <strong>PremieR® Gourmet, Nattu ou Formula Úmidos</strong> misturados ou como petisco saudável fornece mais de 80% de água por porção, protegendo o trato urinário e rins de cães e gatos.
          </p>
          <button
            onClick={() => onAskInChat('Como funciona a alimentação combinada (Mix Feeding) de ração seca e úmida da PremieRpet?')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            Saber mais no Chat <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* PremieR Cookie Reward Card */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
            <Heart className="w-5 h-5 text-amber-600" />
          </div>
          <h3 className="font-extrabold text-slate-900 text-base">Recompensa e Afeto com PremieR® Cookie</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Biscoitos <strong>PremieR Cookie</strong> são assados no forno com ovos de galinhas livres de gaiolas (cage-free) e hexametafosfato de sódio para prevenção de tártaro. Perfeitos para adestramento e carinho sem desequilibrar a dieta.
          </p>
          <button
            onClick={() => onAskInChat('Quantos biscoitos PremieR Cookie posso oferecer por dia para o meu cão?')}
            className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
          >
            Saber mais no Chat <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
