// Cria um texto novo já com o cabeçalho preenchido.
// Uso:  npm run novo -- "Título do texto" [categoria]
import { writeFileSync, existsSync } from 'node:fs';

const [titulo, categoria = 'cartografia'] = process.argv.slice(2);
if (!titulo) { console.log('Uso: npm run novo -- "Título do texto" [cartografia|cronicas|tecno]'); process.exit(1); }

const slug = titulo.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const hoje = new Date().toISOString().slice(0, 10);
const arquivo = `src/content/textos/${slug}.md`;
if (existsSync(arquivo)) { console.log(`Já existe: ${arquivo}`); process.exit(1); }

writeFileSync(arquivo, `---
titulo: "${titulo.replace(/"/g, '\\"')}"
resumo: "Uma ou duas frases que aparecem no card e nas redes sociais."
data: ${hoje}
categoria: ${categoria}
rascunho: true
---

Comece a escrever aqui.
`);
console.log(`Criado: ${arquivo}\nEdite o texto e troque "rascunho: true" por "rascunho: false" para publicar.`);
