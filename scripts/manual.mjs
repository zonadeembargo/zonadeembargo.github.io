// Gera o MANUAL DE INSTRUÇÕES consolidado (MANUAL.md + GUIA-VSCODE-GITHUB.md) em um único HTML
// que abre offline em qualquer navegador e pode ser impresso ou salvo como PDF.
//
// Uso:  npm run manual                 → grava ../MANUAL-DE-INSTRUCOES.html (pasta do projeto, fora do repositório)
//       npm run manual -- caminho.html → grava onde você indicar
//
// Os caminhos locais desta máquina entram só no HTML gerado, nunca no repositório público.
import { readFile, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { execSync } from 'node:child_process';
import { createMarkdownProcessor } from '@astrojs/markdown-remark';

const raiz = resolve(import.meta.dirname, '..');
const destino = resolve(process.argv[2] || resolve(raiz, '..', 'MANUAL-DE-INSTRUCOES.html'));
const md = await createMarkdownProcessor({ syntaxHighlight: false });

const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const git = (cmd) => { try { return execSync(`git ${cmd}`, { cwd: raiz, encoding: 'utf8' }).trim(); } catch { return ''; } };

const partes = [
  { arquivo: 'MANUAL.md', id: 'manual' },
  { arquivo: 'GUIA-VSCODE-GITHUB.md', id: 'guia' },
];

let corpo = '';
let indice = '';
for (const p of partes) {
  const texto = await readFile(resolve(raiz, p.arquivo), 'utf8');
  const { code, metadata } = await md.render(texto);
  // Prefixa os ids para que as duas partes não colidam.
  const html = code.replace(/id="([^"]+)"/g, `id="${p.id}-$1"`).replace(/href="#([^"]+)"/g, `href="#${p.id}-$1"`);
  const h1 = metadata.headings.find((h) => h.depth === 1);
  const h2 = metadata.headings.filter((h) => h.depth === 2);
  indice += `<li><a href="#${p.id}-${h1?.slug}">${esc(h1?.text ?? p.arquivo)}</a><ol>${h2
    .map((h) => `<li><a href="#${p.id}-${h.slug}">${esc(h.text)}</a></li>`).join('')}</ol></li>`;
  corpo += `<section class="parte" id="parte-${p.id}">${html}<p class="origem">Fonte: <code>site/${p.arquivo}</code></p></section>`;
}

const commit = git('log -1 --format="%h · %cd" --date=format:"%d/%m/%Y %H:%M"');
const gerado = new Date().toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' });
const pastaProjeto = dirname(raiz);

const maquina = `
<section class="placa" id="nesta-maquina">
  <h2>Nesta máquina</h2>
  <table>
    <tr><th>Pasta do projeto</th><td><code>${esc(pastaProjeto)}</code></td></tr>
    <tr><th>Site (repositório Git)</th><td><code>${esc(raiz)}</code></td></tr>
    <tr><th>Site no ar</th><td><a href="https://zonadeembargo.github.io/">https://zonadeembargo.github.io/</a></td></tr>
    <tr><th>Repositório</th><td><a href="https://github.com/zonadeembargo/zonadeembargo.github.io">github.com/zonadeembargo/zonadeembargo.github.io</a></td></tr>
    <tr><th>Publicações (Actions)</th><td><a href="https://github.com/zonadeembargo/zonadeembargo.github.io/actions">…/actions</a></td></tr>
  </table>
  <p><strong>Rotina mínima no terminal</strong> (cada linha é um comando):</p>
<pre><code>cd "${esc(raiz)}"
npm run dev                       # ver o site em http://localhost:4321 enquanto escreve
npm run novo -- "Título" cronicas # criar um texto novo (rascunho)
npm run verificar                 # checagem completa, a mesma do GitHub
git add -A
git commit -m "novo texto: título"
git push                          # publica em ~1 minuto
npm run manual                    # regenera este manual</code></pre>
  <p class="nota">Este arquivo é gerado a partir dos manuais do repositório. Para atualizá-lo depois de editar
  <code>MANUAL.md</code> ou <code>GUIA-VSCODE-GITHUB.md</code>, rode <code>npm run manual</code> dentro de <code>site/</code>.
  Para ter em PDF: abra no navegador e use <em>Imprimir → Salvar como PDF</em>.</p>
</section>`;

