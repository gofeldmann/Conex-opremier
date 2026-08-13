export type PetType = 'dog' | 'cat' | 'both';

export type ProductCategory = 
  | 'Super Premium'
  | 'Alimentos Específicos'
  | 'Nutrição Clínica'
  | 'Alimento Completo Úmidos'
  | 'Natural & Orgânico';

export interface ProductSubfamily {
  id: string;
  name: string;
  subName?: string;
  category: ProductCategory;
  categoryBadgeColor: string; // e.g. brown, navy, green
  petType: PetType;
  description: string;
  benefits: string[];
  image: string;
  highlights: string[];
  recommendedFor: string;
  sampleQuestions: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
  suggestedProducts?: string[]; // Subfamily IDs
  suggestedQuestions?: string[];
}

export interface QuizTheme {
  id: string;
  name: string;
  description?: string;
  icon?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  category: string; // matches QuizTheme id
  points: number;
}

export interface QuizResult {
  score: number;
  totalPoints: number;
  correctAnswers: number;
  totalQuestions: number;
  level: string;
  badge: string;
}

export interface PetProfile {
  name: string;
  species: 'dog' | 'cat';
  breed: string;
  ageYears: number;
  weightKg: number;
  eccScore?: number; // Escore de Condição Corporal (1 to 9)
  targetWeightKg?: number;
  activityLevel: 'low' | 'moderate' | 'high';
  specialNeeds?: string;
}

export interface ChatCustomization {
  title: string;
  subtitle: string;
  agentName: string;
  avatarUrl: string;
  welcomeMessage: string;
}

export interface QuizCustomization {
  title: string;
  subtitle: string;
  bannerUrl: string;
}

export interface SurveyConfig {
  enabled: boolean;
  discountPercent: number;
  couponCode: string;
  thankYouMessage: string;
}

export interface QuizBonusConfig {
  minScore: number;
  discountPercent: number;
  couponCode: string;
  rewardMessage: string;
}

export interface QuizParticipation {
  id: string; // Token único gerado (ex: PMTR-8F92AK)
  createdAt: string; // Data ISO ou formato legível
  correctAnswers: number;
  totalQuestions: number;
  discountPercent: number; // Ex: 5 ou 10
  hasMomentoPremierPhoto: boolean;
  petPhotoUrl?: string;
  quizEvaluationRating?: number;
  quizEvaluationComment?: string;
  status: 'active' | 'validated';
  validatedAt?: string;
}
