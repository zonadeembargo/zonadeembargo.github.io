// Verifica se todo link interno do site gerado (pasta dist/) aponta para algo que existe.
// Uso: npm run links   (depois de npm run build)
// Não acessa a internet: links externos (https://...) são apenas listados, não testados.
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, dirname, resolve, relative } from 'node:path';

const DIST = resolve('dist');
const BASE = (process.env.BASE || '/').replace(/\/?$/, '/'); // ex.: "/" ou "/zona-de-embargo/"

if (!existsSync(DIST)) { console.error('Pasta dist/ não existe. Rode "npm run build" antes.'); process.exit(1); }

const htmls = [];
(function andar(dir) {
  for (const nome of readdirSync(dir)) {
    const p = join(dir, nome);
    if (statSync(p).isDirectory()) andar(p);
    else if (p.endsWith('.html')) htmls.push(p);
  }
})(DIST);

const quebrados = [];
const externos = new Set();
const atributo = /\s(?:href|src|srcset)=(?:"([^"]*)"|'([^']*)')/g;

function existe(caminhoUrl, arquivoOrigem) {
  let alvo;
  if (caminhoUrl.startsWith('/')) {
    if (!caminhoUrl.startsWith(BASE)) return false; // link absoluto que ignora o BASE quebra no GitHub Pages
    alvo = join(DIST, caminhoUrl.slice(BASE.length));
  } else {
    alvo = join(dirname(arquivoOrigem), caminhoUrl);
  }
  alvo = decodeURIComponent(alvo);
  if (existsSync(alvo) && statSync(alvo).isFile()) return true;
  return existsSync(join(alvo, 'index.html'));
}

for (const arquivo of htmls) {
  const html = readFileSync(arquivo, 'utf8');
  for (const m of html.matchAll(atributo)) {
    const valor = m[1] ?? m[2];
    // srcset pode ter vários endereços separados por vírgula ("img.webp 400w, img2.webp 800w")
    const urls = m[0].includes('srcset') ? valor.split(',').map((s) => s.trim().split(/\s+/)[0]) : [valor];
    for (const bruto of urls) {
      if (!bruto || bruto.startsWith('#') || /^(mailto|tel|data|javascript):/.test(bruto)) continue;
      if (/^https?:\/\//.test(bruto)) { externos.add(bruto); continue; }
      const limpo = bruto.split('#')[0].split('?')[0];
      if (limpo && !existe(limpo, arquivo)) quebrados.push(`${relative(DIST, arquivo)} → ${bruto}`);
    }
  }
}

console.log(`Páginas verificadas: ${htmls.length} · links externos (não testados): ${externos.size}`);
if (quebrados.length) {
  console.error(`\n✖ ${quebrados.length} link(s) interno(s) quebrado(s):`);
  for (const q of quebrados) console.error('  ' + q);
  process.exit(1);
}
console.log('✔ Nenhum link interno quebrado.');
