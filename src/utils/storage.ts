import { ProductSubfamily, QuizQuestion, ChatCustomization, QuizCustomization, SurveyConfig, QuizBonusConfig } from '../types';
import { PREMIER_SUBFAMILIES } from '../data/premierProducts';
import { PET_QUIZ_QUESTIONS } from '../data/quizQuestions';
import { DEFAULT_PATRICIA_AVATAR, DEFAULT_QUIZ_BANNER } from './defaultImages';

const SUBFAMILIES_KEY = 'premier_subfamilies_v1';
const QUIZ_QUESTIONS_KEY = 'premier_quiz_questions_v1';
const ADMIN_PIN_KEY = 'premier_admin_pin_v1';
const CHAT_CUSTOM_KEY = 'premier_chat_custom_v1';
const QUIZ_CUSTOM_KEY = 'premier_quiz_custom_v1';
const SURVEY_CONFIG_KEY = 'premier_survey_config_v1';
const QUIZ_BONUS_CONFIG_KEY = 'premier_quiz_bonus_config_v1';

export const DEFAULT_CHAT_CUSTOMIZATION: ChatCustomization = {
  title: 'Infos PremieRpet',
  subtitle: 'Fale com a Dra. Patrícia Alves, sua guia médica-veterinária especialista em nutrição',
  agentName: 'Dra. Patrícia Alves (Paty)',
  avatarUrl: DEFAULT_PATRICIA_AVATAR,
  welcomeMessage: 'Olá! Eu sou a Patrícia, médica-veterinária e a voz da Infos PremieRpet. Como posso te ajudar a cuidar ainda melhor da saúde e alimentação do seu pet hoje? 🐶🐱',
};

export const DEFAULT_QUIZ_CUSTOMIZATION: QuizCustomization = {
  title: 'Quiz Desafio Infos PremieRpet',
  subtitle: 'Aprenda sobre nutrição de cães e gatos, teste seus conhecimentos e conquiste cupons de desconto exclusivos!',
  bannerUrl: DEFAULT_QUIZ_BANNER,
};

export const DEFAULT_SURVEY_CONFIG: SurveyConfig = {
  enabled: true,
  discountPercent: 10,
  couponCode: 'INFOSPREMIER10',
  thankYouMessage: 'Muito obrigado por avaliar nosso atendimento com a Dra. Patrícia! Use o cupom abaixo e ganhe desconto especial na sua próxima compra:',
};

export const DEFAULT_QUIZ_BONUS_CONFIG: QuizBonusConfig = {
  minScore: 3,
  discountPercent: 5,
  couponCode: 'PREMIER5',
  rewardMessage: 'Parabéns! Você atingiu o número mínimo de acertos e conquistou seu cupom de desconto!',
};

export function getStoredSubfamilies(): ProductSubfamily[] {
  try {
    const data = localStorage.getItem(SUBFAMILIES_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Error reading subfamilies from localStorage:', e);
  }
  return PREMIER_SUBFAMILIES;
}

export function saveStoredSubfamilies(subfamilies: ProductSubfamily[]): void {
  try {
    localStorage.setItem(SUBFAMILIES_KEY, JSON.stringify(subfamilies));
  } catch (e) {
    console.error('Error saving subfamilies to localStorage:', e);
  }
}

export function resetSubfamiliesToDefault(): ProductSubfamily[] {
  try {
    localStorage.removeItem(SUBFAMILIES_KEY);
  } catch (e) {
    console.error('Error resetting subfamilies:', e);
  }
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
