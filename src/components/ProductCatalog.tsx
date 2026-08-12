import React, { useState } from 'react';
import { PREMIER_SUBFAMILIES } from '../data/premierProducts';
import { ProductSubfamily, ProductCategory, PetType } from '../types';
import { Search, Filter, Dog, Cat, Sparkles, MessageSquare, CheckCircle2, ChevronRight, Info, Award } from 'lucide-react';

interface ProductCatalogProps {
  subfamilies: ProductSubfamily[];
  onAskAboutProduct: (subfamily: ProductSubfamily, question?: string) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ subfamilies, onAskAboutProduct }) => {
  const [search, setSearch] = useState('');
  const [selectedPetType, setSelectedPetType] = useState<'all' | 'dog' | 'cat'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubfamilyModal, setSelectedSubfamilyModal] = useState<ProductSubfamily | null>(null);

  const categories = [
    'all',
    'Super Premium',
    'Alimentos Específicos',
    'Nutrição Clínica',
    'Natural & Orgânico',
    'Alimento Completo Úmidos'
  ];

  const filteredProducts = (subfamilies || PREMIER_SUBFAMILIES).filter((p) => {
    // Search query
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.subName?.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.highlights.some((h) => h.toLowerCase().includes(search.toLowerCase()));

    // Pet Type
    const matchesPet =
      selectedPetType === 'all' || p.petType === 'both' || p.petType === selectedPetType;

    // Category
    const matchesCategory =
      selectedCategory === 'all' || p.category === selectedCategory;

    return matchesSearch && matchesPet && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Intro Header */}
      <div className="bg-gradient-to-r from-navy-950 via-blue-900 to-indigo-900 text-white p-6 rounded-3xl shadow-lg border border-amber-500/20" style={{ backgroundColor: '#002B5C' }}>
        <div className="max-w-3xl">
          <span className="bg-amber-400 text-slate-950 font-bold text-xs px-2.5 py-1 rounded-md uppercase tracking-wider mb-2 inline-block shadow-xs">
            Guia de Subfamílias PremieRpet
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Encontre a Nutrição Ideal para seu Pet 🐾
          </h2>
          <p className="text-sm text-blue-100 mt-2">
            Explore as linhas Super Premium, Alimentos Específicos, Nutrição Clínica Veterinária e Alimentos Úmidos como os mostrados nas tabelas e embalagens de produtos PremieRpet.
          </p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 space-y-3">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por linha, ex: Nattu, Cookie, Obesidade, Korin, Raças..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 outline-none text-sm text-slate-800"
            />
          </div>

          {/* Species Toggle */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl w-full sm:w-auto shrink-0">
            <button
              onClick={() => setSelectedPetType('all')}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                selectedPetType === 'all' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setSelectedPetType('dog')}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 justify-center ${
                selectedPetType === 'dog' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600'
              }`}
            >
              <Dog className="w-3.5 h-3.5" />
              Cães
            </button>
            <button
              onClick={() => setSelectedPetType('cat')}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 justify-center ${
                selectedPetType === 'cat' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600'
              }`}
            >
              <Cat className="w-3.5 h-3.5" />
              Gatos
            </button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 text-xs">
          <span className="text-slate-400 font-medium text-[11px] shrink-0">Linha:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-semibold shrink-0 transition ${
                selectedCategory === cat
                  ? 'bg-emerald-700 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' ? 'Todas as Linhas' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Subfamilies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((subfamily) => (
          <div
            key={subfamily.id}
            className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col group"
          >
            {/* Image & Badge */}
            <div className="relative h-48 overflow-hidden bg-slate-100">
              <img
                src={subfamily.image}
                alt={subfamily.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md shadow-xs uppercase tracking-wider ${subfamily.categoryBadgeColor}`}>
                  {subfamily.category}
                </span>
              </div>
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs p-1.5 rounded-xl shadow-xs text-slate-800">
                {subfamily.petType === 'dog' && <Dog className="w-4 h-4 text-amber-700" />}
                {subfamily.petType === 'cat' && <Cat className="w-4 h-4 text-emerald-700" />}
                {subfamily.petType === 'both' && (
                  <div className="flex items-center gap-1">
                    <Dog className="w-3.5 h-3.5 text-amber-700" />
                    <Cat className="w-3.5 h-3.5 text-emerald-700" />
                  </div>
                )}
              </div>
            </div>

            {/* Content Body */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg group-hover:text-emerald-800 transition">
                  {subfamily.name}
                </h3>
                {subfamily.subName && (
                  <p className="text-xs font-semibold text-emerald-700 mb-2">{subfamily.subName}</p>
                )}
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {subfamily.description}
                </p>

                {/* Highlights tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {subfamily.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="bg-emerald-50 text-emerald-900 text-[10px] font-bold px-2 py-0.5 rounded-md border border-emerald-200"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedSubfamilyModal(subfamily)}
                  className="text-xs font-bold text-slate-700 hover:text-emerald-800 flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-slate-100 transition"
                >
                  <Info className="w-3.5 h-3.5" />
                  Detalhes
                </button>

                <button
                  onClick={() => onAskAboutProduct(subfamily)}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-3 py-2 rounded-xl shadow-2xs transition flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-amber-300" />
                  Tirar Dúvidas no Chat
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="bg-white p-12 text-center rounded-3xl border border-slate-200 shadow-xs">
          <p className="text-slate-500 text-sm font-medium">
            Nenhuma linha PremieRpet encontrada para os filtros selecionados.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedPetType('all');
              setSelectedCategory('all');
            }}
            className="mt-3 text-xs font-bold text-emerald-700 underline"
          >
            Limpar filtros e ver todas as linhas
          </button>
        </div>
      )}

      {/* Subfamily Details Modal */}
      {selectedSubfamilyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200">
            {/* Header banner */}
            <div className="relative h-48">
              <img
                src={selectedSubfamilyModal.image}
                alt={selectedSubfamilyModal.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedSubfamilyModal(null)}
                className="absolute top-4 right-4 bg-slate-900/70 text-white p-1.5 rounded-full hover:bg-slate-900 transition"
              >
                ✕
              </button>
              <div className="absolute bottom-3 left-3 bg-slate-950/80 text-white px-3 py-1 rounded-xl text-xs font-bold border border-white/20">
                {selectedSubfamilyModal.category}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">{selectedSubfamilyModal.name}</h3>
                <p className="text-sm font-bold text-emerald-700">{selectedSubfamilyModal.subName}</p>
              </div>

              <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-2xl border border-slate-200">
                {selectedSubfamilyModal.description}
              </p>

              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Benefícios Principais
                </h4>
                <ul className="space-y-1.5">
                  {selectedSubfamilyModal.benefits.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-1">
                  Indicação Recomendada
                </h4>
                <p className="text-xs text-slate-600">{selectedSubfamilyModal.recommendedFor}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Perguntas Frequentes de Tutores
                </h4>
                <div className="space-y-2">
                  {selectedSubfamilyModal.sampleQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        const sub = selectedSubfamilyModal;
                        setSelectedSubfamilyModal(null);
                        onAskAboutProduct(sub, q);
                      }}
                      className="w-full text-left p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-medium border border-emerald-200 flex items-center justify-between transition group"
                    >
                      <span>{q}</span>
                      <ChevronRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-1 transition shrink-0" />
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => {
                  const sub = selectedSubfamilyModal;
                  setSelectedSubfamilyModal(null);
                  onAskAboutProduct(sub);
                }}
                className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-2xl shadow-md transition flex items-center justify-center gap-2 text-xs"
              >
                <MessageSquare className="w-4 h-4 text-amber-300" />
                Conversar sobre {selectedSubfamilyModal.name} no Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
