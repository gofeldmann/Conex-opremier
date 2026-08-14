import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { generateChatReply } from './src/lib/geminiChat';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', brand: 'PremieRpet Chatbot & Quiz' });
  });

  // Chat endpoint
  app.post('/api/chat', async (req, res) => {
    try {
      const result = await generateChatReply(req.body || {});
      res.json(result);
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
