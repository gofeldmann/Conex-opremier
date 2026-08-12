import { ProductSubfamily } from '../types';

export const PREMIER_SUBFAMILIES: ProductSubfamily[] = [
  {
    id: 'premier-cookie',
    name: 'PremieR Cookie',
    subName: 'Biscoitos Crocantes & Saudáveis',
    category: 'Alimentos Específicos',
    categoryBadgeColor: 'bg-amber-800 text-white',
    petType: 'dog',
    description: 'PremieR® Cookie foi desenvolvido para proporcionar momentos mais felizes e saudáveis com seu pet. Assados, altamente saborosos e enriquecidos com vitaminas e minerais.',
    benefits: [
      'Assados e nutritivos',
      'Saúde oral com hexametafosfato de sódio',
      'Ingredientes selecionados e ovos cage free',
      'Sem corantes nem aromatizantes artificiais'
    ],
    image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80',
    highlights: ['Lanchinho Saudável', 'Força e Brilho na Pelagem', 'Ovos Cage Free'],
    recommendedFor: 'Cães adultos e filhotes para momentos de recompensa e carinho.',
    sampleQuestions: [
      'Quantos biscoitos PremieR Cookie posso dar ao meu cão por dia?',
      'PremieR Cookie engorda meu cachorro?',
      'Posso dar PremieR Cookie para filhotes?'
    ]
  },
  {
    id: 'premier-gourmet',
    name: 'PremieR Gourmet',
    subName: 'Alta Gastronomia Úmida',
    category: 'Alimentos Específicos',
    categoryBadgeColor: 'bg-blue-900 text-white',
    petType: 'both',
    description: 'A linha de alimentos úmidos PremieR® Gourmet foi desenvolvida para oferecer a mais alta gastronomia para seu cão ou gato. Cortes nobres de carne e frango cozidos a vapor.',
    benefits: [
      'Peito de frango e salmão em pedaços nobres',
      'Rico em proteínas de altíssimo valor biológico',
      'Livre de transgênicos, corantes e conservantes',
      'Promove excelente hidratação diária'
    ],
    image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=800&q=80',
    highlights: ['100% Peito de Frango/Salmão', 'Cozido a Vapor', 'Super Hidratação'],
    recommendedFor: 'Cães e gatos com paladares exigentes que merecem uma refeição gourmet.',
    sampleQuestions: [
      'PremieR Gourmet substitui a ração seca?',
      'Qual a diferença entre PremieR Gourmet para cães e para gatos?',
      'Como servir o alimento úmido Gourmet no dia a dia?'
    ]
  },
  {
    id: 'premier-organico',
    name: 'PremieR Orgânico',
    subName: 'Ingredientes Orgânicos Certificados',
    category: 'Natural & Orgânico',
    categoryBadgeColor: 'bg-lime-700 text-white',
    petType: 'both',
    description: 'A linha de alimentos úmidos PremieR® Orgânico foi desenvolvida com ingredientes orgânicos 100% certificados, promovendo sustentabilidade e nutrição pura.',
    benefits: [
      'Ingredientes da agricultura orgânica certificada',
      'Sem agrotóxicos ou fertilizantes sintéticos',
      'Embalagem sustentável e consciente',
      'Alta palatabilidade e digestibilidade'
    ],
    image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80',
    highlights: ['Orgânico Certificado', 'Respeito ao Meio Ambiente', 'Nutrição Pura'],
    recommendedFor: 'Tutores que priorizam um estilo de vida ecologicamente consciente e alimentação orgânica para seus pets.',
    sampleQuestions: [
      'O que certifica a linha PremieR Orgânico?',
      'Quais ingredientes orgânicos são usados na receita?',
      'Gatos idosos podem consumir PremieR Orgânico?'
    ]
  },
  {
    id: 'premier-nattu',
    name: 'PremieR Nattu',
    subName: 'Super Premium Natural',
    category: 'Super Premium',
    categoryBadgeColor: 'bg-emerald-800 text-white',
    petType: 'both',
    description: 'A linha PremieR® Nattu foi pensada para oferecer uma alimentação saudável para cães e gatos, através de ingredientes naturais, nutritivos, superalimentos (mandioca, abóbora, chia) e certificados.',
    benefits: [
      'Combinação exclusiva de superalimentos naturais',
      'Proteínas de frango frito a ar quente / peixe selecionados',
      'Zero corantes, aromatizantes e transgênicos',
      'Promove saúde intestinal com prebióticos e fibras funcionais'
    ],
    image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=800&q=80',
    highlights: ['Superalimentos Naturais', 'Chia & Abóbora', 'Zero Transgênicos'],
    recommendedFor: 'Cães e gatos de todas as idades que buscam vitalidade e longevidade natural.',
    sampleQuestions: [
      'Quais são os superalimentos presentes na PremieR Nattu?',
      'PremieR Nattu tem opção para filhotes e adultos castrados?',
      'Qual a diferença entre Nattu e Seleção Natural?'
    ]
  },
  {
    id: 'premier-formula',
    name: 'PremieR Formula',
    subName: 'Máxima Performance e Saciedade',
    category: 'Super Premium',
    categoryBadgeColor: 'bg-sky-900 text-white',
    petType: 'both',
    description: 'PremieR® Formula garante os melhores desempenhos em performance, saciedade e proporciona ao seu cão ou gato excelente saúde, energia, proteção articular e vitalidade.',
    benefits: [
      'Níveis ideais de proteína e energia balanceada',
      'Complexo de óleos ômega 3 e 6 para pele e pelagem sedosa',
      'Proteção das articulações com condroitina e glicosamina',
      'Extrato de Yucca para redução do odor das fezes'
    ],
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=800&q=80',
    highlights: ['Alta Performance', 'Suporte Articular', 'Pele & Pelagem Brilhante'],
    recommendedFor: 'Cães e gatos ativos de pequeno, médio e grande porte que precisam de nutrição equilibrada diária.',
    sampleQuestions: [
      'Como transicionar a ração para PremieR Formula?',
      'A PremieR Formula atende cães de grande porte?',
      'PremieR Formula possui versão para cães castrados?'
    ]
  },
  {
    id: 'premier-nutricao-clinica-obesidade',
    name: 'PremieR Nutrição Clínica - Obesidade',
    subName: 'Tratamento do Excesso de Peso em Cães',
    category: 'Nutrição Clínica',
    categoryBadgeColor: 'bg-indigo-900 text-white',
    petType: 'dog',
    description: 'Alimento coadjuvante indicado para cães adultos com excesso de peso para auxiliar no programa de perda de peso e alcançar o peso ideal. Comprovado cientificamente com perda de 20% do peso sem perder massa muscular.',
    benefits: [
      'Calorias reduzidas e alto teor de fibras (46g/1000kcal)',
      'Rico em proteínas para preservar a massa magra durante o emagrecimento',
      'L-Carnitina (76mg/1000kcal) para otimizar a queima de gorduras',
      'Suporte articular reforçado com condroitina e β-glucanas'
    ],
    image: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&w=800&q=80',
    highlights: ['Perda de 20% de Peso', 'Preserva Massa Magra', 'Alta Fibra & L-Carnitina'],
    recommendedFor: 'Cães adultos com sobrepeso/obesidade (ECC 6 a 9/9), constipação ou hiperlipidemia sob orientação veterinária.',
    sampleQuestions: [
      'Como calcular a quantidade diária de PremieR Obesidade para o meu cão?',
      'O que significa Escore de Condição Corporal (ECC)?',
      'Filhotes ou cadelas prenhes podem comer a ração PremieR Obesidade?'
    ]
  },
  {
    id: 'premier-nutricao-clinica-geral',
    name: 'PremieR Nutrição Clínica',
    subName: 'Alimentos Coadjuvantes Veterinários',
    category: 'Nutrição Clínica',
    categoryBadgeColor: 'bg-indigo-900 text-white',
    petType: 'both',
    description: 'Linha desenvolvida por médicos-veterinários especialistas para suporte nutricional no tratamento de diversas enfermidades em cães e gatos (Renal, Gastrointestinal, Hipoalergênico, Obesidade, Urinário).',
    benefits: [
      'Fórmulas específicas para suporte a patologias',
      'Comprovação científica de eficácia clínica',
      'Ingredientes de altíssima digestibilidade',
      'Opções secas e úmidas para máxima aceitação'
    ],
    image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=800&q=80',
    highlights: ['Suporte Veterinário', 'Eficácia Científica', 'Nutrição Terapêutica'],
    recommendedFor: 'Pets com condições de saúde específicas diagnosticadas por médico veterinário.',
    sampleQuestions: [
      'Preciso de receita médica veterinária para comprar PremieR Nutrição Clínica?',
      'Quais são os tipos de ração da linha Nutrição Clínica?',
      'Posso misturar a ração seca de nutrição clínica com o sachê úmido da mesma linha?'
    ]
  },
  {
    id: 'premier-selecao-natural',
    name: 'PremieR Seleção Natural',
    subName: 'Com Proteína de Frango Korin',
    category: 'Super Premium',
    categoryBadgeColor: 'bg-teal-800 text-white',
    petType: 'both',
    description: 'A linha PremieR® Seleção Natural possui a exclusiva proteína de frango Korin (criado sem uso de antibióticos) e foi desenvolvida para quem valoriza um estilo de vida natural e saudável.',
    benefits: [
      'Frango Korin sem uso de antibióticos como promotores de crescimento',
      'Complexo de vegetais nutritivos (espinafre, cenoura, beterraba)',
      'Sódio reduzido e alta conservação natural com antioxidantes',
      'Embalagem reciclável e pegada sustentável'
    ],
    image: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80',
    highlights: ['Frango Korin®', 'Sem Antibióticos', 'Complexo de Vegetais'],
    recommendedFor: 'Tutores que exigem saudabilidade extrema e ingredientes com origem sustentável comprovada.',
    sampleQuestions: [
      'O que é o frango Korin presente na PremieR Seleção Natural?',
      'Quais vegetais estão inclusos na receita Seleção Natural?',
      'Existe versão Seleção Natural para gatos castrados?'
    ]
  },
  {
    id: 'premier-racas-especificas',
    name: 'PremieR Raças Específicas',
    subName: 'Nutrição Customizada por Raça',
    category: 'Super Premium',
    categoryBadgeColor: 'bg-blue-800 text-white',
    petType: 'dog',
    description: 'A primeira linha mundial que proporciona a nutrição específica para a raça do seu cão. Formato de grão sob medida, auxílio na mastigação e nutrientes para prevenir predisposições genéticas.',
    benefits: [
      'Grão exclusivo com formato ideal para a mordida da raça',
      'Prevenção de problemas comuns da raça (ex: lágrima ácida, articulações, pele sensível)',
      'Redução de tártaro e saúde bucal contínua',
      'Nutrição precisa para Shih Tzu, Yorkshire, Pug, Buldogue, Golden, etc.'
    ],
    image: 'https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?auto=format&fit=crop&w=800&q=80',
    highlights: ['Grão Sob Medida', 'Prevenção Específica', '1ª Linha Mundial'],
    recommendedFor: 'Cães de raças puras com sensibilidades particulares de pelagem, digestão e formato maxilar.',
    sampleQuestions: [
      'Quais raças têm ração específica na PremieRpet?',
      'Por que o formato do grão muda de acordo com a raça?',
      'Como a ração para Shih Tzu ajuda no pelo e lágrima ácida?'
    ]
  },
  {
    id: 'premier-gatos',
    name: 'PremieR Gatos',
    subName: 'Especialista no Paladar Felino',
    category: 'Super Premium',
    categoryBadgeColor: 'bg-orange-700 text-white',
    petType: 'cat',
    description: 'A linha PremieR® Gatos foi criada especialmente para oferecer alimentos com alta qualidade nutricional para gatos com paladares exigentes, controle de PH urinário e saúde intestinal.',
    benefits: [
      'Controle do pH urinário para prevenção de cálculos renal/vesical',
      'Sistema Hairball para eliminação suave de bolas de pelo',
      'Rico em Taurina essencial para visão e coração felino',
      'Ingredientes nobres com máxima atratividade para felinos'
    ],
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80',
    highlights: ['Controle de pH Urinário', 'Sistema Hairball', 'Rico em Taurina'],
    recommendedFor: 'Gatos filhotes, adultos, castrados e seniores vivendo em ambientes internos ou externos.',
    sampleQuestions: [
      'Como a PremieR Gatos ajuda a evitar pedras nos rins/trato urinário?',
      'Qual ração dar para um gato recém-castrado?',
      'O que é o controle de bola de pelo (Hairball)?'
    ]
  },
  {
    id: 'premier-ambientes-internos',
    name: 'PremieR Ambientes Internos',
    subName: 'Para Pets que Vivem Dentro de Casa',
    category: 'Super Premium',
    categoryBadgeColor: 'bg-emerald-900 text-white',
    petType: 'dog',
    description: 'Especialmente desenvolvida para cães que vivem dentro de casa e apartamentos. Nutrição equilibrada que reduz significativamente o odor e volume das fezes.',
    benefits: [
      'Combinação de extrato de Yucca e fibras especiais para fezes firmes e sem odor forte',
      'Controle de peso calorias adequadas para cães com menor gasto energético',
      'Saúde da pelagem e redução de queda de pelos no ambiente',
      'Grãos especiais de fácil apreensão'
    ],
    image: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=crop&w=800&q=80',
    highlights: ['Menos Odor nas Fezes', 'Para Apartamentos', 'Controle de Queda de Pelo'],
    recommendedFor: 'Cães de porte pequeno ou médio que vivem predominantemente em ambientes fechados.',
    sampleQuestions: [
      'Como a ração Ambientes Internos diminui o cheiro das fezes do cachorro?',
      'Cães em apartamento gastam menos energia? Como a ração ajuda?',
      'Qual a idade indicada para mudar para Ambientes Internos Senior?'
    ]
  },
  {
    id: 'premier-umidos-completos',
    name: 'PremieR Alimentos Úmidos Completos',
    subName: 'Sachês e Latas 100% Nutritivos',
    category: 'Alimento Completo Úmidos',
    categoryBadgeColor: 'bg-cyan-800 text-white',
    petType: 'both',
    description: 'Linha de sachês e latas de alimentos úmidos completos e balanceados para cães e gatos. Oferece sabor e textura irresistíveis mantendo o suprimento total de nutrientes.',
    benefits: [
      'Alimento 100% completo (pode ser servido como refeição única ou misturado)',
      'Textura macia, pedaços ao molho altamente suculentos',
      'Favorece a ingestão hídrica, protegendo a função renal',
      'Sem conservantes artificiais ou corantes sintéticos'
    ],
    image: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?auto=format&fit=crop&w=800&q=80',
    highlights: ['Refeição Completa', 'Textura Suculenta', 'Hidratação Protegida'],
    recommendedFor: 'Cães e gatos de todas as idades que adoram refeições úmidas e saborosas.',
    sampleQuestions: [
      'Alimento úmido dá cárie no dente do pet?',
      'Posso misturar o sachê úmido com a ração seca PremieR?',
      'Quantos sachês um gato de 4kg deve comer por dia?'
    ]
  }
];
