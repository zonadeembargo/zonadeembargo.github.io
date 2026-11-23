# Arquitetura

Este documento explica **como o site funciona por dentro** e **por que** cada escolha foi feita. É para quem vai manter o projeto (você, daqui a um ano).

## 1. Visão geral: o que é um gerador de site estático

O Astro é um **SSG** (*static site generator*). Ele lê os arquivos Markdown e os componentes uma única vez, no momento do *build*, e gera **arquivos HTML prontos** em `dist/`. O GitHub Pages só entrega esses arquivos. Não existe servidor rodando código, banco de dados ou painel de administração. Consequências:

- **Segurança:** não há o que invadir no servidor; o pior caso é alguém alterar o repositório (proteja a conta com 2FA).
- **Desempenho:** o navegador recebe HTML e CSS prontos; JavaScript só é carregado na página de busca.
- **Custo zero e portabilidade:** `dist/` funciona em qualquer hospedagem estática (GitHub Pages, Codeberg Pages, Netlify, Cloudflare Pages, um pendrive).

```
src/content/*.md ──► schema (content.config.ts) ──► páginas (src/pages) ──► dist/*.html ──► Pagefind ──► GitHub Pages
      ▲                     valida campos               usam componentes        HTML pronto     índice de busca
   você escreve           (erro = build falha)        (src/components)
```

## 2. Por que Astro (e não trocar)

A V2 já usava Astro. A auditoria avaliou trocar por Eleventy ou Hugo e concluiu que **não há ganho que justifique reescrever**:

| Critério | Como o Astro atende |
|---|---|
| Markdown + validação | *Content collections* com schema Zod: um campo errado para o build com mensagem clara |
| Zero JS por padrão | Componentes `.astro` viram HTML puro |
| Imagens | `astro:assets` gera AVIF/WebP em vários tamanhos automaticamente |
| RSS, sitemap | Integrações oficiais |
| GitHub Pages | Ação oficial `withastro/action` |
| Manutenção | Projeto ativo, documentação em `docs.astro.build`, guias de atualização por versão |

Dependências foram mantidas no mínimo: Astro, RSS, sitemap, processador Markdown, fontes auto-hospedadas (Fontsource) e, só para desenvolvimento, `@astrojs/check`, `typescript` e `pagefind`.

## 3. Estrutura de diretórios

```
site/
├── .github/workflows/deploy.yml   automação: verificar → publicar
├── astro.config.mjs               endereço, integrações, Markdown
├── package.json / package-lock.json  dependências e comandos
├── tsconfig.json                  configuração do TypeScript (usada pelo astro check)
├── public/                        copiado sem alteração para dist/
│   ├── mascote/                   8 poses (400/800 px, WebP com transparência) + avatar
│   ├── downloads/                 arquivos baixáveis do ARSENAL
│   └── img/og.jpg, logo.svg, favicon.svg
├── scripts/
│   ├── novo.mjs                   cria texto novo
│   └── verificar-links.mjs        confere links internos de dist/
├── src/
│   ├── config.ts                  ★ nomes, menus, seções, categorias, mascotes, utilitários
│   ├── content.config.ts          ★ schemas das coleções (campos aceitos em cada .md)
│   ├── content/                   ★ CONTEÚDO (o que você edita no dia a dia)
│   │   ├── textos/                publicações do blog
│   │   ├── paginas/               sobre, manifesto, licencas (cada .md vira /<nome>/)
│   │   ├── ferramentas/           itens do ARSENAL
│   │   └── institucional/         links restritos do COFRE
│   ├── assets/                    imagens otimizadas pelo Astro (hero, capas, imagens de texto)
│   ├── layouts/Base.astro         <head> (SEO, Open Graph, JSON-LD), cabeçalho, rodapé
│   ├── components/                peças reutilizáveis (abaixo)
│   ├── pages/                     cada arquivo = uma rota
│   └── styles/global.css          identidade visual (tokens no :root)
└── docs/                          esta documentação
```

### Rotas (`src/pages/`)

| Arquivo | Endereço | Observação |
|---|---|---|
| `index.astro` | `/` | Terminal Central: destaque, painel de atalhos, últimas transmissões, perfil |
| `textos/index.astro` | `/textos/` | Arquivo completo + índice de etiquetas |
| `textos/[slug].astro` | `/textos/<arquivo>/` | Uma página por `.md`; `[slug]` = rota dinâmica gerada em `getStaticPaths()` |
| `categoria/[cat].astro` | `/categoria/<chave>/` | Uma por categoria de `config.ts` |
| `tags/[tag].astro` | `/tags/<etiqueta>/` | Gerada a partir das `tags` usadas |
| `[pagina].astro` | `/<nome>/` | Uma por arquivo de `content/paginas/` |
| `ferramentas.astro`, `institucional.astro`, `busca.astro`, `404.astro` | — | Seções fixas |
| `rss.xml.js`, `robots.txt.ts` | — | *Endpoints*: geram arquivos não-HTML |

### Componentes (`src/components/`)

