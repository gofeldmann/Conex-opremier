import { QuizQuestion } from '../types';

export const PET_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: 'Por que o uso de rações super premium como a PremieR® Seleção Natural (com frango Korin®) traz mais benefícios para o pet?',
    category: 'linha_premier',
    points: 150,
    options: [
      {
        id: '1a',
        text: 'Possui proteínas nobres, zero corantes e frango criado sem uso de antibióticos.',
        isCorrect: true,
        explanation: 'Exato! A linha Seleção Natural conta com a exclusiva proteína de frango Korin®, sem antibióticos promotores de crescimento, além de vegetais e conservantes naturais.'
      },
      {
        id: '1b',
        text: 'Porque deixa a ração colorida com corantes artificiais atrativos.',
        isCorrect: false,
        explanation: 'Incorreto! A PremieRpet não utiliza corantes ou aromatizantes artificiais. As cores naturais vêm dos próprios ingredientes!'
      },
      {
        id: '1c',
        text: 'Apenas porque a embalagem é verde.',
        isCorrect: false,
        explanation: 'A cor é apenas um detalhe! O verdadeiro diferencial é a formulação nutricional rigorosa e ingredientes certificados.'
      }
    ]
  },
  {
    id: 2,
    question: 'Qual ingrediente natural presente em rações como a PremieR® Ambientes Internos ajuda a reduzir significativamente o odor das fezes?',
    category: 'nutricao',
    points: 150,
    options: [
      {
        id: '2a',
        text: 'Extrato de Yucca e fibras especiais de alta digestibilidade.',
        isCorrect: true,
        explanation: 'Perfeito! O extrato de Yucca schidigera se liga ao gás sulfídrico do intestino do pet, diminuindo bastante o odor forte das fezes.'
      },
      {
        id: '2b',
        text: 'Açúcar e xarope de milho.',
        isCorrect: false,
        explanation: 'Cuidado! Açúcares não são indicados para pets e podem causar indigestão ou obesidade.'
      },
      {
        id: '2c',
        text: 'Sal em grande quantidade.',
        isCorrect: false,
        explanation: 'O sódio na PremieRpet é estritamente controlado para garantir a saúde renal e cardíaca.'
      }
    ]
  },
  {
    id: 3,
    question: 'Como a linha PremieR® Nutrição Clínica Obesidade Cães atua na perda de peso sem fazer o cão perder músculos?',
    category: 'saude',
    points: 200,
    options: [
      {
        id: '3a',
        text: 'Aumentando o teor de gordura para queimar calorias.',
        isCorrect: false,
        explanation: 'Não, alimentos para obesidade possuem teor reduzido de gorduras e calorias!'
      },
      {
        id: '3b',
        text: 'Elevando o teor de proteínas, associado à L-Carnitina e alto teor de fibras funcionais.',
        isCorrect: true,
        explanation: 'Excelente! A alta proteína preserva a massa magra (músculos), a L-Carnitina acelera a queima de gordura e as fibras trazem saciedade sem excesso de calorias.'
      },
      {
        id: '3c',
        text: 'Retirando toda a água do organismo do pet.',
        isCorrect: false,
        explanation: 'Jamais! A hidratação é fundamental para a saúde e perda de peso saudável.'
      }
    ]
  },
  {
    id: 4,
    question: 'Qual o papel fundamental da inclusão de Alimentos Úmidos (PremieR® Gourmet, Nattu e Formula) na dieta dos felinos?',
    category: 'nutricao',
    points: 150,
    options: [
      {
        id: '4a',
        text: 'Aumentar a ingestão hídrica, prevenindo problemas urinários e renais comuns em gatos.',
        isCorrect: true,
        explanation: 'Corretíssimo! Gatos por natureza bebem pouca água. Alimentos úmidos fornecem excelente hidratação extra de forma saborosa.'
      },
      {
        id: '4b',
        text: 'Substituir a água da tigela para que o gato não precise beber mais nada.',
        isCorrect: false,
        explanation: 'A água limpa e fresca na tigela ou fonte deve sempre estar disponível!'
      },
      {
        id: '4c',
        text: 'Apenas agradar o paladar no aniversário do pet.',
        isCorrect: false,
        explanation: 'Alimentos úmidos PremieR® são completos e podem ser oferecidos diariamente como parte da rotina saudável.'
      }
    ]
  },
  {
    id: 5,
    question: 'O que caracteriza a linha PremieR® Raças Específicas?',
    category: 'linha_premier',
    points: 150,
    options: [
      {
        id: '5a',
        text: 'Grão genérico igual para todas as raças de cães.',
        isCorrect: false,
        explanation: 'Não! Raças Específicas tem grãos customizados para a mordida e formato maxilar de cada raça.'
      },
      {
        id: '5b',
        text: 'Primeira linha mundial com formato de grão e nutrientes sob medida para as necessidades e tendências de saúde de cada raça.',
        isCorrect: true,
        explanation: 'Certíssimo! A PremieRpet foi pioneira no mundo ao criar rações específicas que atendem raças como Shih Tzu, Yorkshire, Pug, Buldogue, etc.'
      },
      {
        id: '5c',
        text: 'Ração feita apenas para cães de exposição.',
        isCorrect: false,
        explanation: 'Ela é destinada a todos os cães da raça, sejam de companhia ou competição!'
      }
    ]
  },
  {
    id: 6,
    question: 'Como deve ser feita a transição para uma nova ração PremieRpet?',
    category: 'cuidados',
    points: 200,
    options: [
      {
        id: '6a',
        text: 'Trocar 100% no mesmo dia sem misturar.',
        isCorrect: false,
        explanation: 'Trocas repentinas podem causar desconforto abdominal e fezes amolecidas.'
      },
      {
        id: '6b',
        text: 'Gradualmente ao longo de 5 a 7 dias, aumentando aos poucos a porcentagem da nova ração.',
        isCorrect: true,
        explanation: 'Perfeito! A transição gradativa permite que a flora intestinal do pet se adapte suavemente ao novo alimento.'
      },
      {
        id: '6c',
        text: 'Dar a ração nova apenas à noite e a antiga de manhã.',
        isCorrect: false,
        explanation: 'O ideal é misturar as duas na mesma refeição proporcionalmente durante o período de adaptação.'
      }
    ]
  },
  {
    id: 7,
    question: 'O biscoito crocante PremieR® Cookie é saudável para petiscar?',
    category: 'linha_premier',
    points: 150,
    options: [
      {
        id: '7a',
        text: 'Sim, é assado, nutritivo, sem corantes e enriquecido com vitaminas, ideal para momentos de carinho.',
        isCorrect: true,
        explanation: 'Exato! PremieR Cookie junta crocância, sabor e ingredientes saudáveis com ovos cage free.'
      },
      {
        id: '7b',
        text: 'Não, é frito em óleo vegetal pesado.',
        isCorrect: false,
        explanation: 'PremieR Cookie é cuidadosamente assado no forno, preservando a saúde do seu cão!'
      },
      {
        id: '7c',
        text: 'Pode substituir o almoço e o jantar do cachorro.',
        isCorrect: false,
        explanation: 'Lembre-se: biscoitos são petiscos complementares. A ração principal garante o equilíbrio completo.'
      }
    ]
  }
];
