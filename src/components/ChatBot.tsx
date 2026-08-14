import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, PetProfile, ProductSubfamily, ChatCustomization, SurveyConfig } from '../types';
import { DEFAULT_CHAT_CUSTOMIZATION, DEFAULT_SURVEY_CONFIG } from '../utils/storage';
import { DEFAULT_PATRICIA_AVATAR, FALLBACK_PATRICIA_AVATAR } from '../utils/defaultImages';
import {
  Send,
  Bot,
  User,
  Sparkles,
  Volume2,
  Mic,
  MicOff,
  RefreshCw,
  Dog,
  Cat,
  ShieldCheck,
  Star,
  Smile,
  Copy,
  Check,
  Gift,
  X,
  ArrowRight
} from 'lucide-react';

interface ChatBotProps {
  petProfile?: PetProfile;
  customSubfamilies?: ProductSubfamily[];
  chatCustomization?: ChatCustomization;
  surveyConfig?: SurveyConfig;
  onOpenPetModal?: () => void;
  onSelectProductContext?: (productName: string) => void;
  onNavigateToQuiz?: () => void;
}

export const ChatBot: React.FC<ChatBotProps> = ({
  petProfile,
  customSubfamilies,
  chatCustomization = DEFAULT_CHAT_CUSTOMIZATION,
  surveyConfig = DEFAULT_SURVEY_CONFIG,
  onOpenPetModal,
  onSelectProductContext,
  onNavigateToQuiz,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: chatCustomization.welcomeMessage || `Olá, tutor(a)! 👋 Sou a Patrícia, médica-veterinária e a voz oficial da Infos PremieRpet! Estou aqui para acolher você e tirar qualquer dúvida sobre a nutrição e saúde do seu pet.`,
      timestamp: new Date(),
      suggestedQuestions: [
        'Qual ração PremieRpet é ideal para o meu pet?',
        'Qual a diferença entre Nattu e Seleção Natural?',
        'Como funciona a ração para Obesidade?',
        'Como fazer a transição alimentar correta?'
      ]
    }
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeakingId, setIsSpeakingId] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (messages.length > 1) {
      scrollToBottom();
    } else if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [messages, isLoading]);

  // Speech Recognition setup if supported
  const startVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Seu navegador não suporta reconhecimento de voz direto. Digite sua mensagem no campo de texto.');
      return;
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'pt-BR';
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (transcript) {
          setInput(transcript);
        }
      };

      recognition.start();
    } catch (e) {
      console.error(e);
      setIsListening(false);
    }
  };

  // Text to Speech output
  const toggleSpeech = (msgId: string, text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeakingId === msgId) {
      window.speechSynthesis.cancel();
      setIsSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'pt-BR';
    utterance.rate = 1.0;

    utterance.onend = () => setIsSpeakingId(null);
    utterance.onerror = () => setIsSpeakingId(null);

    setIsSpeakingId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (customText?: string) => {
    const textToSend = customText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            sender: m.sender,
            text: m.text,
          })),
          petProfile,
          customSubfamilies,
        }),
      });

      let replyText = '';
      if (res.ok) {
        const data = await res.json();
        replyText = data.reply || 'Recebi sua mensagem! Como mais posso ajudar na alimentação e bem-estar do seu pet?';
      } else {
        const errData = await res.json().catch(() => null);
        replyText = errData?.reply || errData?.error || `Houve uma falha na resposta do servidor (Status ${res.status}: ${res.statusText || 'Erro'}). Verifique se a variável GEMINI_API_KEY está configurada no painel da Vercel e se foi feito o Redeploy. 🐾`;
      }

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: replyText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: `Tive um probleminha de conexão com a API: ${err?.message || 'Falha de rede'}. Por favor, confirme se o projeto foi atualizado no GitHub e se foi feito o Redeploy na Vercel! 🐶🐱`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'assistant',
        text: `Conversa reiniciada com sucesso! Como a Dra. Patrícia pode ajudar o seu pet agora? ✨`,
        timestamp: new Date(),
        suggestedQuestions: [
          'Qual a quantidade diária recomendada?',
          'Tire dúvidas sobre a linha Nutrição Clínica',
          'Quais biscoitos PremieR Cookie posso oferecer?'
        ]
      }
    ]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] md:h-[680px] max-w-3xl mx-auto bg-[#f8fafc] rounded-[32px] shadow-lg border border-slate-200/80 overflow-hidden relative">
      {/* Top Pet Context Bar */}
      <div className="bg-white px-3 sm:px-5 py-2.5 sm:py-3.5 flex items-center justify-between gap-2 border-b border-slate-200/80 shrink-0 w-full overflow-hidden">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div className="relative shrink-0">
            <img
              src={chatCustomization.avatarUrl || DEFAULT_PATRICIA_AVATAR}
              alt={chatCustomization.agentName}
              referrerPolicy="no-referrer"
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-[#2532f5] shadow-2xs shrink-0"
              onError={(e) => {
                (e.target as HTMLImageElement).src = FALLBACK_PATRICIA_AVATAR;
              }}
            />
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-sky-400 border-2 border-white rounded-full"></span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap sm:flex-nowrap min-w-0">
              <h2 className="font-extrabold text-xs sm:text-sm text-slate-900 truncate leading-snug">
                {chatCustomization.agentName}
              </h2>
              <span className="bg-[#2532f5]/10 text-[#2532f5] text-[9px] sm:text-[10px] font-extrabold px-1.5 sm:px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0">
                Guia Veterinária
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-slate-500 font-medium truncate hidden xs:block sm:block">
              Especialista em Nutrição e Saúde Animal
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {onNavigateToQuiz && (
            <button
              onClick={onNavigateToQuiz}
              className="text-xs text-white bg-[#2532f5] hover:bg-[#1a27e0] font-extrabold px-2.5 sm:px-3.5 py-1.5 rounded-full transition flex items-center gap-1 sm:gap-1.5 shadow-sm hover:shadow shrink-0"
              title="Finalizar atendimento e ir para o Quiz para ganhar desconto"
            >
              <Gift className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span className="hidden sm:inline">Finalizar & Ir para o Quiz</span>
              <span className="sm:hidden text-[11px] font-black">Quiz</span>
              <ArrowRight className="w-3 h-3 shrink-0" />
            </button>
          )}

          <button
            onClick={handleReset}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition shrink-0"
            title="Limpar conversa"
          >
            <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-[#f2f5fd]">
        {/* Welcome Header (Screenshot 1 Style) if only 1 message */}
        {messages.length <= 1 && (
          <div className="text-center py-6 sm:py-8 px-4 max-w-lg mx-auto animate-fadeIn">
            {/* Centered Large Circular Avatar */}
            <div className="relative inline-block mb-4">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-white shadow-md border-2 border-blue-100 mx-auto overflow-hidden">
                <img
                  src={chatCustomization.avatarUrl || DEFAULT_PATRICIA_AVATAR}
                  alt={chatCustomization.agentName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full bg-[#e8f0fe]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = FALLBACK_PATRICIA_AVATAR;
                  }}
                />
              </div>
            </div>

            {/* Centered Welcome Title */}
            <h2 className="text-2xl sm:text-3xl font-black text-[#2532f5] tracking-tight mb-2">
              Oi, tutor! Eu sou a Patrícia
            </h2>

            {/* Centered Description */}
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-md mx-auto mb-8">
            </p>

            {/* Quick Prompt Pills Stack */}
            <div className="space-y-2.5 max-w-md mx-auto">
              {[
                'Qual linha combina com meu gato adulto?',
                'Como funciona o acompanhamento do emagrecimento?',
                'Qual a quantidade diária recomendada para o meu pet?',
                'Qual a diferença entre Nattu e Seleção Natural?'
              ].map((questionText, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(questionText)}
                  className="w-full bg-white hover:bg-blue-50/50 hover:border-[#2532f5] text-slate-800 hover:text-[#2532f5] font-semibold text-xs sm:text-sm py-3.5 px-6 rounded-full border border-slate-200/90 shadow-2xs hover:shadow-xs transition text-center"
                >
                  {questionText}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Conversation Bubbles */}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} animate-fadeIn`}
          >
            <div className="flex items-start gap-2.5 max-w-[88%] sm:max-w-[80%]">
              {msg.sender === 'assistant' && (
                <img
                  src={chatCustomization.avatarUrl || DEFAULT_PATRICIA_AVATAR}
                  alt={chatCustomization.agentName}
                  referrerPolicy="no-referrer"
                  className="w-8 h-8 rounded-full object-cover border border-[#2532f5] shrink-0 shadow-2xs mt-1"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = FALLBACK_PATRICIA_AVATAR;
                  }}
                />
              )}

              <div
                className={`p-4 rounded-[22px] text-sm leading-relaxed shadow-2xs relative ${
                  msg.sender === 'user'
                    ? 'bg-[#2532f5] text-white rounded-br-xs font-medium'
                    : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs'
                }`}
              >
                <div className="whitespace-pre-line">{msg.text}</div>

                <div className="flex items-center justify-between gap-2 mt-2 pt-1 border-t border-black/5 text-[10px]">
                  <span className={`font-semibold ${msg.sender === 'user' ? 'text-blue-100' : 'text-slate-400'}`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>

                  {msg.sender === 'assistant' && (
                    <button
                      onClick={() => toggleSpeech(msg.id, msg.text)}
                      className="text-slate-400 hover:text-[#2532f5] transition"
                      title="Ouvir mensagem"
                    >
                      <Volume2 className={`w-3.5 h-3.5 ${isSpeakingId === msg.id ? 'text-[#2532f5] animate-bounce' : ''}`} />
                    </button>
                  )}
                </div>

                {msg.sender === 'assistant' && onNavigateToQuiz && (
                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
                    <button
                      onClick={onNavigateToQuiz}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-900 font-extrabold text-[11px] rounded-full shadow-2xs transition hover:scale-105"
                    >
                      <Gift className="w-3.5 h-3.5 text-amber-600" />
                      <span>Finalizar e ir para o Quiz 🏆</span>
                      <ArrowRight className="w-3 h-3 text-amber-600" />
                    </button>
                  </div>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-full bg-[#2532f5] text-white flex items-center justify-center shrink-0 shadow-2xs mt-1 font-bold text-xs">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2.5 text-slate-500 text-xs bg-white p-3.5 rounded-full max-w-xs border border-slate-200/80 shadow-2xs animate-pulse">
            <img
              src={chatCustomization.avatarUrl || DEFAULT_PATRICIA_AVATAR}
              alt="Dra. Patrícia"
              referrerPolicy="no-referrer"
              className="w-6 h-6 rounded-full object-cover border border-[#2532f5]"
              onError={(e) => {
                (e.target as HTMLImageElement).src = FALLBACK_PATRICIA_AVATAR;
              }}
            />
            <span>Dra. Patrícia está digitando...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Field Bar */}
      <div className="p-3 sm:p-4 bg-white border-t border-slate-200/80 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <button
            type="button"
            onClick={startVoiceInput}
            className={`p-3 rounded-full transition ${
              isListening
                ? 'bg-rose-500 text-white animate-bounce shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
            title="Falar por áudio"
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder=""
            className="flex-1 px-5 py-3 bg-slate-50 border border-slate-200 rounded-full focus:bg-white focus:border-[#2532f5] focus:ring-2 focus:ring-[#2532f5]/20 outline-none text-slate-800 text-sm"
          />

          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-3 bg-[#2532f5] hover:bg-[#1a27e0] disabled:opacity-40 text-white rounded-full shadow-md transition font-bold"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