| Componente | Função |
|---|---|
| `Header`, `Footer` | Navegação HUD e rodapé (lidos de `SECOES`/`NAV`) |
| `CabecalhoSecao` | Rótulo + título-fantasia + descrição + mascote da seção |
| `Mascote` | `<img>` de mascote com `width/height` corretos e versão 2x para telas densas |
| `Card` | Cartão de texto (capa ou mascote da categoria) |
| `Selo` | Etiqueta de classificação/status (`[ACESSO RESTRITO]`, `EXTERNO ↗`…) |
| `FiltroTemas` | Chips de categorias + atalho para busca |
| `Relacionados` | Até 3 textos por afinidade (tags valem 2, mesma categoria vale 1) |
| `Perfil` | Lateral da home com dados e "telemetria" de textos por tema |

## 4. Conteúdo: como o Markdown vira página

1. `content.config.ts` declara cada coleção com `glob()` (quais arquivos ler; os que começam com `_` são ignorados) e um **schema** Zod (quais campos são aceitos e de que tipo).
2. No build, cada `.md` é validado. Campo obrigatório faltando, categoria inexistente, URL sem `https://` ou capa sem `capaAlt` → o build para e diz arquivo e campo. É isso que impede publicar algo quebrado.
3. As páginas chamam `getCollection('textos')` (lista) e `render(entry)` (converte o Markdown em HTML).
4. O Markdown é processado pelo pipeline **unified** (remark/rehype), configurado em `astro.config.mjs`: suporta GFM (tabelas, notas de rodapé) — o mesmo dialeto do Obsidian e do GitHub. O Astro 7 tem um processador padrão novo (Sätteri); mantivemos o unified para garantir compatibilidade total com os textos existentes e com os rótulos em português das notas.

**Para publicar não é preciso tocar em código**: criar um `.md` na pasta certa basta. Novas categorias ou seções são editadas só em `config.ts`.

## 5. SEO e compartilhamento

- `Base.astro` gera `title`, `description`, `canonical`, Open Graph e Twitter Card em todas as páginas.
- Em textos, também `og:type=article`, `article:published_time/modified_time/section/tag` e **JSON-LD `BlogPosting`** (dados estruturados lidos pelo Google).
- `og:image` é a capa do texto recortada em 1200×630 (ou `public/img/og.jpg`).
- `sitemap-index.xml` (sem `/institucional/`), `rss.xml` (com categorias e tags) e `robots.txt`.
- `/institucional/` usa `noindex`. Ela **não** é bloqueada no `robots.txt` de propósito: se fosse, o buscador não leria o `noindex` e poderia listar o endereço mesmo assim.

## 6. Busca (Pagefind)

O Pagefind roda **depois** do `astro build` (`pagefind --site dist`), lê o HTML gerado e cria um índice compacto em `dist/pagefind/`. Só o conteúdo marcado com `data-pagefind-body` (o artigo) é indexado; o tema vira filtro via `data-pagefind-filter="tema"`. No navegador, a página `/busca/` baixa apenas os pedaços do índice necessários. Funciona sem servidor. Aceita links do tipo `/busca/?q=termo`.

Limitação: em `npm run dev` o índice não existe; use `npm run build && npm run preview`.

## 7. Identidade visual

- Tokens de cor e fonte no `:root` de `global.css` (paleta de referência: asfalto `#121415`, oliva `#354228`, vermelho `#9E1B1B`, ciano `#4DEEEA`, laranja `#C87A43`, concreto `#D9D9D9`; mais `--verde-sinal` para leituras de dados).
- Tipografia: **Black Ops One** só em títulos curtos; **Rajdhani** na interface; **Share Tech Mono** em rótulos, metadados e HUD; **fonte do sistema** no corpo dos textos (leitura longa).
- Componentes: placas com cantos chanfrados, blockquote "TRANSMISSÃO INTERCEPTADA", HUD de metadados no texto, selos de classificação, faixas vermelho/ciano no cabeçalho e rodapé, hover ciano discreto.
- Movimento: só transições curtas; `prefers-reduced-motion` desliga todas.
- Mascotes: cada seção e cada tema tem uma pose (`SECOES`/`CATEGORIAS` em `config.ts`).

## 8. Verificação e publicação

`npm run verificar` = `astro check` (tipos) → `npm run build` (site + busca) → `scripts/verificar-links.mjs` (links internos, respeitando o `BASE`).

O workflow `.github/workflows/deploy.yml`:
1. Calcula `SITE` e `BASE` a partir do nome do repositório (ou da variável `SITE_URL`, para domínio próprio).
2. `withastro/action@v6` instala com `npm ci` (Node 24) e roda `npm run verificar`.
3. Se tudo passar, `actions/deploy-pages@v5` publica. **Se algo falhar, nada é publicado** e o site anterior continua no ar.

## 9. Manutenção futura

- **Atualizações menores:** `npm update && npm run verificar`. Se passar, commit.
- **Versões principais do Astro:** uma por vez, num commit próprio, seguindo `docs.astro.build/en/guides/upgrade-to/vN/`. Foi assim que a V2 passou de 5.18 → 6.4 → 7.4 (veja o CHANGELOG); `git revert` desfaz se necessário.
- **Ações do GitHub:** verifique a cada ano se há versões novas de `withastro/action`, `actions/checkout` e `actions/deploy-pages`.
- **Próximos passos possíveis (P3):** paginação de `/textos/` quando passar de ~20 textos; mapas SVG/cartografia nos textos; modo de leitura; newsletter própria em vez do Substack.
