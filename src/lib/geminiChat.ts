import { GoogleGenAI } from '@google/genai';

export async function generateChatReply(body: {
  messages?: any[];
  petProfile?: any;
  contextProduct?: string;
  customSubfamilies?: any[];
}): Promise<{ reply: string; suggestedProducts?: string[] }> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return {
      reply: 'Oi, eu sou a Patrícia! Sua guia médica-veterinária da Infos PremieRpet. Para ativar minhas respostas inteligentes em tempo real com IA na Vercel, adicione a variável de ambiente GEMINI_API_KEY no painel da Vercel (Project Settings > Environment Variables). Enquanto isso, posso te ajudar a explorar nossos produtos, calculadora de porções e quiz! 🐶🐱',
      suggestedProducts: ['premier-nattu', 'premier-formula']
    };
  }

  const ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });

  const { messages, petProfile, contextProduct, customSubfamilies } = body;

  let subfamiliesText = '';
  if (Array.isArray(customSubfamilies) && customSubfamilies.length > 0) {
    subfamiliesText = customSubfamilies.map((s: any, idx: number) => 
      `${idx + 1}. ${s.name}${s.subName ? ' (' + s.subName + ')' : ''}: ${s.description}. Indicado para: ${s.recommendedFor || 'Cães e Gatos'}. Categoria: ${s.category}.`
    ).join('\n');
  } else {
    subfamiliesText = `1. PremieR Cookie: Biscoitos assados, crocantes e nutritivos para momentos de agrado (Ovos cage free, saúde oral).
2. PremieR Gourmet: Alimentos úmidos de alta gastronomia com pedaços nobres de peito de frango e salmão cozidos a vapor.
3. PremieR Orgânico: Alimento úmido com ingredientes 100% orgânicos certificados, livres de defensivos e agrotóxicos.
4. PremieR Nattu: Nutrição Super Premium Natural com superalimentos (chia, abóbora, mandioca), zero corantes e transgênicos.
5. PremieR Formula: Máxima performance, saciedade e vitalidade com proteção articular e complexo de ômegas.
6. PremieR Nutrição Clínica (incluindo Obesidade Cães): Alimento coadjuvante veterinário com eficácia comprovada. Na linha Obesidade, reduz 20% do peso sem perder massa magra, com L-Carnitina e fibras funcionais.
7. PremieR Seleção Natural: Exclusiva proteína de frango Korin® (sem uso de antibióticos) e vegetais selecionados.
8. PremieR Raças Específicas: Primeira linha mundial com grãos e nutrientes desenvolvidos sob medida para cada raça (Yorkshire, Shih Tzu, Pug, Buldogue, Golden, etc.).
9. PremieR Gatos: Cuidado especial com paladares felinos exigentes, controle de pH urinário (evita pedras) e sistema Hairball.
10. PremieR Ambientes Internos: Para cães de apartamento, com extrato de Yucca para fezes firmes e sem odor forte.
11. PremieR Alimentos Úmidos Completos: Sachês e latas suculentos e 100% nutritivos para auxílio na hidratação hídrica.`;
  }

  let systemInstruction = `Você é a Dra. Patrícia Alves (Paty), médica-veterinária e a voz oficial da "Infos PremieRpet".
Com mais de 10 anos dedicados à saúde e nutrição animal preventiva, você é apaixonada por cães e gatos e traduz a ciência em uma linguagem acolhedora, clara, empática e acessível para os tutores.

SOBRE A PREMIERPET E NOSSAS SUBFAMÍLIAS DE PRODUTOS CADASTRADAS NO PAINEL ADMIN:
${subfamiliesText}

DIRETRIZES DE ATENDIMENTO DA PATRÍCIA:
- Se apresente carinhosamente como Patrícia ou Dra. Patrícia quando for o primeiro contato.
- Trate o pet pelo nome sempre que informado.
- Use tom acolhedor, humano, profissional e emojis adequados (🐶, 🐱, 🐾, ✨, ❤️, 🍖).
- Seja objetiva, clara e forneça orientações fáceis de entender sobre nutrição e saúde do pet.
- Destaque a importância da transição alimentar gradativa (5 a 7 dias).
- Recomende sempre o acompanhamento veterinário presencial para diagnósticos e exames clínicos.
- Ao final das respostas, sugira 1 ou 2 subfamílias PremieRpet adequadas ao pet e convide carinhosamente o tutor a clicar em "Ir para o Quiz" para testar seus conhecimentos e liberar seu cupom de desconto!
`;

  if (petProfile && petProfile.name) {
    systemInstruction += `\nINFORMAÇÕES DO PET DO TUTOR:
- Nome: ${petProfile.name}
- Espécie: ${petProfile.species === 'dog' ? 'Cão (Cachorro)' : 'Gato'}
- Raça: ${petProfile.breed || 'Não especificada'}
- Idade: ${petProfile.ageYears} ano(s)
- Peso atual: ${petProfile.weightKg} kg
- Nível de atividade: ${petProfile.activityLevel || 'moderada'}
${petProfile.eccScore ? `- Escore de Condição Corporal (ECC): ${petProfile.eccScore}/9` : ''}
${petProfile.targetWeightKg ? `- Peso meta desejado: ${petProfile.targetWeightKg} kg` : ''}
${petProfile.specialNeeds ? `- Necessidade especial: ${petProfile.specialNeeds}` : ''}
`;
  }

  if (contextProduct) {
    systemInstruction += `\nO tutor está visualizando o produto ou linha: "${contextProduct}".`;
  }

  const promptHistory = Array.isArray(messages)
    ? messages.map((msg: { sender: string; text: string }) => `${msg.sender === 'user' ? 'Tutor' : 'Dra. Nutri Premier'}: ${msg.text}`).join('\n')
    : 'Tutor: Olá, gostaria de tirar dúvidas sobre a alimentação do meu pet.';

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: promptHistory,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || 'Desculpe, tive um breve imprevisto ao responder. Como posso ajudar com o seu pet agora? 🐾';
    return { reply: replyText };
  } catch (err: any) {
    console.error('Gemini API Error:', err);
    return {
      reply: 'Oi, eu sou a Patrícia! A chave da API do Gemini informada na Vercel parece ser inválida ou expirou. Por favor, obtenha uma chave válida no Google AI Studio (aistudio.google.com) que começa com "AIzaSy..." e atualize a variável GEMINI_API_KEY no painel da Vercel. 🐶🐱',
      suggestedProducts: ['premier-nattu', 'premier-formula']
    };
  }
}
