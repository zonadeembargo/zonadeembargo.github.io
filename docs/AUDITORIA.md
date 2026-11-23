# Auditoria automática — 2026-11-22

Versão auditada: V2.1 (Astro 7.4), build local servido por `astro preview`.

## Método

O Lighthouse precisa do Chrome instalado e não havia um na máquina. A auditoria foi feita assim:

- **Acessibilidade:** [axe-core](https://github.com/dequelabs/axe-core) 4.11 (o mesmo motor que o Lighthouse usa), injetado em cada página no navegador. Regras: WCAG 2.0/2.1/2.2 nível A e AA, mais boas práticas. 13 páginas, incluindo a busca com resultados.
- **Contraste do cabeçalho:** calculado à mão pela fórmula WCAG, porque a textura de ruído (`.topo::before`) impede o axe de medir.
- **Desempenho:** API de performance do navegador (LCP, CLS, peso de HTML/CSS/JS/imagens), com um segundo servidor em outra porta para simular a primeira visita, sem cache.
- **Teclado:** navegação por Tab, com conferência do "pular para o conteúdo" e do contorno de foco.

## Resultados

| Item | Antes | Depois |
|---|---|---|
| Violações axe (13 páginas) | 6 (5 moderadas, 1 crítica) | **0** |
| Contraste de "ZONA DE EMBARGO" no cabeçalho | 3,3–4,2 (reprovado) | 4,6+ (AA) |
| Contraste dos subtítulos do menu | 4,46 no pior ponto | ~5,0 |
| JavaScript nas páginas (fora da busca) | 0 KB | 0 KB |
| HTML por página | 4–8 KB | 4–8 KB |
| JS da busca (Pagefind) | 180 KB, só em `/busca/` | igual |
| LCP local | < 100 ms | < 100 ms |

### Problemas encontrados e correções

1. **Ordem dos títulos (moderado):** listas de textos e do PAIOL pulavam de `<h1>` para `<h3>`. O `Card` ganhou a prop `nivel` (h2 em listas, h3 na home, onde há um h2 de seção antes), e os itens do PAIOL e do COFRE passaram a `<h2>`. O exemplo `exemplo-tecno.md` usava `###` logo após o título e foi trocado por `##`.
2. **Filtro da busca sem nome (crítico):** o componente do Pagefind cria um botão `role="combobox"` cujo texto "Tema" não é lido como nome. A página `/busca/` agora aplica `aria-label="Filtrar por tema"` assim que o botão aparece. O defeito é do Pagefind 1.6 e vale reportar ao projeto.
3. **Contraste no cabeçalho metálico:** criado o token `--laranja-claro: #e0975f`, usado só no nome do projeto sobre a placa (o laranja original continua no resto do site, onde passa com 5,6). Os subtítulos do menu ficaram um pouco mais claros.
4. **Fontes "pulando":** as quatro fontes usadas acima da dobra passaram a ser pré-carregadas (`<link rel="preload">`, mesmos arquivos do CSS, sem download duplicado).

### Observação sobre o CLS medido

O navegador embutido registrou saltos de layout de 0,4 a 1,0 na primeira visita, mas todos **antes da primeira pintura** (27–35 ms, contra a pintura em 56–64 ms), com o CSS marcado como bloqueante. Ninguém vê esses saltos: é um artefato da medição. A medição oficial de CLS deve ser feita com o Lighthouse ou o PageSpeed Insights depois da publicação.

## Pendências

- Rodar o **PageSpeed Insights** em <https://pagespeed.web.dev/analysis?url=https://zonadeembargo.github.io/> (mede com o Chrome real e rede móvel simulada). Em 2026-11-23 a API gratuita estava sem cota, então a medição ficou para ser feita pelo navegador.
- Conferido no ar em 2026-11-23: rotas principais (200), página 404, RSS, imagem de compartilhamento, `canonical` e busca (`/busca/?q=colapso` → 1 resultado).
- Repetir esta auditoria sempre que houver mudança de layout ou componentes novos.
