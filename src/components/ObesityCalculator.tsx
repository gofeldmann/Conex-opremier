import React, { useState } from 'react';
import { PetProfile } from '../types';
import { Calculator, Scale, Heart, AlertTriangle, CheckCircle2, ArrowRight, Activity, Sparkles, MessageSquare } from 'lucide-react';

interface ObesityCalculatorProps {
  petProfile?: PetProfile;
  onAskInChat: (question: string) => void;
}

export const ObesityCalculator: React.FC<ObesityCalculatorProps> = ({
  petProfile,
  onAskInChat,
}) => {
  const [currentWeight, setCurrentWeight] = useState<number>(petProfile?.weightKg || 10);
  const [ecc, setEcc] = useState<number>(petProfile?.eccScore || 8); // 6, 7, 8, 9
  const [mealsCount, setMealsCount] = useState<number>(2); // 2 or 3 meals

  // Calculate Target Weight Loss Percentage
  const isHighObesity = ecc >= 8;
  const reductionPercent = isHighObesity ? 20 : 15; // 20% for 8/9, 15% for 6/7
  const targetWeight = Number((currentWeight * (1 - reductionPercent / 100)).toFixed(1));

  // Daily Grams interpolation based on exact PDF table
  const weightTable = [
    { weight: 2, grams: 33 },
    { weight: 4, grams: 55 },
    { weight: 6, grams: 75 },
    { weight: 8, grams: 93 },
    { weight: 10, grams: 110 },
    { weight: 12, grams: 126 },
    { weight: 15, grams: 148 },
    { weight: 20, grams: 184 },
    { weight: 25, grams: 218 },
    { weight: 30, grams: 250 },
    { weight: 35, grams: 280 },
    { weight: 40, grams: 310 },
    { weight: 45, grams: 338 },
    { weight: 50, grams: 366 },
    { weight: 60, grams: 420 },
  ];

  // Estimate grams for target weight
  const getDailyGrams = (targetKg: number) => {
    if (targetKg <= 2) return 33;
    if (targetKg >= 60) return 420;

    for (let i = 0; i < weightTable.length - 1; i++) {
      const low = weightTable[i];
      const high = weightTable[i + 1];
      if (targetKg >= low.weight && targetKg <= high.weight) {
        const ratio = (targetKg - low.weight) / (high.weight - low.weight);
        return Math.round(low.grams + ratio * (high.grams - low.grams));
      }
    }
    return 110;
  };

  const dailyGrams = getDailyGrams(targetWeight);
  const gramsPerMeal = Math.round(dailyGrams / mealsCount);

  // Metabolic Energy Equation: 70 * (targetWeight ^ 0.75)
  const dailyKcal = Math.round(70 * Math.pow(targetWeight, 0.75));

  const handleAskDraNutri = () => {
    const q = `Dra. Nutri, fiz o cálculo para o meu cão com peso atual de ${currentWeight}kg e ECC ${ecc}/9. O peso meta calculado é ${targetWeight}kg (${reductionPercent}% de redução), com porção diária de ${dailyGrams}g da ração PremieR Nutrição Clínica Obesidade. Como devo iniciar a transição e o acompanhamento?`;
    onAskInChat(q);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-blue-900 to-indigo-900 text-white p-6 rounded-3xl shadow-lg border border-indigo-400/30 flex items-center justify-between" style={{ backgroundColor: '#002B5C' }}>
        <div>
          <span className="bg-amber-400 text-slate-950 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-2 inline-block">
            Manejo Nutricional Veterinário
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Calculator className="w-6 h-6 text-amber-300" />
            Calculadora PremieR® Nutrição Clínica Obesidade
          </h2>
          <p className="text-xs text-blue-100 mt-1">
            Mapeamento da porção diária, peso meta e acompanhamento semanal baseado na tabela oficial PremieRpet.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Inputs Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-5">
          <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
            <Scale className="w-5 h-5 text-indigo-700" />
            1. Dados Atuais do Cão
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Peso Atual do Pet (kg)
            </label>
            <input
              type="number"
              min="1"
              max="90"
              step="0.5"
              value={currentWeight}
              onChange={(e) => setCurrentWeight(parseFloat(e.target.value) || 1)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-500/20 text-slate-900 font-bold text-base outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Escore de Condição Corporal (ECC)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setEcc(7)}
                className={`p-3 rounded-xl border-2 text-left text-xs transition ${
                  ecc <= 7
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-950 font-bold shadow-xs'
                    : 'border-slate-200 text-slate-600'
                }`}
              >
                <div className="font-bold text-sm">ECC 6 ou 7/9</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Sobrepeso Moderado (-15% de peso)</div>
              </button>

              <button
                type="button"
                onClick={() => setEcc(9)}
                className={`p-3 rounded-xl border-2 text-left text-xs transition ${
                  ecc >= 8
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-950 font-bold shadow-xs'
                    : 'border-slate-200 text-slate-600'
                }`}
              >
                <div className="font-bold text-sm">ECC 8 ou 9/9</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Obesidade Acentuada (-20% de peso)</div>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Refeições Diárias
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setMealsCount(2)}
                className={`py-2 px-3 rounded-xl border-2 text-xs font-bold transition ${
                  mealsCount === 2 ? 'border-indigo-600 bg-indigo-50 text-indigo-900' : 'border-slate-200 text-slate-600'
                }`}
              >
                2 Refeições/dia
              </button>
              <button
                type="button"
                onClick={() => setMealsCount(3)}
                className={`py-2 px-3 rounded-xl border-2 text-xs font-bold transition ${
                  mealsCount === 3 ? 'border-indigo-600 bg-indigo-50 text-indigo-900' : 'border-slate-200 text-slate-600'
                }`}
              >
                3 Refeições/dia
              </button>
            </div>
          </div>

          <div className="bg-amber-50 p-3.5 rounded-2xl border border-amber-200 text-amber-900 text-xs space-y-1">
            <div className="font-bold flex items-center gap-1">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              Contraindicações da Linha Obesidade:
            </div>
            <p className="text-[11px] leading-relaxed text-amber-800">
              Contraindicado para filhotes, fêmeas gestantes/lactantes ou cães que necessitem de maior aporte calórico.
            </p>
          </div>
        </div>

        {/* Right Output Results Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-600" />
              2. Resultado do Manejo Alimentar
            </h3>

            {/* Target Weight Highlight */}
            <div className="bg-gradient-to-r from-emerald-900 to-teal-900 text-white p-5 rounded-2xl shadow-sm space-y-2">
              <div className="flex items-center justify-between text-xs text-emerald-200 font-bold uppercase tracking-wider">
                <span>Peso Meta Recomendado</span>
                <span className="bg-amber-400 text-slate-950 px-2 py-0.5 rounded-md font-black">{reductionPercent}% de redução</span>
              </div>
              <div className="text-3xl font-black text-amber-300">{targetWeight} kg</div>
              <p className="text-[11px] text-emerald-100">
                Redução planejada de {(currentWeight - targetWeight).toFixed(1)} kg de gordura preservando 100% da massa magra!
              </p>
            </div>

            {/* Daily Grams & Meals */}
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Porção Diária</div>
                <div className="text-xl font-black text-slate-900 mt-1">{dailyGrams} g/dia</div>
                <div className="text-[10px] text-slate-500">({dailyKcal} kcal)</div>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Por Refeição ({mealsCount}x)</div>
                <div className="text-xl font-black text-indigo-700 mt-1">{gramsPerMeal} g</div>
                <div className="text-[10px] text-slate-500">por tigela</div>
              </div>
            </div>

            {/* Weekly Monitoring Rules */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <div className="font-bold text-slate-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Regras de Acompanhamento Semanal:
              </div>
              <ul className="space-y-1 text-slate-600 text-[11px]">
                <li className="flex items-center justify-between">
                  <span>Perda entre 1% e 2% do peso/semana:</span>
                  <strong className="text-emerald-700 font-bold">MANTER dose</strong>
                </li>
                <li className="flex items-center justify-between">
                  <span>Perda &lt; 1% do peso/semana:</span>
                  <strong className="text-amber-700 font-bold">REDUZIR dose</strong>
                </li>
                <li className="flex items-center justify-between">
                  <span>Perda &gt; 2% do peso/semana:</span>
                  <strong className="text-rose-700 font-bold">AUMENTAR dose</strong>
                </li>
              </ul>
            </div>
          </div>

          <button
            onClick={handleAskDraNutri}
            className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-2xl shadow-md transition flex items-center justify-center gap-2 text-xs"
          >
            <MessageSquare className="w-4 h-4 text-amber-300" />
            Enviar Cálculo para a Dra. Nutri no Chat
          </button>
        </div>
      </div>
    </div>
  );
};
