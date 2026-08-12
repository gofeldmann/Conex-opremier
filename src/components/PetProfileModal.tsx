import React, { useState } from 'react';
import { PetProfile } from '../types';
import { Dog, Cat, X, Sparkles, Heart } from 'lucide-react';

interface PetProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  petProfile: PetProfile;
  onSave: (updated: PetProfile) => void;
}

export const PetProfileModal: React.FC<PetProfileModalProps> = ({
  isOpen,
  onClose,
  petProfile,
  onSave,
}) => {
  const [formData, setFormData] = useState<PetProfile>(petProfile);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden border border-amber-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-navy-900 via-blue-900 to-indigo-950 p-5 text-white flex items-center justify-between relative" style={{ backgroundColor: '#002B5C' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-300/40 flex items-center justify-center text-amber-300">
              <Heart className="w-5 h-5 fill-amber-300" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-amber-300">Perfil do seu Pet</h3>
              <p className="text-xs text-blue-200">Personalize o atendimento com a Dra. Nutri</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Espécie do Pet
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, species: 'dog' })}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-medium border-2 transition ${
                  formData.species === 'dog'
                    ? 'border-[#2532f5] bg-blue-50 text-[#2532f5] shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <Dog className="w-5 h-5 text-[#2532f5]" />
                Cão (Cachorro)
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, species: 'cat' })}
                className={`flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-medium border-2 transition ${
                  formData.species === 'cat'
                    ? 'border-[#2532f5] bg-blue-50 text-[#2532f5] shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                <Cat className="w-5 h-5 text-[#2532f5]" />
                Gato (Felino)
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Nome do Pet
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ex: Bob, Mimi, Thor, Mel"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-[#2532f5] focus:ring-2 focus:ring-[#2532f5]/20 outline-none text-slate-800 text-sm"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Raça
              </label>
              <input
                type="text"
                value={formData.breed}
                onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                placeholder="Ex: Shih Tzu, SRD..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-[#2532f5] focus:ring-2 focus:ring-[#2532f5]/20 outline-none text-slate-800 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Idade (Anos)
              </label>
              <input
                type="number"
                min="0"
                max="25"
                step="0.5"
                value={formData.ageYears}
                onChange={(e) => setFormData({ ...formData, ageYears: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-[#2532f5] focus:ring-2 focus:ring-[#2532f5]/20 outline-none text-slate-800 text-sm"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Peso Atual (kg)
              </label>
              <input
                type="number"
                min="0.5"
                max="100"
                step="0.1"
                value={formData.weightKg}
                onChange={(e) => setFormData({ ...formData, weightKg: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-[#2532f5] focus:ring-2 focus:ring-[#2532f5]/20 outline-none text-slate-800 text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Atividade
              </label>
              <select
                value={formData.activityLevel}
                onChange={(e) => setFormData({ ...formData, activityLevel: e.target.value as any })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-[#2532f5] focus:ring-2 focus:ring-[#2532f5]/20 outline-none text-slate-800 text-sm bg-white"
              >
                <option value="low">Baixa (Apto/Idoso)</option>
                <option value="moderate">Moderada (Passeios)</option>
                <option value="high">Alta (Ativo/Atleta)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Escore Corporal (ECC 1 a 9)
            </label>
            <select
              value={formData.eccScore || 5}
              onChange={(e) => setFormData({ ...formData, eccScore: parseInt(e.target.value) })}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-[#2532f5] focus:ring-2 focus:ring-[#2532f5]/20 outline-none text-slate-800 text-sm bg-white"
            >
              <option value="3">1-3: Abaixo do peso ideal</option>
              <option value="4">4-5: Peso ideal saudável</option>
              <option value="6">6-7: Sobrepeso moderado (ECC 6-7)</option>
              <option value="8">8-9: Obesidade acentuada (ECC 8-9)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Observação / Necessidade Especial
            </label>
            <input
              type="text"
              value={formData.specialNeeds || ''}
              onChange={(e) => setFormData({ ...formData, specialNeeds: e.target.value })}
              placeholder="Ex: Castrado, sensibilidade de pele, fezes com odor..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:border-[#2532f5] focus:ring-2 focus:ring-[#2532f5]/20 outline-none text-slate-800 text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 px-4 bg-[#2532f5] hover:bg-[#1a27e0] text-white font-bold rounded-2xl shadow-md transition flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5 text-amber-300" />
            Salvar Perfil do Pet
          </button>
        </form>
      </div>
    </div>
  );
};
