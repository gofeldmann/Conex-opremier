import React, { useState } from 'react';
import { ProductSubfamily, QuizQuestion, ProductCategory, PetType, ChatCustomization, QuizCustomization, SurveyConfig, QuizBonusConfig } from '../types';
import {
  getAdminPin,
  saveAdminPin,
  saveStoredSubfamilies,
  saveStoredQuizQuestions,
  resetSubfamiliesToDefault,
  resetQuizQuestionsToDefault,
  saveChatCustomization,
  saveQuizCustomization,
  saveSurveyConfig,
  saveQuizBonusConfig,
} from '../utils/storage';
import {
  Lock,
  Unlock,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  X,
  RotateCcw,
  Download,
  Upload,
  Save,
  HelpCircle,
  Package,
  Key,
  Layers,
  Sparkles,
  Check,
  Palette,
  MessageSquare,
  Award,
  Image as ImageIcon,
  Sliders,
  Gift,
  Smile,
  Copy
} from 'lucide-react';

interface AdminPanelProps {
  subfamilies: ProductSubfamily[];
  onUpdateSubfamilies: (updated: ProductSubfamily[]) => void;
  quizQuestions: QuizQuestion[];
  onUpdateQuizQuestions: (updated: QuizQuestion[]) => void;
  chatCustomization: ChatCustomization;
  onUpdateChatCustomization: (updated: ChatCustomization) => void;
  quizCustomization: QuizCustomization;
  onUpdateQuizCustomization: (updated: QuizCustomization) => void;
  surveyConfig: SurveyConfig;
  onUpdateSurveyConfig: (updated: SurveyConfig) => void;
  quizBonusConfig: QuizBonusConfig;
  onUpdateQuizBonusConfig: (updated: QuizBonusConfig) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  subfamilies,
  onUpdateSubfamilies,
  quizQuestions,
  onUpdateQuizQuestions,
  chatCustomization,
  onUpdateChatCustomization,
  quizCustomization,
  onUpdateQuizCustomization,
  surveyConfig,
  onUpdateSurveyConfig,
  quizBonusConfig,
  onUpdateQuizBonusConfig,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');
  const [activeAdminTab, setActiveAdminTab] = useState<'customization' | 'quiz' | 'products' | 'settings'>('customization');
  const [customSubTab, setCustomSubTab] = useState<'chat' | 'quiz'>('chat');

  // Change PIN state
  const [newPin, setNewPin] = useState<string>('');
  const [pinSuccessMsg, setPinSuccessMsg] = useState<string>('');

  // Local Form States for Personalização
  const [chatForm, setChatForm] = useState<ChatCustomization>(chatCustomization);
  const [quizForm, setQuizForm] = useState<QuizCustomization>(quizCustomization);
  const [surveyForm, setSurveyForm] = useState<SurveyConfig>(surveyConfig);
  const [quizBonusForm, setQuizBonusForm] = useState<QuizBonusConfig>(quizBonusConfig);

  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string>('');

  // Search filters
  const [quizSearch, setQuizSearch] = useState<string>('');
  const [productSearch, setProductSearch] = useState<string>('');

  // Modals / Forms
  const [editingQuestion, setEditingQuestion] = useState<Partial<QuizQuestion> | null>(null);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState<boolean>(false);

  const [editingSubfamily, setEditingSubfamily] = useState<Partial<ProductSubfamily> | null>(null);
  const [isSubfamilyModalOpen, setIsSubfamilyModalOpen] = useState<boolean>(false);

