import React, { useState, useEffect } from 'react';
import { PetProfile, ProductSubfamily, QuizQuestion, ChatCustomization, QuizCustomization, SurveyConfig, QuizBonusConfig } from './types';
import { Header } from './components/Header';
import { Navigation, TabType } from './components/Navigation';
import { ChatBot } from './components/ChatBot';
import { QuizSection } from './components/QuizSection';
import { AdminPanel } from './components/AdminPanel';
import { MobileFrameWrapper } from './components/MobileFrameWrapper';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import {
  getStoredSubfamilies,
  getStoredQuizQuestions,
  getChatCustomization,
  getQuizCustomization,
  getSurveyConfig,
  getQuizBonusConfig,
} from './utils/storage';

function getInitialPath(): string {
  if (typeof window === 'undefined') return '/';
  const path = window.location.pathname;
  const hash = window.location.hash;
  const search = window.location.search;
  if (path.startsWith('/admin') || hash.includes('admin') || search.includes('admin')) {
    return '/admin';
  }
  return '/';
}

export default function App() {
  const [routePath, setRoutePath] = useState<string>(getInitialPath);
  const [activeTab, setActiveTab] = useState<TabType>('chat');
  const [isMobileSimulated, setIsMobileSimulated] = useState<boolean>(false);
  const [userQuizPoints, setUserQuizPoints] = useState<number>(300);

  // Sync route changes with browser history
  useEffect(() => {
    const handleLocationChange = () => {
      setRoutePath(getInitialPath());
    };
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateTo = (path: string) => {
    if (typeof window !== 'undefined') {
      window.history.pushState({}, '', path);
      setRoutePath(path);
    }
  };

  // Dynamic Subfamilies & Quiz Questions managed by Admin Panel
  const [subfamilies, setSubfamilies] = useState<ProductSubfamily[]>(getStoredSubfamilies);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>(getStoredQuizQuestions);

  // Customization & Discount configs
  const [chatCustomization, setChatCustomization] = useState<ChatCustomization>(getChatCustomization);
  const [quizCustomization, setQuizCustomization] = useState<QuizCustomization>(getQuizCustomization);
  const [surveyConfig, setSurveyConfig] = useState<SurveyConfig>(getSurveyConfig);
  const [quizBonusConfig, setQuizBonusConfig] = useState<QuizBonusConfig>(getQuizBonusConfig);

  const handleAddQuizPoints = (pts: number) => {
    setUserQuizPoints((prev) => prev + pts);
  };

  const isAdminRoute = routePath === '/admin' || routePath.startsWith('/admin');

  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-[#f2f5fd] font-sans text-slate-900 flex flex-col">
        {/* Admin Navigation Header */}
        <header className="bg-white border-b border-slate-200 px-4 py-3 sticky top-0 z-40 shadow-2xs">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#2532f5] text-white flex items-center justify-center font-bold">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h1 className="font-extrabold text-sm text-slate-900 leading-tight">Infos PremieRpet</h1>
                <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Painel de Conteúdo</p>
              </div>
            </div>

            <button
              onClick={() => navigateTo('/')}
              className="flex items-center gap-2 text-xs font-extrabold text-[#2532f5] hover:text-[#1a27e0] bg-blue-50 hover:bg-blue-100/80 px-4 py-2 rounded-full transition border border-blue-200/60"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar para o App do Tutor</span>
            </button>
          </div>
        </header>

        <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6">
          <AdminPanel
            subfamilies={subfamilies}
            onUpdateSubfamilies={setSubfamilies}
            quizQuestions={quizQuestions}
            onUpdateQuizQuestions={setQuizQuestions}
            chatCustomization={chatCustomization}
            onUpdateChatCustomization={setChatCustomization}
            quizCustomization={quizCustomization}
            onUpdateQuizCustomization={setQuizCustomization}
            surveyConfig={surveyConfig}
            onUpdateSurveyConfig={setSurveyConfig}
            quizBonusConfig={quizBonusConfig}
            onUpdateQuizBonusConfig={setQuizBonusConfig}
          />
        </main>
      </div>
    );
  }

  return (
    <MobileFrameWrapper
      isSimulated={isMobileSimulated}
      onToggleSimulated={() => setIsMobileSimulated((prev) => !prev)}
    >
      <div className="flex flex-col min-h-screen bg-[#f2f5fd] font-sans text-slate-900 pb-16 md:pb-6">
        {/* Header Bar */}
        <Header
          isMobileSimulated={isMobileSimulated}
          onToggleMobileSimulated={() => setIsMobileSimulated((prev) => !prev)}
          userQuizPoints={userQuizPoints}
          avatarUrl={chatCustomization.avatarUrl}
        />

        {/* Navigation Tabs (Strictly Conversar & Quiz) */}
        <Navigation activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab)} />

        {/* Main Tab Content Viewport */}
        <main className="flex-1 w-full max-w-7xl mx-auto py-2 px-2 sm:px-4">
          {activeTab === 'chat' && (
            <ChatBot
              customSubfamilies={subfamilies}
              chatCustomization={chatCustomization}
              surveyConfig={surveyConfig}
              onNavigateToQuiz={() => setActiveTab('quiz')}
            />
          )}

          {activeTab === 'quiz' && (
            <QuizSection
              quizQuestions={quizQuestions}
              quizCustomization={quizCustomization}
              quizBonusConfig={quizBonusConfig}
              onAddPoints={handleAddQuizPoints}
              onNavigateToChat={() => setActiveTab('chat')}
            />
          )}
        </main>

        {/* Footer Admin Link */}
        <footer className="text-center py-4 text-xs text-slate-400">
          <button
            onClick={() => navigateTo('/admin')}
            className="hover:text-[#2532f5] font-semibold transition inline-flex items-center gap-1 opacity-70 hover:opacity-100"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Acesso Administrativo (/admin)</span>
          </button>
        </footer>
      </div>
    </MobileFrameWrapper>
  );
}
