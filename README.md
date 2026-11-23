# Zona de Embargo — site pessoal (Astro)

Terminal de pesquisa eco-cyber-punk: textos em Markdown, ferramentas livres, manifesto e acesso institucional. Site estático (sem banco de dados, sem servidor, zero JavaScript fora da busca), publicado de graça no GitHub Pages.

## Comandos

| Comando | O que faz |
|---|---|
| `npm ci` | Instala as dependências nas versões exatas do `package-lock.json` (uma vez) |
| `npm run dev` | Site em `http://localhost:4321`, com rascunhos e recarga automática (busca desativada) |
| `npm run novo -- "Título" cartografia` | Cria um texto novo como rascunho (`cartografia`, `cronicas` ou `tecno`) |
| `npm run verificar` | Checagem completa: tipos + build + busca + links internos (o mesmo que o GitHub roda) |
| `npm run build` | Gera o site em `dist/` e o índice de busca em `dist/pagefind/` |
| `npm run preview` | Serve o `dist/` localmente (com busca) |
| `npm run manual` | Junta `MANUAL.md` e `GUIA-VSCODE-GITHUB.md` em `../MANUAL-DE-INSTRUCOES.html` (pasta do projeto, fora do repositório; abre offline e imprime em PDF) |

Requer Node.js 22.12+.

## Documentação

- **[`MANUAL.md`](MANUAL.md)** — publicar, editar, campos dos textos, downloads, problemas comuns.
- **[`GUIA-VSCODE-GITHUB.md`](GUIA-VSCODE-GITHUB.md)** — ver no VS Code e enviar ao GitHub.
- **[`docs/ARQUITETURA.md`](docs/ARQUITETURA.md)** — como o site funciona por dentro, decisões técnicas, manutenção.
- **[`docs/CHANGELOG.md`](docs/CHANGELOG.md)** — histórico das mudanças.
- **[`docs/AUDITORIA.md`](docs/AUDITORIA.md)** — última auditoria de acessibilidade e desempenho.
- **[`LICENCAS.md`](LICENCAS.md)** — licença por tipo de material.

## Onde mexer

- Textos: `src/content/textos/*.md` (modelo comentado em `_modelo.md`)
- Páginas: `src/content/paginas/` (`sobre.md`, `manifesto.md`, `licencas.md`)
- Downloads: `src/content/ferramentas/` + arquivos em `public/downloads/`
- Nomes, menus, categorias, canais, mascotes por seção: `src/config.ts`
- Cores e fontes: bloco `:root` de `src/styles/global.css`
