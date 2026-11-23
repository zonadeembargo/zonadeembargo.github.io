# Histórico de mudanças

Formato: data · versão · o que mudou. Detalhes de cada passo em `git log`.

## 2026-11-22 · V2.1 — consolidação

### Base (P0)
- Projeto passa a ser um repositório Git; o commit inicial guarda a V2 intacta.
- `npm run verificar`: `astro check` + build + busca + verificador de links internos (`scripts/verificar-links.mjs`).
- Deploy só publica se a verificação passar (`withastro/action@v6`, Node 24, `deploy-pages@v5`).
- `tsconfig.json`, `engines.node >= 22.12`, `.nvmrc`.

### Conteúdo e editorial (P1)
- Textos: novos campos `autor`, `tags`, `destaque`, `capaAlt` (obrigatório com capa) e `referencias`; notas de rodapé com rótulos em português.
- Páginas por etiqueta (`/tags/<nome>/`) e índice de etiquetas em `/textos/`.
- Página **Manifesto** (esqueleto estruturado para o texto do autor), com link na home, no Dossiê e no rodapé.
- Ferramentas: `url` validada (`https://` ou `downloads/`), campos `acesso` e `codigo`, selos ARQUIVO LOCAL / EXTERNO / REQUER LOGIN; pasta `public/downloads/`.
- Exemplos renomeados por categoria (`exemplo-cartografia`, `exemplo-cronicas`, `exemplo-tecno`).

### Interface e identidade (P1/P2)
- Home: destaque editorial escolhido por `destaque: true`; painel "canal aberto" com apresentação e atalhos (Manifesto, Dossiê, Paiol, Busca, RSS, canais externos via `SITE.canais`).
- Mascotes integrados como identidade de seção (apresentador, leitor, pesquisador, tutor, escritor, organizador); poses antes sem uso agora aparecem.
- Texto: HUD de metadados, selo de licença, bloco de referências, etiquetas, leitura relacionada.
- Busca estática com Pagefind (`/busca/`, filtro por tema, `?q=`).
- Navegação mobile cabe em 375 px sem rolagem lateral; ícone de busca no menu.
- Hover ciano discreto nos cards; CSS organizado com índice.

### SEO e desempenho
- `og:type=article`, `article:*`, JSON-LD `BlogPosting`, `og:image` da capa.
- RSS com categorias e etiquetas.
- `robots.txt` deixa de bloquear `/institucional/` (o `noindex` passa a ser lido).
- Imagem do destaque servida em AVIF/WebP responsivo (640–2400 px) em vez de um WebP único de 2400 px.
- Mascotes com `width/height` e versão 2x.

### Plataforma
- Astro 5.18 → 6.4 (Zod 4 via `astro/zod`; URLs aceitas só com http/https).
- Astro 6.4 → 7.4 (Markdown mantido no processador unified para compatibilidade).

## 2026-11-22 · ajuste
- Seção ARSENAL renomeada para **PAIOL** (endereço `/ferramentas/` mantido, para não quebrar links).
- Novo **emblema** (hexágono verde, foice e martelo, circuitos) no cabeçalho, no favicon e no ícone de celular; fundo externo tornado transparente. Logos anteriores arquivados em `docs/identidade/`.
- Nova imagem de compartilhamento (`public/img/og.jpg`, 1200×630): emblema + arte do topo. A anterior está em `docs/identidade/og-anterior.jpg`.