  // Authentication Handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const storedPin = getAdminPin();
    if (pinInput.trim() === storedPin) {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('PIN incorreto. Tente novamente.');
    }
  };

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.trim().length >= 4) {
      saveAdminPin(newPin.trim());
      setPinSuccessMsg('PIN do Painel Admin alterado com sucesso!');
      setNewPin('');
      setTimeout(() => setPinSuccessMsg(''), 3000);
    } else {
      alert('O PIN deve ter pelo menos 4 caracteres.');
    }
  };

  // Image File Upload Helper
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (dataUrl: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Por favor selecione uma imagem com tamanho inferior a 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        callback(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  // Save Chat Customization & Survey
  const handleSaveChatCustomization = (e: React.FormEvent) => {
    e.preventDefault();
    saveChatCustomization(chatForm);
    saveSurveyConfig(surveyForm);
    onUpdateChatCustomization(chatForm);
    onUpdateSurveyConfig(surveyForm);

    setSaveSuccessMsg('Personalização do Chat e Pesquisa salvas com sucesso!');
    setTimeout(() => setSaveSuccessMsg(''), 3000);
  };

  // Save Quiz Customization & Bonus
  const handleSaveQuizCustomization = (e: React.FormEvent) => {
    e.preventDefault();
    saveQuizCustomization(quizForm);
    saveQuizBonusConfig(quizBonusForm);
    onUpdateQuizCustomization(quizForm);
    onUpdateQuizBonusConfig(quizBonusForm);

    setSaveSuccessMsg('Personalização do Quiz e Bonificação salvas com sucesso!');
    setTimeout(() => setSaveSuccessMsg(''), 3000);
  };

  // --- QUIZ MANAGEMENT HANDLERS ---
  const handleOpenAddQuestion = () => {
    setEditingQuestion({
      id: Date.now(),
      question: '',
      category: 'nutricao',
      points: 100,
      options: [
        { id: 'a', text: '', isCorrect: true, explanation: '' },
        { id: 'b', text: '', isCorrect: false, explanation: '' },
        { id: 'c', text: '', isCorrect: false, explanation: '' },
        { id: 'd', text: '', isCorrect: false, explanation: '' },
      ],
    });
    setIsQuestionModalOpen(true);
  };

  const handleOpenEditQuestion = (q: QuizQuestion) => {
    setEditingQuestion(JSON.parse(JSON.stringify(q)));
    setIsQuestionModalOpen(true);
  };

  const handleDeleteQuestion = (id: number) => {
    if (confirm('Tem certeza que deseja excluir esta pergunta do quiz?')) {
      const updated = quizQuestions.filter((q) => q.id !== id);
      onUpdateQuizQuestions(updated);
      saveStoredQuizQuestions(updated);
    }
  };

  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingQuestion || !editingQuestion.question?.trim()) {
      alert('Por favor, preencha o enunciado da pergunta.');
      return;
    }

    // Ensure at least one option is marked correct
    const options = editingQuestion.options || [];
    const hasCorrect = options.some((opt) => opt.isCorrect);
    if (!hasCorrect) {
      alert('Por favor, marque pelo menos uma opção como correta.');
      return;
    }

    let updatedList: QuizQuestion[];
    const existingIndex = quizQuestions.findIndex((q) => q.id === editingQuestion.id);

    if (existingIndex >= 0) {
      updatedList = [...quizQuestions];
      updatedList[existingIndex] = editingQuestion as QuizQuestion;
    } else {
      updatedList = [editingQuestion as QuizQuestion, ...quizQuestions];
    }

    onUpdateQuizQuestions(updatedList);
    saveStoredQuizQuestions(updatedList);
    setIsQuestionModalOpen(false);
    setEditingQuestion(null);
  };

  // --- SUBFAMILY MANAGEMENT HANDLERS ---
  const handleOpenAddSubfamily = () => {
    setEditingSubfamily({
      id: 'premier-custom-' + Date.now(),
      name: 'PremieR ',
      subName: 'Nova Linha de Produtos',
      category: 'Super Premium',
      categoryBadgeColor: 'emerald',
      petType: 'both',
      description: '',
      benefits: ['Ingredientes Selecionados', 'Sabor Excepcional'],
      image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&q=80&w=600',
      highlights: ['Sem Corantes', 'Alta Digestibilidade'],
      recommendedFor: 'Cães e Gatos de todas as idades',
      sampleQuestions: ['Quais os benefícios desta nova linha?', 'Como oferecer na transição?'],
    });
    setIsSubfamilyModalOpen(true);
  };

  const handleOpenEditSubfamily = (sub: ProductSubfamily) => {
    setEditingSubfamily(JSON.parse(JSON.stringify(sub)));
    setIsSubfamilyModalOpen(true);
  };

  const handleDeleteSubfamily = (id: string) => {
    if (confirm('Tem certeza que deseja excluir esta subfamília do catálogo?')) {
      const updated = subfamilies.filter((s) => s.id !== id);
      onUpdateSubfamilies(updated);
      saveStoredSubfamilies(updated);
    }
  };

  const handleSaveSubfamily = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSubfamily || !editingSubfamily.name?.trim()) {
      alert('Por favor, preencha o nome da subfamília.');
      return;
    }

    let updatedList: ProductSubfamily[];
    const existingIndex = subfamilies.findIndex((s) => s.id === editingSubfamily.id);

    if (existingIndex >= 0) {
      updatedList = [...subfamilies];
      updatedList[existingIndex] = editingSubfamily as ProductSubfamily;
    } else {
      updatedList = [editingSubfamily as ProductSubfamily, ...subfamilies];
    }

    onUpdateSubfamilies(updatedList);
    saveStoredSubfamilies(updatedList);
    setIsSubfamilyModalOpen(false);
    setEditingSubfamily(null);
  };

  // RESET TO DEFAULT
  const handleResetDefaults = () => {
    if (confirm('⚠️ Deseja restaurar todas as perguntas e subfamílias para os padrões de fábrica da PremieRpet? Todas as alterações personalizadas serão redefinidas.')) {
      const defaultSub = resetSubfamiliesToDefault();
      const defaultQuiz = resetQuizQuestionsToDefault();
      onUpdateSubfamilies(defaultSub);
      onUpdateQuizQuestions(defaultQuiz);
      alert('Dados restaurados com sucesso para os padrões originais!');
    }
  };

  // EXPORT / IMPORT CONFIG
  const handleExportJSON = () => {
    const dataObj = {
      version: '1.0',
      exportedAt: new Date().toISOString(),
      subfamilies,
      quizQuestions,
    };
    const jsonStr = JSON.stringify(dataObj, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `premierpet_admin_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.subfamilies && Array.isArray(parsed.subfamilies)) {
          onUpdateSubfamilies(parsed.subfamilies);
          saveStoredSubfamilies(parsed.subfamilies);
        }
        if (parsed.quizQuestions && Array.isArray(parsed.quizQuestions)) {
          onUpdateQuizQuestions(parsed.quizQuestions);
          saveStoredQuizQuestions(parsed.quizQuestions);
        }
        alert('Configuração importada com sucesso!');
      } catch (err) {
        alert('Erro ao ler o arquivo JSON. Certifique-se de que é um backup válido.');
      }
    };
    reader.readAsText(file);
  };

  // Filter lists
  const filteredQuestions = quizQuestions.filter(
    (q) =>
      q.question.toLowerCase().includes(quizSearch.toLowerCase()) ||
      q.category.toLowerCase().includes(quizSearch.toLowerCase())
  );

  const filteredSubfamilies = subfamilies.filter(
    (s) =>
      s.name.toLowerCase().includes(productSearch.toLowerCase()) ||
      (s.subName && s.subName.toLowerCase().includes(productSearch.toLowerCase())) ||
      s.category.toLowerCase().includes(productSearch.toLowerCase())
  );

  // UNAUTHENTICATED PIN SCREEN (Matches Screenshot 2)
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto p-6 sm:p-8 my-10 bg-white rounded-[32px] shadow-xl border border-slate-100 text-left space-y-4">
        <div className="w-12 h-12 rounded-full bg-[#2532f5] text-white flex items-center justify-center mb-2 shadow-sm">
          <Lock className="w-6 h-6 text-white" />
        </div>

        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#2532f5] tracking-tight">
            Painel de conteúdo
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium mt-1">
            Digite a senha compartilhada para gerenciar sub-famílias, perguntas e pontuações.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 pt-2">
          <div>
            <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Senha
            </label>
            <input
              type="password"
              maxLength={8}
              placeholder="Digite a senha (Padrão: 1234)"
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
              className="w-full text-base font-semibold px-5 py-3 rounded-full border border-[#2532f5] focus:ring-2 focus:ring-[#2532f5]/20 outline-none text-slate-900"
            />
            {pinError && <p className="text-xs text-rose-600 font-bold mt-1.5 ml-2">{pinError}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-[#2532f5] hover:bg-[#1a27e0] text-white font-extrabold rounded-full shadow-md transition flex items-center justify-center gap-2 text-sm"
          >
            <Unlock className="w-4 h-4 text-white" />
            Entrar
          </button>
        </form>

        <p className="text-[11px] text-slate-400 text-center pt-2">
          Senha padrão inicial: <strong className="text-slate-600 font-bold">1234</strong>
        </p>
      </div>
    );
  }

  // AUTHENTICATED ADMIN DASHBOARD (Matches Screenshot 3)
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Top Header Row (Matches Screenshot 3) */}
      <div className="flex items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#2532f5] tracking-tight">
            Painel de conteúdo
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-semibold mt-0.5">
            Chat e quiz Infos PremieRpet
          </p>
        </div>

        <button
          onClick={() => setIsAuthenticated(false)}
          className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-full px-5 py-2 font-bold text-xs flex items-center gap-1.5 shadow-2xs transition shrink-0"
        >
          <Lock className="w-3.5 h-3.5 text-slate-500" />
          Sair
        </button>
      </div>

      {/* Admin Tab Switcher Pill Bar (Matches Screenshot 3) */}
      <div className="bg-[#eef2f9] rounded-full p-1.5 flex items-center gap-1 overflow-x-auto no-scrollbar shadow-2xs border border-slate-200/60">
        <button
          onClick={() => setActiveAdminTab('quiz')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-extrabold transition shrink-0 ${
            activeAdminTab === 'quiz'
              ? 'bg-white text-slate-900 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <HelpCircle className="w-4 h-4 text-[#2532f5]" />
          Perguntas ({quizQuestions.length})
        </button>

        <button
          onClick={() => setActiveAdminTab('products')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-extrabold transition shrink-0 ${
            activeAdminTab === 'products'
              ? 'bg-white text-slate-900 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Package className="w-4 h-4 text-[#2532f5]" />
          Sub-famílias ({subfamilies.length})
        </button>

        <button
          onClick={() => setActiveAdminTab('customization')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-extrabold transition shrink-0 ${
            activeAdminTab === 'customization'
              ? 'bg-white text-slate-900 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Palette className="w-4 h-4 text-[#2532f5]" />
          Personalização
        </button>

        <button
          onClick={() => setActiveAdminTab('settings')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-extrabold transition shrink-0 ${
            activeAdminTab === 'settings'
              ? 'bg-white text-slate-900 shadow-2xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Key className="w-4 h-4 text-[#2532f5]" />
          Ajustes
        </button>
      </div>

      {/* TAB 0: PERSONALIZAÇÃO DE CONTEÚDO */}
      {activeAdminTab === 'customization' && (
        <div className="space-y-6">
          {/* Sub-tab Switcher: Chat vs Quiz */}
          <div className="bg-white p-2 rounded-2xl border border-slate-200 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCustomSubTab('chat')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition ${
                customSubTab === 'chat'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              Personalização do Chat
            </button>

            <button
              type="button"
              onClick={() => setCustomSubTab('quiz')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition ${
                customSubTab === 'quiz'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Award className="w-4 h-4" />
              Personalização do Quiz
            </button>
          </div>

          {saveSuccessMsg && (
            <div className="bg-blue-50 border border-blue-300 text-blue-900 px-4 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 animate-fadeIn">
              <Check className="w-4 h-4 text-[#2532f5]" />
              {saveSuccessMsg}
            </div>
          )}

          {/* SUB-TAB: CHAT */}
          {customSubTab === 'chat' && (
            <form onSubmit={handleSaveChatCustomization} className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Palette className="w-5 h-5 text-amber-500" />
                  <h3 className="font-extrabold text-slate-900 text-base">
                    Identidade & Textos do Chat
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Título do Chat
                    </label>
                    <input
                      type="text"
                      required
                      value={chatForm.title}
                      onChange={(e) => setChatForm({ ...chatForm, title: e.target.value })}
                      placeholder="Ex: Infos PremieRpet"
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 outline-none focus:border-[#2532f5]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Nome do Agente (Personagem)
                    </label>
                    <input
                      type="text"
                      required
                      value={chatForm.agentName}
                      onChange={(e) => setChatForm({ ...chatForm, agentName: e.target.value })}
                      placeholder="Ex: Dra. Patrícia Alves (Paty)"
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 outline-none focus:border-[#2532f5]"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Subtítulo / Descrição
                  </label>
                  <input
                    type="text"
                    required
                    value={chatForm.subtitle}
                    onChange={(e) => setChatForm({ ...chatForm, subtitle: e.target.value })}
                    placeholder="Ex: Fale com a Dra. Patrícia Alves, sua guia médica-veterinária"
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-800 outline-none"
                  />
                </div>

                <div className="text-xs">
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Mensagem de Boas-Vindas do Chat
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={chatForm.welcomeMessage}
                    onChange={(e) => setChatForm({ ...chatForm, welcomeMessage: e.target.value })}
                    placeholder="Ex: Olá, tutor(a)! Sou a Patrícia, médica-veterinária..."
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-900 font-medium outline-none"
                  />
                </div>

                {/* Avatar / Imagem da Patrícia */}
                <div className="text-xs space-y-3 pt-2 border-t border-slate-100">
                  <label className="block font-bold text-slate-800 uppercase tracking-wider">
                    Avatar da Agente (Dra. Patrícia)
                  </label>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    {/* Live Preview Box */}
                    <div className="relative shrink-0">
                      <img
                        src={chatForm.avatarUrl || 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="%232532f5"/></svg>'}
                        alt="Preview Patrícia"
                        referrerPolicy="no-referrer"
                        className="w-20 h-20 rounded-2xl object-cover border-2 border-[#2532f5] shadow-md"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="%232532f5"/></svg>';
                        }}
                      />
                      <span className="absolute -bottom-1 -right-1 bg-amber-400 text-slate-950 text-[9px] font-black px-1.5 py-0.5 rounded-md">
                        PREVIEW
                      </span>
                    </div>

                    <div className="flex-1 space-y-2 w-full">
                      <input
                        type="text"
                        value={chatForm.avatarUrl}
                        onChange={(e) => setChatForm({ ...chatForm, avatarUrl: e.target.value })}
                        placeholder="Cole a URL da imagem ou faça upload ao lado..."
                        className="w-full p-2.5 rounded-xl border border-slate-300 font-mono text-[11px] text-slate-800 outline-none"
                      />

                      <label className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl border border-slate-300 cursor-pointer transition">
                        <Upload className="w-4 h-4 text-[#2532f5]" />
                        <span>Fazer Upload de Foto do Computador</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageFileUpload(e, (dataUrl) => setChatForm({ ...chatForm, avatarUrl: dataUrl }))}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* PESQUISA DE SATISFAÇÃO (CHAT) */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <Smile className="w-5 h-5 text-[#2532f5]" />
                    <h3 className="font-extrabold text-slate-900 text-base">
                      Pesquisa de Satisfação & Cupom no Chat
                    </h3>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={surveyForm.enabled}
                      onChange={(e) => setSurveyForm({ ...surveyForm, enabled: e.target.checked })}
                      className="w-4 h-4 text-[#2532f5] rounded-md focus:ring-[#2532f5]"
                    />
                    <span className="text-xs font-bold text-slate-800">
                      {surveyForm.enabled ? 'Pesquisa Ativada' : 'Pesquisa Desativada'}
                    </span>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Percentual de Desconto (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={surveyForm.discountPercent}
                      onChange={(e) => setSurveyForm({ ...surveyForm, discountPercent: parseInt(e.target.value) || 0 })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Código do Cupom de Desconto
                    </label>
                    <input
                      type="text"
                      required
                      value={surveyForm.couponCode}
                      onChange={(e) => setSurveyForm({ ...surveyForm, couponCode: e.target.value.toUpperCase() })}
                      placeholder="Ex: INFOSPREMIER10"
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-mono font-bold text-slate-900 outline-none uppercase"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Mensagem de Agradecimento
                  </label>
                  <textarea
                    rows={2}
                    value={surveyForm.thankYouMessage}
                    onChange={(e) => setSurveyForm({ ...surveyForm, thankYouMessage: e.target.value })}
                    placeholder="Muito obrigado por avaliar nosso atendimento com a Dra. Patrícia..."
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-800 font-medium outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#2532f5] hover:bg-[#1a27e0] text-white font-bold rounded-2xl shadow-md transition flex items-center gap-2 text-xs"
                >
                  <Save className="w-4 h-4 text-amber-300" />
                  Salvar Personalização do Chat
                </button>
              </div>
            </form>
          )}

          {/* SUB-TAB: QUIZ */}
          {customSubTab === 'quiz' && (
            <form onSubmit={handleSaveQuizCustomization} className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Palette className="w-5 h-5 text-amber-500" />
                  <h3 className="font-extrabold text-slate-900 text-base">
                    Identidade & Banner do Quiz
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Título do Quiz
                    </label>
                    <input
                      type="text"
                      required
                      value={quizForm.title}
                      onChange={(e) => setQuizForm({ ...quizForm, title: e.target.value })}
                      placeholder="Ex: Desafio Tutor de Ouro PremieRpet 🏆"
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 outline-none focus:border-[#2532f5]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Subtítulo / Descrição do Quiz
                    </label>
                    <input
                      type="text"
                      required
                      value={quizForm.subtitle}
                      onChange={(e) => setQuizForm({ ...quizForm, subtitle: e.target.value })}
                      placeholder="Ex: Testando conhecimentos nutricionais para o bem-estar do seu pet"
                      className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-800 outline-none"
                    />
                  </div>
                </div>

                {/* Banner do Quiz */}
                <div className="text-xs space-y-3 pt-2 border-t border-slate-100">
                  <label className="block font-bold text-slate-800 uppercase tracking-wider">
                    Banner / Imagem Ilustrativa do Quiz
                  </label>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    {/* Live Preview Box */}
                    <div className="relative shrink-0 w-full sm:w-48 h-28 rounded-2xl overflow-hidden border-2 border-[#2532f5] shadow-md">
                      <img
                        src={quizForm.bannerUrl}
                        alt="Preview Banner Quiz"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800';
                        }}
                      />
                      <span className="absolute top-2 left-2 bg-amber-400 text-slate-950 text-[9px] font-black px-1.5 py-0.5 rounded-md">
                        BANNER
                      </span>
                    </div>

                    <div className="flex-1 space-y-2 w-full">
                      <input
                        type="text"
                        value={quizForm.bannerUrl}
                        onChange={(e) => setQuizForm({ ...quizForm, bannerUrl: e.target.value })}
                        placeholder="Cole a URL do banner ou faça upload ao lado..."
                        className="w-full p-2.5 rounded-xl border border-slate-300 font-mono text-[11px] text-slate-800 outline-none"
                      />

                      <label className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl border border-slate-300 cursor-pointer transition">
                        <Upload className="w-4 h-4 text-[#2532f5]" />
                        <span>Fazer Upload do Banner</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageFileUpload(e, (dataUrl) => setQuizForm({ ...quizForm, bannerUrl: dataUrl }))}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* BONIFICAÇÃO DO QUIZ */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Gift className="w-5 h-5 text-amber-500" />
                  <h3 className="font-extrabold text-slate-900 text-base">
                    Configuração de Bonificação do Quiz
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Mínimo de Acertos para Desconto
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      step="1"
                      value={quizBonusForm.minScore}
                      onChange={(e) => setQuizBonusForm({ ...quizBonusForm, minScore: parseInt(e.target.value) || 1 })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 outline-none focus:border-[#2532f5]"
                    />
                    <p className="text-[10px] text-slate-500 font-medium mt-1">
                      Mínimo de respostas corretas necessárias para liberar o desconto (Ex: 3 acertos).
                    </p>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Percentual de Desconto (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={quizBonusForm.discountPercent}
                      onChange={(e) => setQuizBonusForm({ ...quizBonusForm, discountPercent: parseInt(e.target.value) || 0 })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Código do Cupom
                    </label>
                    <input
                      type="text"
                      required
                      value={quizBonusForm.couponCode}
                      onChange={(e) => setQuizBonusForm({ ...quizBonusForm, couponCode: e.target.value.toUpperCase() })}
                      placeholder="Ex: TUTORDEOURO15"
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-mono font-bold text-slate-900 outline-none uppercase"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Mensagem de Recompensa (Certificado)
                  </label>
                  <textarea
                    rows={2}
                    value={quizBonusForm.rewardMessage}
                    onChange={(e) => setQuizBonusForm({ ...quizBonusForm, rewardMessage: e.target.value })}
                    placeholder="Parabéns! Sua pontuação provou que você é um Tutor Nota 10..."
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-800 font-medium outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#2532f5] hover:bg-[#1a27e0] text-white font-bold rounded-2xl shadow-md transition flex items-center gap-2 text-xs"
                >
                  <Save className="w-4 h-4 text-amber-300" />
                  Salvar Personalização do Quiz
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* TAB 1: QUIZ MANAGEMENT (Matches Screenshot 3) */}
      {activeAdminTab === 'quiz' && (
        <div className="space-y-4">
          <button
            onClick={handleOpenAddQuestion}
            className="w-full bg-[#2532f5] hover:bg-[#1a27e0] text-white font-extrabold rounded-full py-3.5 text-sm shadow-sm transition flex items-center justify-center gap-2 mb-4"
          >
            <Plus className="w-5 h-5 text-white" />
            Nova pergunta
          </button>

          <div className="mb-3">
            <input
              type="text"
              placeholder="Buscar pergunta ou categoria..."
              value={quizSearch}
              onChange={(e) => setQuizSearch(e.target.value)}
              className="w-full px-5 py-2.5 rounded-full border border-slate-200 text-xs text-slate-800 outline-none focus:border-[#2532f5] bg-white shadow-2xs"
            />
          </div>

          <div className="space-y-3">
            {filteredQuestions.map((q) => {
              const correctOpt = q.options.find((o) => o.isCorrect);
              return (
                <div
                  key={q.id}
                  className="bg-white border border-slate-100/90 rounded-[24px] p-5 shadow-2xs hover:shadow-xs transition flex items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <h4 className="font-extrabold text-slate-900 text-sm sm:text-base leading-snug">
                      {q.question}
                    </h4>
                    <p className="text-xs text-slate-500 font-normal">
                      {q.category} • {q.points} pontos • resposta: <span className="font-semibold text-slate-700">{correctOpt?.text || 'N/A'}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleOpenEditQuestion(q)}
                      className="p-2 text-slate-700 hover:text-[#2532f5] rounded-full transition"
                      title="Editar Pergunta"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteQuestion(q.id)}
                      className="p-2 text-rose-500 hover:text-rose-700 rounded-full transition"
                      title="Excluir Pergunta"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: SUBFAMILIES MANAGEMENT */}
      {activeAdminTab === 'products' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200">
            <input
              type="text"
              placeholder="Buscar subfamília ou categoria..."
              value={productSearch}
              onChange={(e) => setProductSearch(e.target.value)}
              className="w-full sm:w-72 px-3.5 py-2 rounded-xl border border-slate-300 text-xs text-slate-800 outline-none focus:border-[#2532f5]"
            />

            <button
              onClick={handleOpenAddSubfamily}
              className="w-full sm:w-auto px-4 py-2 bg-[#2532f5] hover:bg-[#1a27e0] text-white font-bold text-xs rounded-xl shadow-sm transition flex items-center justify-center gap-1.5 shrink-0"
            >
              <Plus className="w-4 h-4 text-amber-300" />
              Nova Subfamília PremieRpet
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSubfamilies.map((sub) => (
              <div
                key={sub.id}
                className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs hover:border-blue-300 transition space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <img
                      src={sub.image}
                      alt={sub.name}
                      className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-1 flex-wrap">
                        <span className="text-[9px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md">
                          {sub.category}
                        </span>
                        <span className="text-[9px] font-bold uppercase tracking-wider bg-blue-100 text-[#2532f5] px-2 py-0.5 rounded-md">
                          {sub.petType === 'dog' ? '🐶 Cães' : sub.petType === 'cat' ? '🐱 Gatos' : '🐾 Ambos'}
                        </span>
                      </div>
                      <h4 className="font-extrabold text-slate-900 text-base truncate">{sub.name}</h4>
                      {sub.subName && <p className="text-xs text-[#2532f5] font-semibold">{sub.subName}</p>}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2">{sub.description}</p>

                  <div className="flex flex-wrap gap-1">
                    {sub.highlights.map((h, i) => (
                      <span key={i} className="text-[10px] bg-amber-50 text-amber-900 font-medium px-2 py-0.5 rounded-md border border-amber-200">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-400 text-[11px]">{sub.sampleQuestions?.length || 0} perguntas sugeridas</span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEditSubfamily(sub)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-lg text-xs transition flex items-center gap-1"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteSubfamily(sub.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                      title="Excluir"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: BACKUP & SETTINGS */}
      {activeAdminTab === 'settings' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
              <Key className="w-5 h-5 text-amber-500" />
              Segurança e Senha PIN
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Altere a senha de acesso ao Painel Admin.
            </p>

            <form onSubmit={handleChangePin} className="mt-4 flex flex-col sm:flex-row items-center gap-3">
              <input
                type="password"
                placeholder="Novo PIN (mínimo 4 caracteres)"
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
                className="w-full sm:w-64 px-4 py-2.5 rounded-xl border border-slate-300 text-xs text-slate-900 font-bold outline-none focus:border-[#2532f5]"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-5 py-2.5 bg-[#2532f5] hover:bg-[#1a27e0] text-white font-bold text-xs rounded-xl transition shadow-sm"
              >
                Salvar Novo PIN
              </button>
            </form>
            {pinSuccessMsg && (
              <p className="text-xs text-[#2532f5] font-bold mt-2 flex items-center gap-1">
                <Check className="w-4 h-4" /> {pinSuccessMsg}
              </p>
            )}
          </div>

          <hr className="border-slate-100" />

          <div>
            <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
              <Download className="w-5 h-5 text-indigo-600" />
              Backup & Importação em Lote
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Exporte todos os dados cadastrados em arquivo JSON ou importe configurações completas.
            </p>

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={handleExportJSON}
                className="px-4 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 font-bold text-xs rounded-xl border border-indigo-200 transition flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-indigo-600" />
                Exportar Backup (.json)
              </button>

              <label className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl border border-slate-300 transition cursor-pointer flex items-center gap-2">
                <Upload className="w-4 h-4 text-slate-600" />
                Importar Backup (.json)
                <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
              </label>
            </div>
          </div>

          <hr className="border-slate-100" />

          <div>
            <h3 className="font-extrabold text-rose-900 text-lg flex items-center gap-2">
              <RotateCcw className="w-5 h-5 text-rose-600" />
              Restaurar Dados Padrões
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Reseta o banco local para as perguntas e subfamílias padrão da fábrica da PremieRpet.
            </p>

            <button
              onClick={handleResetDefaults}
              className="mt-4 px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-800 font-bold text-xs rounded-xl border border-rose-200 transition flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4 text-rose-600" />
              Restaurar Padrões Originais
            </button>
          </div>
        </div>
      )}

      {/* --- QUESTION EDIT MODAL --- */}
      {isQuestionModalOpen && editingQuestion && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[#2532f5]" />
                {quizQuestions.some((q) => q.id === editingQuestion.id)
                  ? 'Editar Pergunta do Quiz'
                  : 'Cadastrar Nova Pergunta no Quiz'}
              </h3>
              <button
                onClick={() => setIsQuestionModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveQuestion} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Enunciado da Pergunta
                </label>
                <textarea
                  required
                  rows={3}
                  value={editingQuestion.question || ''}
                  onChange={(e) => setEditingQuestion({ ...editingQuestion, question: e.target.value })}
                  placeholder="Ex: Qual ingrediente funcional é utilizado nos biscoitos PremieR Cookie para saúde oral?"
                  className="w-full p-3 rounded-xl border border-slate-300 font-medium text-slate-900 text-xs outline-none focus:border-[#2532f5]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Categoria
                  </label>
                  <select
                    value={editingQuestion.category || 'nutricao'}
                    onChange={(e) => setEditingQuestion({ ...editingQuestion, category: e.target.value as any })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-800 outline-none"
                  >
                    <option value="nutricao">Nutrição</option>
                    <option value="linha_premier">Linha PremieR</option>
                    <option value="saude">Saúde</option>
                    <option value="cuidados">Cuidados</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Pontos Recompensa
                  </label>
                  <input
                    type="number"
                    min="50"
                    step="50"
                    value={editingQuestion.points || 100}
                    onChange={(e) => setEditingQuestion({ ...editingQuestion, points: parseInt(e.target.value) || 100 })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-800 outline-none"
                  />
                </div>
              </div>

              {/* Options */}
              <div className="space-y-3 pt-2">
                <label className="block font-bold text-slate-800 uppercase tracking-wider">
                  Opções de Resposta (Marque a alternativa correta):
                </label>

                {editingQuestion.options?.map((opt, idx) => (
                  <div key={opt.id || idx} className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="correct_option"
                        checked={opt.isCorrect}
                        onChange={() => {
                          const updatedOpts = editingQuestion.options?.map((o, i) => ({
                            ...o,
                            isCorrect: i === idx,
                          }));
                          setEditingQuestion({ ...editingQuestion, options: updatedOpts });
                        }}
                        className="w-4 h-4 text-[#2532f5] focus:ring-[#2532f5]"
                      />
                      <span className="font-black text-slate-700 uppercase">{opt.id})</span>
                      <input
                        type="text"
                        required
                        value={opt.text}
                        onChange={(e) => {
                          const updatedOpts = [...(editingQuestion.options || [])];
                          updatedOpts[idx] = { ...updatedOpts[idx], text: e.target.value };
                          setEditingQuestion({ ...editingQuestion, options: updatedOpts });
                        }}
                        placeholder={`Texto da alternativa ${opt.id.toUpperCase()}`}
                        className="flex-1 p-2 rounded-xl border border-slate-300 bg-white font-medium text-slate-900 outline-none"
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        value={opt.explanation}
                        onChange={(e) => {
                          const updatedOpts = [...(editingQuestion.options || [])];
                          updatedOpts[idx] = { ...updatedOpts[idx], explanation: e.target.value };
                          setEditingQuestion({ ...editingQuestion, options: updatedOpts });
                        }}
                        placeholder="Explicação educativa quando o tutor seleciona esta opção..."
                        className="w-full p-2 rounded-xl border border-slate-200 bg-white text-[11px] text-slate-600 outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsQuestionModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#2532f5] hover:bg-[#1a27e0] text-white font-bold rounded-xl text-xs shadow-md transition flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4 text-amber-300" />
                  Salvar Pergunta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- SUBFAMILY EDIT MODAL --- */}
      {isSubfamilyModalOpen && editingSubfamily && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-lg flex items-center gap-2">
                <Package className="w-5 h-5 text-[#2532f5]" />
                {subfamilies.some((s) => s.id === editingSubfamily.id)
                  ? 'Editar Subfamília PremieRpet'
                  : 'Cadastrar Nova Subfamília'}
              </h3>
              <button
                onClick={() => setIsSubfamilyModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSubfamily} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Nome da Subfamília
                  </label>
                  <input
                    type="text"
                    required
                    value={editingSubfamily.name || ''}
                    onChange={(e) => setEditingSubfamily({ ...editingSubfamily, name: e.target.value })}
                    placeholder="Ex: PremieR Cookie"
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 outline-none focus:border-[#2532f5]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Sub-título ou Slogan
                  </label>
                  <input
                    type="text"
                    value={editingSubfamily.subName || ''}
                    onChange={(e) => setEditingSubfamily({ ...editingSubfamily, subName: e.target.value })}
                    placeholder="Ex: Biscoitos Crocantes Assados"
                    className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-800 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Categoria
                  </label>
                  <select
                    value={editingSubfamily.category || 'Super Premium'}
                    onChange={(e) => setEditingSubfamily({ ...editingSubfamily, category: e.target.value as ProductCategory })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-800 outline-none"
                  >
                    <option value="Super Premium">Super Premium</option>
                    <option value="Alimentos Específicos">Alimentos Específicos</option>
                    <option value="Nutrição Clínica">Nutrição Clínica</option>
                    <option value="Alimento Completo Úmidos">Alimento Completo Úmidos</option>
                    <option value="Natural & Orgânico">Natural & Orgânico</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Espécie Indicada
                  </label>
                  <select
                    value={editingSubfamily.petType || 'both'}
                    onChange={(e) => setEditingSubfamily({ ...editingSubfamily, petType: e.target.value as PetType })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 font-bold text-slate-800 outline-none"
                  >
                    <option value="dog">🐶 Cães</option>
                    <option value="cat">🐱 Gatos</option>
                    <option value="both">🐾 Ambos (Cães e Gatos)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  URL da Imagem Ilustrativa
                </label>
                <input
                  type="text"
                  required
                  value={editingSubfamily.image || ''}
                  onChange={(e) => setEditingSubfamily({ ...editingSubfamily, image: e.target.value })}
                  placeholder="https://..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-mono text-[11px] text-slate-800 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Descrição Completa
                </label>
                <textarea
                  required
                  rows={3}
                  value={editingSubfamily.description || ''}
                  onChange={(e) => setEditingSubfamily({ ...editingSubfamily, description: e.target.value })}
                  placeholder="Descrição detalhada sobre diferenciais, fórmulas e benefícios para o chat e catálogo..."
                  className="w-full p-2.5 rounded-xl border border-slate-300 font-medium text-slate-900 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Recomendado Para
                </label>
                <input
                  type="text"
                  value={editingSubfamily.recommendedFor || ''}
                  onChange={(e) => setEditingSubfamily({ ...editingSubfamily, recommendedFor: e.target.value })}
                  placeholder="Ex: Cães adultos de pequeno porte com dentes sensíveis"
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-800 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Destaques Nutricionais (separados por vírgula)
                </label>
                <input
                  type="text"
                  value={editingSubfamily.highlights?.join(', ') || ''}
                  onChange={(e) =>
                    setEditingSubfamily({
                      ...editingSubfamily,
                      highlights: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  placeholder="Ex: Cage Free, Hexametafosfato, Baixo Sódio"
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-800 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Perguntas Sugeridas para o Tutor no Chat (uma por linha)
                </label>
                <textarea
                  rows={2}
                  value={editingSubfamily.sampleQuestions?.join('\n') || ''}
                  onChange={(e) =>
                    setEditingSubfamily({
                      ...editingSubfamily,
                      sampleQuestions: e.target.value.split('\n').filter((line) => line.trim().length > 0),
                    })
                  }
                  placeholder="Qual a quantidade diária recomendada?&#10;Pode ser oferecido como petisco de adestramento?"
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-slate-800 outline-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsSubfamilyModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#2532f5] hover:bg-[#1a27e0] text-white font-bold rounded-xl text-xs shadow-md transition flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4 text-amber-300" />
                  Salvar Subfamília
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
