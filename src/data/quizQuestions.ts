import { QuizQuestion } from '../types';

export const PET_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Qual linha PremieR® é indicada para cães que vivem dentro de casa?',
    category: 'linhas',
    points: 10,
    options: [
      { id: '1a', text: 'PremieR® Ambientes Internos', isCorrect: true, explanation: 'A linha Ambientes Internos ajuda no controle de odor das fezes e no peso saudável de cães caseiros.' },
      { id: '1b', text: 'PremieR® Cookie', isCorrect: false, explanation: '' },
      { id: '1c', text: 'PremieR® Gourmet', isCorrect: false, explanation: '' },
      { id: '1d', text: 'PremieR® Nutrição Clínica', isCorrect: false, explanation: '' }
    ]
  },
  {
    id: 2,
    question: 'O que diferencia a linha PremieR® Seleção Natural?',
    category: 'linhas',
    points: 10,
    options: [
      { id: '2a', text: 'Receitas naturais com frango Korin', isCorrect: true, explanation: 'A Seleção Natural traz receitas naturais com frango Korin, para tutores que buscam um estilo de vida saudável.' },
      { id: '2b', text: 'É exclusiva para filhotes', isCorrect: false, explanation: '' },
      { id: '2c', text: 'É um petisco em formato de biscoito', isCorrect: false, explanation: '' },
      { id: '2d', text: 'É indicada apenas por veterinários', isCorrect: false, explanation: '' }
    ]
  },
  {
    id: 3,
    question: 'Qual linha apoia o manejo do peso em pets com excesso de peso?',
    category: 'obesidade',
    points: 1,
    options: [
      { id: '3a', text: 'PremieR® Nutrição Clínica Obesidade', isCorrect: true, explanation: 'A Nutrição Clínica é coadjuvante no manejo da obesidade, sempre com acompanhamento veterinário.' },
      { id: '3b', text: 'PremieR® Cookie', isCorrect: false, explanation: '' },
      { id: '3c', text: 'PremieR® Gourmet', isCorrect: false, explanation: '' },
      { id: '3d', text: 'PremieR® Orgânico', isCorrect: false, explanation: '' }
    ]
  },
  {
    id: 4,
    question: 'Qual a diferença das linhas de alimento úmido PremieR Gourmet e PremieR Fórmula?',
    category: 'linhas',
    points: 1,
    options: [
      { id: '4a', text: 'PremieR Gourmet são alimentos para agrado e recompensa. PremieR Fórmula é um alimento completo e balanceado.', isCorrect: true, explanation: '' },
      { id: '4b', text: 'PremieR Gourmet são alimentos mais saborosos que PremieR Fórmula', isCorrect: false, explanation: '' },
      { id: '4c', text: 'PremieR Fórmula são alimentos para tratamento de doenças', isCorrect: false, explanation: '' },
      { id: '4d', text: 'Nenhuma. São iguais e possuem apenas sabores diferentes.', isCorrect: false, explanation: '' }
    ]
  },
  {
    id: 5,
    question: 'Quero fornecer um alimento úmido 100% livre de conservantes. Qual alimento eu dou?',
    category: 'linhas',
    points: 1,
    options: [
      { id: '5a', text: 'Somente os úmidos da linha Gourmet são livres de conservantes.', isCorrect: false, explanation: '' },
      { id: '5b', text: 'Somente os úmidos da linha Fórmula são livres de conservantes', isCorrect: false, explanation: '' },
      { id: '5c', text: 'Somente os úmidos da linha Nattu são livres de conservantes', isCorrect: false, explanation: '' },
      { id: '5d', text: 'Todos os alimentos úmidos são 100% livres de conservantes', isCorrect: true, explanation: 'O processo de fabricação dos alimentos úmidos envolve uma etapa de esterilização. Por isso conservantes não são necessários para fazer a conservação do produto fechado. Por isso, após aberto, ele deve ser mantido refrigerado por até 3 dias.' }
    ]
  },
  {
    id: 6,
    question: 'Qual alimento da linha PremieR não leva adição de antioxidantes artificiais?',
    category: 'linhas',
    points: 1,
    options: [
      { id: '6a', text: 'Nenhum alimento da PremieR possui antioxidantes artificiais', isCorrect: true, explanation: '' },
      { id: '6b', text: 'Somente os alimentos da linha Nattu', isCorrect: false, explanation: '' },
      { id: '6c', text: 'Somente os alimentos da linha ambientes internos', isCorrect: false, explanation: '' },
      { id: '6d', text: 'Todos os alimentos levam inclusão de antioxidantes artificiais', isCorrect: false, explanation: '' }
    ]
  },
  {
    id: 7,
    question: 'Qual alimento da PremieR é completamente livre de corantes.',
    category: 'linhas',
    points: 1,
    options: [
      { id: '7a', text: 'Nenhum. Todos os alimentos possuem corantes.', isCorrect: false, explanation: '' },
      { id: '7b', text: 'Somente os alimentos da linha Nattu', isCorrect: false, explanation: '' },
      { id: '7c', text: 'Somente os alimentos da linha Orgânico', isCorrect: false, explanation: '' },
      { id: '7d', text: 'Todos. A PremieR não utiliza corantes nas suas formulações.', isCorrect: true, explanation: '' }
    ]
  }
];
