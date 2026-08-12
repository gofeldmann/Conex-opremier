import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Initialize Gemini Client
  const getGenAI = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY is not set. AI Chat responses will use fallback instructions or fail smoothly.');
    }
    return new GoogleGenAI({
      apiKey: apiKey || '',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  };

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', brand: 'PremieRpet Chatbot & Quiz' });
  });

  // Chat endpoint powered by Gemini 3.6 Flash
  app.post('/api/chat', async (req, res) => {
    try {
      const { messages, petProfile, contextProduct, customSubfamilies } = req.body;

      if (!process.env.GEMINI_API_KEY) {
        return res.status(200).json({
          reply: 'Oi, eu sou a Patrícia! Sua guia médica-veterinária da Infos PremieRpet. Para ativar minhas respostas inteligentes em tempo real com IA, configure a GEMINI_API_KEY nos Secrets do projeto. Enquanto isso, posso te ajudar a explorar nossos produtos, calculadora de porções e quiz! 🐶🐱',
          suggestedProducts: ['premier-nattu', 'premier-formula']
        });
      }

      const ai = getGenAI();

      // Build subfamilies list dynamically if provided, otherwise default list
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

      // Convert message history for Gemini chat
      const promptHistory = Array.isArray(messages)
        ? messages.map((msg: { sender: string; text: string }) => `${msg.sender === 'user' ? 'Tutor' : 'Dra. Nutri Premier'}: ${msg.text}`).join('\n')
        : 'Tutor: Olá, gostaria de tirarm dúvidas sobre a alimentação do meu pet.';

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: promptHistory,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      const replyText = response.text || 'Desculpe, tive um breve imprevisto ao responder. Como posso ajudar com o seu pet agora? 🐾';

      res.json({ reply: replyText });
    } catch (err: any) {
      console.error('Error in /api/chat:', err);
      res.status(500).json({
        error: 'Erro ao se comunicar com a Dra. Nutri Premier.',
        details: err?.message || 'Erro desconhecido'
      });
    }
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PremieRpet Chatbot Server running on http://localhost:${PORT}`);
  });
}

startServer();
