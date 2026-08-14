import type { VercelRequest, VercelResponse } from '@vercel/node';
import { generateChatReply } from '../src/lib/geminiChat';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS setup
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  try {
    const result = await generateChatReply(req.body || {});
    return res.status(200).json(result);
  } catch (err: any) {
    console.error('Erro no handler Vercel:', err);
    return res.status(200).json({
      reply: 'Oi, eu sou a Patrícia! Ocorreu um erro no servidor: ' + (err?.message || 'Erro inesperado') + '. 🐾',
      suggestedProducts: ['premier-nattu', 'premier-formula']
    });
  }
}
