import draPatriciaAvatarImg from '../assets/images/dra_patricia_avatar_1786539257763.jpg';

// SVG Fallback for Dra. Patricia Avatar if network/file fails
export const FALLBACK_PATRICIA_AVATAR = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2532f5" />
      <stop offset="100%" stop-color="#121899" />
    </linearGradient>
  </defs>
  <circle cx="100" cy="100" r="100" fill="url(#bgGrad)" />
  <circle cx="100" cy="70" r="38" fill="#ffe0bd" />
  <path d="M60 180 C60 125, 140 125, 140 180 Z" fill="#ffffff" />
  <path d="M85 130 L115 130 L115 165 L85 165 Z" fill="#2532f5" />
  <circle cx="100" cy="120" r="8" fill="#e2e8f0" />
  <circle cx="88" cy="65" r="4" fill="#334155" />
  <circle cx="112" cy="65" r="4" fill="#334155" />
  <path d="M92 82 Q100 90 108 82" stroke="#e11d48" stroke-width="3" fill="none" stroke-linecap="round" />
</svg>
`)}`;

export const DEFAULT_PATRICIA_AVATAR = draPatriciaAvatarImg;

export const DEFAULT_QUIZ_BANNER = 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=800';
