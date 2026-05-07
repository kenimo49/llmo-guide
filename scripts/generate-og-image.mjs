import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, '..', 'public', 'og-image.png');

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#0b1530"/>
      <stop offset="1" stop-color="#1a2b5c"/>
    </linearGradient>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
      <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.04 0"/>
    </filter>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" filter="url(#grain)"/>

  <g transform="translate(80, 80)">
    <rect width="120" height="6" fill="#7dd3fc"/>
  </g>

  <text x="80" y="170" font-family="ui-monospace, 'SF Mono', 'JetBrains Mono', monospace"
        font-size="28" fill="#7dd3fc" letter-spacing="6">LLMO FRAMEWORK</text>

  <text x="80" y="290" font-family="ui-sans-serif, system-ui, -apple-system, 'Helvetica Neue', sans-serif"
        font-size="76" font-weight="700" fill="#ffffff">The open standard</text>
  <text x="80" y="380" font-family="ui-sans-serif, system-ui, -apple-system, 'Helvetica Neue', sans-serif"
        font-size="76" font-weight="700" fill="#ffffff">for AI discoverability.</text>

  <text x="80" y="450" font-family="ui-sans-serif, system-ui, -apple-system, 'Helvetica Neue', sans-serif"
        font-size="28" fill="#cbd5e1">Make your content findable by ChatGPT, Claude, Gemini, Perplexity.</text>

  <g transform="translate(80, 520)" font-family="ui-monospace, 'SF Mono', 'JetBrains Mono', monospace" font-size="20" fill="#94a3b8">
    <text x="0"   y="0">01 KNOWLEDGE</text>
    <text x="220" y="0">02 STRUCTURE</text>
    <text x="440" y="0">03 RETRIEVAL</text>
    <text x="660" y="0">04 AUTHORITY</text>
    <text x="880" y="0">05 CITATION</text>
  </g>

  <text x="80" y="585" font-family="ui-monospace, 'SF Mono', 'JetBrains Mono', monospace"
        font-size="20" fill="#7dd3fc">llmoframework.com</text>
</svg>`;

await sharp(Buffer.from(svg))
  .png({ compressionLevel: 9 })
  .toFile(outPath);

console.log(`OG image generated: ${outPath}`);
