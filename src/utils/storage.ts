import { collection, doc, getDoc, setDoc, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { ProductSubfamily, QuizQuestion, ChatCustomization, QuizCustomization, SurveyConfig, QuizBonusConfig, QuizParticipation, QuizTheme } from '../types';
import { PREMIER_SUBFAMILIES } from '../data/premierProducts';
import { PET_QUIZ_QUESTIONS } from '../data/quizQuestions';
import { DEFAULT_PATRICIA_AVATAR, DEFAULT_QUIZ_BANNER } from './defaultImages';

// Helper to interact with Firestore
const SUBFAMILIES_REF = doc(db, 'config', 'subfamilies');
const CHAT_CUSTOM_REF = doc(db, 'config', 'chatCustomization');
const QUIZ_CUSTOM_REF = doc(db, 'config', 'quizCustomization');
const SURVEY_CONFIG_REF = doc(db, 'config', 'surveyConfig');
const QUIZ_BONUS_REF = doc(db, 'config', 'quizBonusConfig');
const QUIZ_THEMES_REF = doc(db, 'config', 'quizThemes');

const SUBFAMILIES_KEY = 'premier_subfamilies_v1';
const QUIZ_QUESTIONS_KEY = 'premier_quiz_questions_v1';
const ADMIN_PIN_KEY = 'premier_admin_pin_v1';
const CHAT_CUSTOM_KEY = 'premier_chat_custom_v1';
const QUIZ_CUSTOM_KEY = 'premier_quiz_custom_v1';
const SURVEY_CONFIG_KEY = 'premier_survey_config_v1';
const QUIZ_BONUS_CONFIG_KEY = 'premier_quiz_bonus_config_v1';

// DEFAULT CONSTANTS
export const DEFAULT_CHAT_CUSTOMIZATION: ChatCustomization = {
  title: 'Conexão PremieR',
  subtitle: 'Fale com a Dra. Patrícia Alves, sua guia médica-veterinária especialista em nutrição',
  agentName: 'Dra. Patrícia Alves',
  avatarUrl: '/src/assets/images/dra_patricia_avatar_1786539257763.jpg',
  welcomeMessage: 'Olá! Eu sou a Patrícia, médica-veterinária e a voz da Conexão PremieR. Como posso te ajudar a cuidar ainda melhor da saúde e alimentação do seu pet hoje? 🐶🐱',
};

export const DEFAULT_QUIZ_CUSTOMIZATION: QuizCustomization = {
  title: 'Quiz Desafio Conexão PremieR',
  subtitle: 'Aprenda sobre nutrição de cães e gatos, teste seus conhecimentos e conquiste cupons de desconto exclusivos!',
  bannerUrl: DEFAULT_QUIZ_BANNER,
};

export const DEFAULT_SURVEY_CONFIG: SurveyConfig = {
  enabled: true,
  discountPercent: 10,
  couponCode: 'CONEXAOPREMIER10',
  thankYouMessage: 'Muito obrigado por avaliar nosso atendimento com a Dra. Patrícia! Use o cupom abaixo e ganhe desconto especial na sua próxima compra:',
};

export const DEFAULT_QUIZ_BONUS_CONFIG: QuizBonusConfig = {
  minScore: 3,
  discountPercent: 5,
  couponCode: 'PREMIER5',
  rewardMessage: 'Parabéns! Você atingiu o número mínimo de acertos e conquistou seu cupom de desconto!',
};

export const DEFAULT_QUIZ_THEMES: QuizTheme[] = [
  { id: 'todos', name: 'Todos os Temas', description: 'Perguntas combinadas de todos os temas do Quiz PremieRpet', icon: '🌟' },
  { id: 'nutricao', name: 'Nutrição & Alimentação', description: 'Ingredientes nobres, digestibilidade e nutrição diária', icon: '🥩' },
  { id: 'linha_premier', name: 'Linhas PremieRpet®', description: 'Seleção Natural, Ambientes Internos, Raças Específicas', icon: '🏆' },
  { id: 'saude', name: 'Saúde & Cuidados Clínicos', description: 'Controle de obesidade, saúde renal e prevenções', icon: '🩺' },
  { id: 'cuidados', name: 'Manejo & Transição Alimentar', description: 'Troca de ração, petiscos e hidratação', icon: '🐾' },
];

// Function to clear old localStorage data
export function clearLegacyLocalStorage() {
  const keys = [
    'premier_subfamilies_v1',
    'premier_quiz_questions_v1',
    'premier_admin_pin_v1',
    'premier_chat_custom_v1',
    'premier_quiz_custom_v1',
    'premier_survey_config_v1',
    'premier_quiz_bonus_config_v1',
    'premier_quiz_themes_v1',
    'premier_quiz_participations_v1'
  ];
  keys.forEach(key => localStorage.removeItem(key));
}

// Seed Function
export async function seedFirestore() {
    const refs = [SUBFAMILIES_REF, CHAT_CUSTOM_REF, QUIZ_CUSTOM_REF, SURVEY_CONFIG_REF, QUIZ_BONUS_REF, QUIZ_THEMES_REF];
    const data = [
        { subfamilies: PREMIER_SUBFAMILIES },
        DEFAULT_CHAT_CUSTOMIZATION,
        DEFAULT_QUIZ_CUSTOMIZATION,
        DEFAULT_SURVEY_CONFIG,
        DEFAULT_QUIZ_BONUS_CONFIG,
        { themes: DEFAULT_QUIZ_THEMES }
    ];

    for (let i = 0; i < refs.length; i++) {
        const docSnap = await getDoc(refs[i]);
        if (!docSnap.exists()) {
            await setDoc(refs[i], data[i]);
        }
    }
}

export async function getStoredSubfamilies(): Promise<ProductSubfamily[]> {
  try {
    const docSnap = await getDoc(SUBFAMILIES_REF);
    if (docSnap.exists()) {
      return docSnap.data().subfamilies as ProductSubfamily[];
    }
  } catch (e) {
    console.error('Error reading subfamilies from Firestore:', e);
  }
  return PREMIER_SUBFAMILIES;
}

export async function saveStoredSubfamilies(subfamilies: ProductSubfamily[]): Promise<void> {
  try {
    await setDoc(SUBFAMILIES_REF, { subfamilies });
  } catch (e) {
    console.error('Error saving subfamilies to Firestore:', e);
  }
}


export function resetSubfamiliesToDefault(): ProductSubfamily[] {
  return PREMIER_SUBFAMILIES;
}

export function getStoredQuizQuestions(): QuizQuestion[] {
  try {
    const data = localStorage.getItem(QUIZ_QUESTIONS_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error reading quiz questions from localStorage:', e);
  }
  return PET_QUIZ_QUESTIONS;
}

export function saveStoredQuizQuestions(questions: QuizQuestion[]): void {
  try {
    localStorage.setItem(QUIZ_QUESTIONS_KEY, JSON.stringify(questions));
  } catch (e) {
    console.error('Error saving quiz questions to localStorage:', e);
  }
}

export function resetQuizQuestionsToDefault(): QuizQuestion[] {
  try {
    localStorage.removeItem(QUIZ_QUESTIONS_KEY);
  } catch (e) {
    console.error('Error resetting quiz questions:', e);
  }
  return PET_QUIZ_QUESTIONS;
}

export function getAdminPin(): string {
  try {
    return localStorage.getItem(ADMIN_PIN_KEY) || '1234';
  } catch (e) {
    return '1234';
  }
}

export function saveAdminPin(pin: string): void {
  try {
    localStorage.setItem(ADMIN_PIN_KEY, pin);
  } catch (e) {
    console.error('Error saving admin pin:', e);
  }
}

export function getChatCustomization(): ChatCustomization {
  try {
    const data = localStorage.getItem(CHAT_CUSTOM_KEY);
    if (data) {
      return { ...DEFAULT_CHAT_CUSTOMIZATION, ...JSON.parse(data) };
    }
  } catch (e) {
    console.error('Error reading chat customization:', e);
  }
  return DEFAULT_CHAT_CUSTOMIZATION;
}

export function saveChatCustomization(config: ChatCustomization): void {
  try {
    localStorage.setItem(CHAT_CUSTOM_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Error saving chat customization:', e);
  }
}

export function getQuizCustomization(): QuizCustomization {
  try {
    const data = localStorage.getItem(QUIZ_CUSTOM_KEY);
    if (data) {
      return { ...DEFAULT_QUIZ_CUSTOMIZATION, ...JSON.parse(data) };
    }
  } catch (e) {
    console.error('Error reading quiz customization:', e);
  }
  return DEFAULT_QUIZ_CUSTOMIZATION;
}

export function saveQuizCustomization(config: QuizCustomization): void {
  try {
    localStorage.setItem(QUIZ_CUSTOM_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Error saving quiz customization:', e);
  }
}

export function getSurveyConfig(): SurveyConfig {
  try {
    const data = localStorage.getItem(SURVEY_CONFIG_KEY);
    if (data) {
      return { ...DEFAULT_SURVEY_CONFIG, ...JSON.parse(data) };
    }
  } catch (e) {
    console.error('Error reading survey config:', e);
  }
  return DEFAULT_SURVEY_CONFIG;
}

export function saveSurveyConfig(config: SurveyConfig): void {
  try {
    localStorage.setItem(SURVEY_CONFIG_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Error saving survey config:', e);
  }
}

export function getQuizBonusConfig(): QuizBonusConfig {
  try {
    const data = localStorage.getItem(QUIZ_BONUS_CONFIG_KEY);
    if (data) {
      return { ...DEFAULT_QUIZ_BONUS_CONFIG, ...JSON.parse(data) };
    }
  } catch (e) {
    console.error('Error reading quiz bonus config:', e);
  }
  return DEFAULT_QUIZ_BONUS_CONFIG;
}

export function saveQuizBonusConfig(config: QuizBonusConfig): void {
  try {
    localStorage.setItem(QUIZ_BONUS_CONFIG_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Error saving quiz bonus config:', e);
  }
}

// PARTICIPATIONS & TOKEN MANAGEMENT
const PARTICIPATIONS_KEY = 'premier_quiz_participations_v1';

export function getStoredParticipations(): QuizParticipation[] {
  try {
    const data = localStorage.getItem(PARTICIPATIONS_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error reading participations from localStorage:', e);
  }
  return [];
}

export function generateParticipationToken(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let token = 'PMTR-';
  for (let i = 0; i < 6; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

export function saveQuizParticipation(
  participationData: Omit<QuizParticipation, 'id' | 'createdAt' | 'status'>
): QuizParticipation {
  try {
    const existing = getStoredParticipations();
    const newParticipation: QuizParticipation = {
      ...participationData,
      id: generateParticipationToken(),
      createdAt: new Date().toISOString(),
      status: 'active',
    };
    const updated = [newParticipation, ...existing];
    localStorage.setItem(PARTICIPATIONS_KEY, JSON.stringify(updated));
    return newParticipation;
  } catch (e) {
    console.error('Error saving quiz participation:', e);
    return {
      ...participationData,
      id: 'PMTR-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      createdAt: new Date().toISOString(),
      status: 'active',
    };
  }
}

export function updateParticipationPhoto(token: string, petPhotoUrl: string): QuizParticipation | null {
  try {
    const existing = getStoredParticipations();
    const index = existing.findIndex((p) => p.id === token);
    if (index >= 0) {
      existing[index].petPhotoUrl = petPhotoUrl;
      existing[index].hasMomentoPremierPhoto = true;
      existing[index].discountPercent = 10;
      localStorage.setItem(PARTICIPATIONS_KEY, JSON.stringify(existing));
      return existing[index];
    }
  } catch (e) {
    console.error('Error updating participation photo:', e);
  }
  return null;
}

export function updateParticipationStatus(id: string, status: 'active' | 'validated'): boolean {
  try {
    const existing = getStoredParticipations();
    const index = existing.findIndex((p) => p.id === id);
    if (index >= 0) {
      existing[index].status = status;
      if (status === 'validated') {
        existing[index].validatedAt = new Date().toISOString();
      } else {
        delete existing[index].validatedAt;
      }
      localStorage.setItem(PARTICIPATIONS_KEY, JSON.stringify(existing));
      return true;
    }
  } catch (e) {
    console.error('Error updating participation status:', e);
  }
  return false;
}

export function deleteParticipation(id: string): void {
  try {
    const existing = getStoredParticipations();
    const filtered = existing.filter((p) => p.id !== id);
    localStorage.setItem(PARTICIPATIONS_KEY, JSON.stringify(filtered));
  } catch (e) {
    console.error('Error deleting participation:', e);
  }
}

// CONSOLIDADOS DE TEMAS DO QUIZ

const QUIZ_THEMES_KEY = 'premier_quiz_themes_v1';

export function getStoredQuizThemes(): QuizTheme[] {
  try {
    const data = localStorage.getItem(QUIZ_THEMES_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error reading quiz themes from localStorage:', e);
  }
  return DEFAULT_QUIZ_THEMES;
}

export function saveStoredQuizThemes(themes: QuizTheme[]): void {
  try {
    localStorage.setItem(QUIZ_THEMES_KEY, JSON.stringify(themes));
  } catch (e) {
    console.error('Error saving quiz themes to localStorage:', e);
  }
}

