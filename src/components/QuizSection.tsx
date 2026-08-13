import React, { useState, useRef } from 'react';
import { PET_QUIZ_QUESTIONS } from '../data/quizQuestions';
import { PetProfile, QuizQuestion, QuizCustomization, QuizBonusConfig, QuizTheme } from '../types';
import { DEFAULT_QUIZ_CUSTOMIZATION, DEFAULT_QUIZ_BONUS_CONFIG, DEFAULT_QUIZ_THEMES, saveQuizParticipation, updateParticipationPhoto } from '../utils/storage';
import {
  Award,
  CheckCircle2,
  XCircle,
  Sparkles,
  RefreshCw,
  Trophy,
  ShieldCheck,
  Gift,
  Copy,
  Check,
  ArrowRight,
  Camera,
  Upload,
  Image as ImageIcon,
  Heart,
  Trash2,
  Star,
  Layers,
  Filter
} from 'lucide-react';

interface QuizSectionProps {
  petProfile?: PetProfile;
  quizQuestions?: QuizQuestion[];
  quizThemes?: QuizTheme[];
  quizCustomization?: QuizCustomization;
  quizBonusConfig?: QuizBonusConfig;
  onAddPoints?: (pts: number) => void;
  onNavigateToChat: () => void;
}

export const QuizSection: React.FC<QuizSectionProps> = ({
  petProfile,
  quizQuestions = PET_QUIZ_QUESTIONS,
  quizThemes = DEFAULT_QUIZ_THEMES,
  quizCustomization = DEFAULT_QUIZ_CUSTOMIZATION,
  quizBonusConfig = DEFAULT_QUIZ_BONUS_CONFIG,
  onNavigateToChat,
}) => {
  const [selectedThemeId, setSelectedThemeId] = useState<string>('todos');

  const allQuestions = quizQuestions && quizQuestions.length > 0 ? quizQuestions : PET_QUIZ_QUESTIONS;
  const themesList = quizThemes && quizThemes.length > 0 ? quizThemes : DEFAULT_QUIZ_THEMES;

  const filteredQuestions = selectedThemeId === 'todos'
    ? allQuestions
    : allQuestions.filter((q) => q.category === selectedThemeId);

  const activeQuestions = filteredQuestions.length > 0 ? filteredQuestions : allQuestions;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [hasCopiedBonusCoupon, setHasCopiedBonusCoupon] = useState(false);

  const handleSelectTheme = (themeId: string) => {
    setSelectedThemeId(themeId);
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setCorrectAnswersCount(0);
    setIsQuizFinished(false);
  };

  // Quiz Evaluation State (Required to unlock discount)
  const [hasEvaluatedQuiz, setHasEvaluatedQuiz] = useState(false);
  const [quizEvaluationRating, setQuizEvaluationRating] = useState<number | null>(null);
  const [quizEvaluationComment, setQuizEvaluationComment] = useState('');
  const [generatedToken, setGeneratedToken] = useState<string | null>(null);

  // Momento PremieR Photo Upload State
  const [petPhotoUrl, setPetPhotoUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentQ = activeQuestions[currentQuestionIndex] || activeQuestions[0];

  const handleSelectOption = (optionId: string) => {
    if (isAnswered) return;

    setSelectedOptionId(optionId);
    setIsAnswered(true);

    const chosenOption = currentQ.options.find((o) => o.id === optionId);
    if (chosenOption?.isCorrect) {
      setCorrectAnswersCount((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOptionId(null);
      setIsAnswered(false);
    } else {
      setIsQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setIsAnswered(false);
    setCorrectAnswersCount(0);
    setIsQuizFinished(false);
    setHasEvaluatedQuiz(false);
    setQuizEvaluationRating(null);
    setQuizEvaluationComment('');
    setPetPhotoUrl(null);
    setGeneratedToken(null);
  };

  const minRequiredCorrect = quizBonusConfig.minScore || 1;
  const hasPassedQuiz = correctAnswersCount >= minRequiredCorrect;

  const baseDiscount = quizBonusConfig.discountPercent || 5;
  const finalDiscount = petPhotoUrl ? baseDiscount + 5 : baseDiscount; // +5% Extra for Momento PremieR Photo!

  const handleEvaluateAndUnlock = () => {
    setHasEvaluatedQuiz(true);
    const participation = saveQuizParticipation({
      correctAnswers: correctAnswersCount,
      totalQuestions: activeQuestions.length,
      discountPercent: baseDiscount,
      hasMomentoPremierPhoto: Boolean(petPhotoUrl),
      petPhotoUrl: petPhotoUrl || undefined,
      quizEvaluationRating: quizEvaluationRating || 5,
      quizEvaluationComment: quizEvaluationComment.trim() || undefined,
    });
    setGeneratedToken(participation.id);
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setPetPhotoUrl(dataUrl);
        if (generatedToken) {
          updateParticipationPhoto(generatedToken, dataUrl);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const displayCouponCode = generatedToken || quizBonusConfig.couponCode || 'PREMIER5';

  const handleCopyBonusCoupon = () => {
    navigator.clipboard.writeText(displayCouponCode);
    setHasCopiedBonusCoupon(true);
    setTimeout(() => setHasCopiedBonusCoupon(false), 2500);
  };

  const getTutorTitle = (correct: number, total: number) => {
    const ratio = correct / Math.max(total, 1);
    if (ratio === 1) return 'Mestre Nutricional PremieR ⭐⭐⭐';
    if (ratio >= 0.8) return 'Especialista em Nutrição Pet ⭐⭐';
    if (ratio >= 0.5) return 'Tutor Dedicado & Atento ⭐';
    return 'Tutor Aprendiz Amoroso 🐾';
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Quiz Banner Header */}
      <div className="relative bg-gradient-to-r from-blue-900 via-[#2532f5] to-blue-950 text-white rounded-3xl shadow-lg border border-blue-400/30 overflow-hidden">
        {quizCustomization.bannerUrl && (
          <div className="absolute inset-0 opacity-20 mix-blend-overlay">
            <img
              src={quizCustomization.bannerUrl}
              alt="Quiz Banner"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          </div>
        )}

        <div className="relative z-10 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
              {quizCustomization.title}
            </h2>
            <p className="text-xs text-blue-100 mt-1">
              {quizCustomization.subtitle || 'Testando conhecimentos nutricionais para o bem-estar do seu pet'}
            </p>
          </div>

          <div className="text-right shrink-0 bg-white/10 px-4 py-2.5 rounded-2xl border border-white/20 backdrop-blur-xs">
            <div className="text-xl sm:text-2xl font-black text-amber-300 flex items-center justify-end gap-1.5">
              <CheckCircle2 className="w-5 h-5 text-amber-300" />
              <span>{correctAnswersCount} / {activeQuestions.length}</span>
            </div>
            <div className="text-[10px] text-blue-200 uppercase font-bold tracking-wider">Acertos</div>
          </div>
        </div>
      </div>

      {/* Quiz Theme / Consolidado Selector */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs space-y-2">
        <div className="flex items-center justify-between text-xs font-black uppercase text-slate-500 tracking-wider">
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-[#2532f5]" />
            <span>Selecione o Tipo do Quiz (Tema):</span>
          </div>
          <span className="text-[10px] text-slate-400 font-bold lowercase">
            {activeQuestions.length} {activeQuestions.length === 1 ? 'pergunta' : 'perguntas'}
          </span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {themesList.map((theme) => {
            const isSelected = selectedThemeId === theme.id;
            return (
              <button
                key={theme.id}
                onClick={() => handleSelectTheme(theme.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap shrink-0 border ${
                  isSelected
                    ? 'bg-[#2532f5] text-white border-[#2532f5] shadow-sm'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <span>{theme.icon || '📌'}</span>
                <span>{theme.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {!isQuizFinished ? (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-6">
          {/* Question Progress Bar */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
              <span>Pergunta {currentQuestionIndex + 1} de {activeQuestions.length}</span>
              <span className="text-[#2532f5] font-extrabold">Acertos: {correctAnswersCount}</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#2532f5] transition-all duration-500"
                style={{ width: `${((currentQuestionIndex + 1) / activeQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Title */}
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
              {currentQ.question}
            </h3>
          </div>

          {/* Answer Options */}
          <div className="space-y-3">
            {currentQ.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              let btnStyle = 'border-slate-200 bg-white hover:border-slate-300 text-slate-800';

              if (isAnswered) {
                if (opt.isCorrect) {
                  btnStyle = 'border-[#2532f5] bg-blue-50 text-blue-950 font-semibold shadow-xs';
                } else if (isSelected && !opt.isCorrect) {
                  btnStyle = 'border-rose-500 bg-rose-50 text-rose-950 font-semibold';
                } else {
                  btnStyle = 'border-slate-100 bg-slate-50 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={opt.id}
                  disabled={isAnswered}
                  onClick={() => handleSelectOption(opt.id)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-start gap-3 text-sm relative ${btnStyle}`}
                >
                  <div className="mt-0.5 shrink-0">
                    {isAnswered ? (
                      opt.isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-[#2532f5]" />
                      ) : isSelected ? (
                        <XCircle className="w-5 h-5 text-rose-600" />
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-slate-300" />
                      )
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
                    )}
                  </div>
                  <span className="flex-1">{opt.text}</span>
                </button>
              );
            })}
          </div>

          {/* Explanation Box when Answered */}
          {isAnswered && (
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 animate-fadeIn space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-slate-700">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Explicação Educativa:
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {currentQ.options.find((o) => o.id === selectedOptionId)?.explanation ||
                  currentQ.options.find((o) => o.isCorrect)?.explanation}
              </p>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  className="bg-[#2532f5] hover:bg-[#1a27e0] text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md transition flex items-center gap-1.5"
                >
                  <span>{currentQuestionIndex < activeQuestions.length - 1 ? 'Próxima Pergunta' : 'Finalizar Quiz'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : !hasPassedQuiz ? (
        /* Screen when tutor did NOT meet minimum correct answers threshold */
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-slate-200 space-y-6 text-center animate-fadeIn">
          <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto text-rose-600 shadow-inner">
            <XCircle className="w-10 h-10 text-rose-500" />
          </div>

          <div>
            <span className="text-xs font-black uppercase text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
              Mínimo de Acertos Não Atingido
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Quase lá, Tutor! 🐾
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-2 max-w-md mx-auto">
              Você acertou <strong className="text-slate-900 font-bold">{correctAnswersCount} de {activeQuestions.length}</strong> perguntas.
            </p>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Para liberar o cupom de desconto, é necessário acertar pelo menos <strong className="text-[#2532f5] font-bold">{minRequiredCorrect} {minRequiredCorrect === 1 ? 'pergunta' : 'perguntas'}</strong>. Refaça o quiz para tentar novamente!
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={handleRestartQuiz}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#2532f5] hover:bg-[#1a27e0] text-white font-extrabold rounded-2xl text-xs shadow-lg transition flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4 text-amber-300" />
              <span>Tentar Novamente</span>
            </button>
            <button
              onClick={onNavigateToChat}
              className="w-full sm:w-auto px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-2xl text-xs transition"
            >
              <span>Tirar Dúvidas no Chat</span>
            </button>
          </div>
        </div>
      ) : !hasEvaluatedQuiz ? (
        /* Mandatory Evaluation Screen before Unlocking Discount */
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-amber-400 space-y-6 text-center animate-fadeIn">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto text-amber-600 shadow-inner">
            <Trophy className="w-10 h-10 text-amber-500 animate-bounce" />
          </div>

          <div>
            <span className="text-xs font-black uppercase text-amber-600 tracking-widest bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Acertos Necessários Atingidos ({correctAnswersCount}/{activeQuestions.length})!
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Parabéns, Você Conquistou seu Desconto! 🎉
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1 max-w-md mx-auto">
              Para liberar seu <strong>Cupom de Desconto Exclusivo</strong> e ter acesso ao <strong>Momento PremieR</strong>, faça uma rápida avaliação da sua experiência com o Quiz:
            </p>
          </div>

          {/* Rating Selection */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4 max-w-lg mx-auto text-left">
            <label className="block text-xs font-bold text-slate-800 text-center">
              Como você avalia este Quiz de Nutrição Pet?
            </label>

            <div className="flex items-center justify-center gap-2 sm:gap-3 py-2">
              {[
                { rating: 1, emoji: '😡', label: 'Muito Insatisfeito' },
                { rating: 2, emoji: '🙁', label: 'Insatisfeito' },
                { rating: 3, emoji: '😐', label: 'Regular' },
                { rating: 4, emoji: '🙂', label: 'Satisfeito' },
                { rating: 5, emoji: '😀', label: 'Excelente' },
              ].map((item) => (
                <button
                  key={item.rating}
                  onClick={() => setQuizEvaluationRating(item.rating)}
                  className={`p-3 rounded-2xl border transition-all flex flex-col items-center gap-1 shrink-0 ${
                    quizEvaluationRating === item.rating
                      ? 'bg-blue-100 border-[#2532f5] scale-110 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span className="text-2xl sm:text-3xl">{item.emoji}</span>
                  <span className="text-[10px] font-black text-slate-700">{item.rating}</span>
                </button>
              ))}
            </div>

            {/* Optional Comment */}
            <div>
              <input
                type="text"
                value={quizEvaluationComment}
                onChange={(e) => setQuizEvaluationComment(e.target.value)}
                placeholder="Deixe um comentário opcional..."
                className="w-full px-4 py-2.5 text-xs rounded-xl border border-slate-300 outline-none focus:border-[#2532f5] bg-white text-slate-900"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              disabled={quizEvaluationRating === null}
              onClick={handleEvaluateAndUnlock}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#2532f5] hover:bg-[#1a27e0] disabled:opacity-40 text-white font-extrabold rounded-2xl text-xs shadow-lg transition flex items-center justify-center gap-2 mx-auto"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Enviar Avaliação e Liberar Meu Desconto 🔓</span>
            </button>
          </div>
        </div>
      ) : (
        /* Quiz Finished & Unlocked Reward Screen */
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-4 border-amber-400 space-y-6 text-center animate-fadeIn">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto text-amber-600 shadow-inner">
            <Trophy className="w-10 h-10 text-amber-500 animate-bounce" />
          </div>

          <div>
            <span className="text-xs font-black uppercase text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
              Desconto Liberado com Sucesso! 🎁
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
              Parabéns, Tutor Nota 10! 🎉
            </h3>
            <p className="text-xs text-slate-600 font-bold mt-1">
              Você acertou {correctAnswersCount} de {activeQuestions.length} perguntas!
            </p>
            <p className="text-sm font-semibold text-[#2532f5] mt-0.5">
              {getTutorTitle(correctAnswersCount, activeQuestions.length)}
            </p>
          </div>

          {/* MOMENTO PREMIER PHOTO UPLOAD SECTION (+5% EXTRA) */}
          <div className="bg-gradient-to-r from-blue-900 via-[#2532f5] to-blue-950 text-white p-6 rounded-3xl shadow-lg text-left space-y-4 border-2 border-blue-300 relative overflow-hidden">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Camera className="w-6 h-6 text-amber-300 animate-pulse" />
                <div>
                  <h4 className="font-extrabold text-base text-white flex items-center gap-2">
                    Momento PremieR 📸
                  </h4>
                  <p className="text-xs text-blue-100">
                    Envie uma foto com o seu pet e ganhe <strong className="text-amber-300 font-extrabold">+5% de Desconto EXTRA!</strong>
                  </p>
                </div>
              </div>

              <span className="bg-amber-400 text-slate-950 font-black text-[10px] px-2.5 py-1 rounded-full uppercase shrink-0">
                Bônus +5%
              </span>
            </div>

            {/* Photo Preview / Upload Area */}
            {!petPhotoUrl ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="bg-white/10 hover:bg-white/15 border-2 border-dashed border-blue-200/60 rounded-2xl p-6 text-center cursor-pointer transition flex flex-col items-center justify-center gap-2 group"
              >
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-amber-300 group-hover:scale-110 transition">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="text-xs font-bold text-white">
                  Clique para carregar uma foto com o seu pet
                </p>
                <p className="text-[10px] text-blue-200">
                  Formatos suportados: JPG, PNG ou WEBP
                </p>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </div>
            ) : (
              <div className="bg-white/10 p-4 rounded-2xl border border-white/20 flex flex-col sm:flex-row items-center gap-4 animate-fadeIn">
                <div className="relative w-28 h-28 shrink-0 rounded-2xl overflow-hidden border-2 border-amber-300 shadow-md">
                  <img
                    src={petPhotoUrl}
                    alt="Momento PremieR"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1 right-1 bg-amber-400 text-slate-950 text-[9px] font-black px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                    <Heart className="w-3 h-3 fill-slate-950" /> PremieR
                  </span>
                </div>

                <div className="flex-1 space-y-2 text-center sm:text-left">
                  <div className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full shadow-2xs">
                    <Sparkles className="w-4 h-4 fill-slate-950" />
                    Momento PremieR Registrado! (+5% Liberado)
                  </div>
                  <p className="text-xs text-blue-100">
                    Sua foto ficou linda! Seu desconto total agora é de <strong className="text-amber-300 text-sm font-black">10% OFF</strong>!
                  </p>
                  <button
                    onClick={() => setPetPhotoUrl(null)}
                    className="text-[11px] text-rose-300 hover:text-rose-100 font-bold flex items-center gap-1 mx-auto sm:mx-0 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Trocar Foto
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* BONIFICATION CARD */}
          <div className="bg-gradient-to-r from-blue-600 via-[#2532f5] to-blue-800 text-white p-6 rounded-3xl shadow-lg space-y-3 border-2 border-amber-300 text-left">
            <div className="flex items-center gap-2">
              <Gift className="w-6 h-6 text-amber-300 animate-pulse" />
              <h4 className="font-extrabold text-base text-white">
                Recompensa Total Conquistada! ({finalDiscount}% OFF)
              </h4>
            </div>

            <p className="text-xs text-blue-100 leading-relaxed font-medium">
              {petPhotoUrl
                ? 'Você atendeu aos critérios do Quiz (5%) e enviou sua foto no Momento PremieR (+5%), garantindo 10% de desconto!'
                : 'Você atingiu o mínimo de acertos no Quiz e ganhou 5% de desconto! Envie uma foto no Momento PremieR acima para desbloquear 10% OFF.'}
            </p>

            <div className="bg-white text-slate-900 p-3.5 rounded-2xl shadow-md flex items-center justify-between gap-2 border border-blue-200">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase block">
                  Token Único do Cupom ({finalDiscount}% OFF)
                </span>
                <span className="font-mono font-black text-xl text-[#2532f5] tracking-wider">
                  {displayCouponCode}
                </span>
              </div>

              <button
                onClick={handleCopyBonusCoupon}
                className="px-4 py-2.5 bg-[#2532f5] hover:bg-[#1a27e0] text-white font-bold rounded-xl text-xs transition flex items-center gap-1.5 shadow-xs"
              >
                {hasCopiedBonusCoupon ? (
                  <>
                    <Check className="w-4 h-4 text-amber-300" />
                    <span>Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-amber-300" />
                    <span>Copiar Cupom</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={handleRestartQuiz}
              className="w-full sm:w-auto px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-2xl text-xs transition flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refazer Quiz
            </button>

            <button
              onClick={onNavigateToChat}
              className="w-full sm:w-auto px-6 py-3 bg-[#2532f5] hover:bg-[#1a27e0] text-white font-bold rounded-2xl text-xs shadow-md transition flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              Tirar Dúvidas com Dra. Patrícia no Chat
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