const pagina = `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Manual de instruções · Zona de Embargo</title>
<style>
:root{--asfalto:#121415;--placa:#1b1f21;--borda:#2e3538;--texto:#d9d9d9;--fraco:#a3abb0;--ciano:#4deeea;--laranja:#e0975f;--vermelho:#9e1b1b;
  --mono:"Share Tech Mono",ui-monospace,"DejaVu Sans Mono",monospace;--ui:"Rajdhani",system-ui,sans-serif}
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:var(--asfalto);color:var(--texto);font:17px/1.65 system-ui,sans-serif}
header.topo{border-bottom:3px solid var(--vermelho);background:linear-gradient(#1d2224,#121415);padding:28px 16px 20px}
header.topo div,main{max-width:900px;margin:0 auto}
.kicker{font-family:var(--mono);color:var(--ciano);letter-spacing:.12em;text-transform:uppercase;font-size:.8rem;margin:0}
h1.titulo{font-family:"Black Ops One",var(--ui);font-size:clamp(1.8rem,5vw,2.6rem);letter-spacing:.04em;margin:.2em 0 0;color:#fff;text-transform:uppercase}
.meta{font-family:var(--mono);color:var(--fraco);font-size:.85rem;margin:.4em 0 0}
main{padding:0 16px 64px}
h1,h2,h3{font-family:var(--ui);line-height:1.2;color:#fff}
.parte>h1{font-size:2rem;text-transform:uppercase;letter-spacing:.04em;border-bottom:2px solid var(--laranja);padding-bottom:.25em;margin-top:2.5em}
h2{font-size:1.5rem;color:var(--laranja);margin-top:2em}
h3{font-size:1.2rem;color:var(--ciano);margin-top:1.6em}
a{color:var(--ciano);overflow-wrap:anywhere}
a:hover{color:#fff}
:focus-visible{outline:2px solid var(--ciano);outline-offset:2px}
code{font-family:var(--mono);background:#0b0d0e;border:1px solid var(--borda);border-radius:3px;padding:.05em .3em;font-size:.92em;overflow-wrap:anywhere}
pre{background:#0b0d0e;border:1px solid var(--borda);border-left:3px solid var(--ciano);padding:12px 14px;overflow-x:auto;line-height:1.5}
pre code{border:0;padding:0;background:none;overflow-wrap:normal}
table{border-collapse:collapse;width:100%;margin:1em 0;font-size:.95rem;display:block;overflow-x:auto}
th,td{border:1px solid var(--borda);padding:6px 10px;text-align:left;vertical-align:top}
th{background:#22282b;font-family:var(--ui);color:#fff}
blockquote{margin:1em 0;padding:.6em 1em;border-left:3px solid var(--laranja);background:#1a1d1f;color:var(--texto)}
blockquote p{margin:.3em 0}
.placa{background:var(--placa);border:1px solid var(--borda);padding:4px 20px 12px;margin:28px 0;clip-path:polygon(0 0,calc(100% - 14px) 0,100% 14px,100% 100%,14px 100%,0 calc(100% - 14px))}
.placa h2{margin-top:.8em}
nav.indice ol{padding-left:1.3em}
nav.indice>ol>li{margin:.4em 0;font-weight:600}
nav.indice ol ol{font-weight:400;columns:2;column-gap:2em}
nav.indice ol ol li{break-inside:avoid}
.nota,.origem{color:var(--fraco);font-size:.9rem}
.origem{font-family:var(--mono);border-top:1px dashed var(--borda);padding-top:.6em;margin-top:2em}
li input[type=checkbox]{accent-color:var(--ciano);margin-right:.4em}
.contains-task-list{list-style:none;padding-left:.4em}
.topo-link{position:fixed;right:16px;bottom:16px;background:var(--placa);border:1px solid var(--borda);padding:6px 10px;font-family:var(--mono);font-size:.85rem;text-decoration:none}
@media (max-width:640px){nav.indice ol ol{columns:1}body{font-size:16px}}
@media print{
  body{background:#fff;color:#111;font-size:11pt}
  header.topo{background:none;border-bottom:2px solid #000}
  h1.titulo,h1,h2,h3,th{color:#000}
  h2{color:#7a3d10}h3{color:#0b5f5d}
  a{color:#000}
  code,pre,th,blockquote,.placa{background:#f3f3f3;border-color:#bbb;clip-path:none}
  .topo-link{display:none}
  .parte{break-before:page}
  pre,table,blockquote{break-inside:avoid}
}
</style>
</head>
<body>
<header class="topo"><div>
  <p class="kicker">Documentação do projeto</p>
  <h1 class="titulo">Manual de instruções · Zona de Embargo</h1>
  <p class="meta">Gerado em ${esc(gerado)}${commit ? ` · versão do repositório ${esc(commit)}` : ''}</p>
</div></header>
<main id="topo">
${maquina}
<nav class="indice placa" aria-label="Sumário"><h2>Sumário</h2><ol><li><a href="#nesta-maquina">Nesta máquina</a></li>${indice}</ol></nav>
${corpo}
</main>
<a class="topo-link" href="#topo">↑ sumário</a>
</body>
</html>
`;

await writeFile(destino, pagina);
console.log(`✔ Manual gerado: ${destino}`);
