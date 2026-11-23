# Manual do site

Este manual cobre tudo, da primeira publicação à rotina de atualização. Foi escrito para exigir o mínimo de conhecimento técnico: **um texto novo é um arquivo de texto; publicar é salvar o arquivo**.

## 1. Como o site funciona (em 30 segundos)

- Cada texto é um arquivo `.md` (Markdown, texto simples com marcações) na pasta `src/content/textos/`.
- Ao salvar o arquivo no GitHub, uma automação **monta o site e publica sozinha**, em 1 a 3 minutos.
- Não há banco de dados, painel de administração nem servidor para manter. O GitHub guarda tudo (e serve de backup).

## 2. Mapa das pastas

| Onde | O que é | Você edita? |
|---|---|---|
| `src/content/textos/` | Os textos do site (um arquivo por texto) | **Sempre** |
| `src/content/paginas/` | Páginas simples: `sobre.md` (Dossiê) e `licencas.md`. Um arquivo novo aqui vira uma página nova em `/nome/` | Às vezes |
| `src/content/ferramentas/` | Ferramentas de download livre (um arquivo por item) | Às vezes |
| `src/content/institucional/` | Links de acesso restrito (um arquivo por item) | Raramente |
| `src/assets/textos/` | Imagens usadas dentro dos textos | Ao ilustrar |
| `src/config.ts` | **Nome do site, menus, categorias, links (Substack, apoio), licença, aviso** | Raramente |
| `src/styles/global.css` | Cores e aparência (variáveis no topo do arquivo) | Quase nunca |
| `public/` | Logo, favicon, mascotes, imagem do topo (`img/hero.webp`) e de compartilhamento (`img/og.jpg`) | Quase nunca |
| `.github/workflows/deploy.yml` | A automação de publicação | **Não mexer** |

Arquivos cujo nome começa com `_` (como `_modelo.md`) **não aparecem no site**: servem de modelo para copiar.

## 3. Primeira publicação (uma vez só)

> Passo a passo ilustrado com o VS Code (ver o site no computador e enviar ao GitHub): **`GUIA-VSCODE-GITHUB.md`**. Esta seção resume o lado do GitHub.

1. Crie uma conta em github.com e um **repositório novo** (botão *New*). Pode ser público.
   - Para o endereço `https://SEU-USUARIO.github.io/`, o repositório deve se chamar exatamente `SEU-USUARIO.github.io`.
   - Com qualquer outro nome (ex.: `meu-site`), o endereço será `https://SEU-USUARIO.github.io/meu-site/`. Tudo funciona igual; os links se ajustam sozinhos.
2. Envie os arquivos deste projeto para o repositório. O caminho mais simples: na página do repositório, *Add file → Upload files* e arraste **o conteúdo** da pasta do projeto (não o `.zip`; a pasta oculta `.github` precisa ir junto). Se preferir Git no terminal: `git init`, `git add .`, `git commit -m "primeira versão"`, `git branch -M main`, `git remote add origin ENDERECO`, `git push -u origin main`.
3. No repositório: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Aba **Actions**: a publicação roda sozinha (círculo amarelo → ✔ verde). Ao terminar, o endereço aparece em Settings → Pages.
5. Abra o endereço e confira. Se der erro, veja a seção 9.

> O ramo principal precisa se chamar `main`, que é o nome padrão atual do GitHub.

### Domínio próprio (opcional)

1. Compre o domínio e, no painel dele, aponte para o GitHub Pages (a documentação do GitHub, "Configuring a custom domain for your GitHub Pages site", lista os registros DNS atuais).
2. Em Settings → Pages → *Custom domain*, informe o domínio.
3. Em Settings → *Secrets and variables → Actions → Variables*, crie a variável `SITE_URL` com o endereço completo (ex.: `https://meudominio.org`).
4. Crie na pasta `public/` um arquivo chamado `CNAME` contendo só o domínio (ex.: `meudominio.org`).

## 4. Rotina: publicar um texto novo

### Caminho A: pelo navegador (sem instalar nada)

1. No repositório, abra `src/content/textos/`.
2. *Add file → Create new file*. No nome, digite `titulo-do-texto.md` (sem acentos, sem espaços, com hifens: **o nome vira o endereço**: `/textos/titulo-do-texto/`).
3. Cole o modelo abaixo e escreva.
4. Clique em *Commit changes*. Em 1 a 3 minutos o texto está no ar.

### Caminho B: no computador (opcional)

Com o projeto instalado (seção 7): `npm run novo -- "Título do texto" cartografia` cria o arquivo já preenchido, como **rascunho**. Escreva, veja o resultado com `npm run dev` e, quando estiver pronto, troque `rascunho: true` por `rascunho: false` e envie ao GitHub.

### O cabeçalho do texto

```md
---
titulo: "Título do texto"
resumo: "Uma ou duas frases: aparecem no card, no Google e nas redes."
data: 2026-11-05
categoria: cartografia
---

Aqui começa o texto.
```

| Campo | Obrigatório | Observação |
|---|---|---|
| `titulo` | sim | Entre aspas |
| `resumo` | sim | Entre aspas; até ~160 caracteres |
| `data` | sim | `aaaa-mm-dd` |
| `categoria` | sim | `cartografia`, `tecno`, `cronicas` ou `tecno` |
| `rascunho` | não | `true` = não publica (aparece só no `npm run dev`) |
| `atualizado` | não | `aaaa-mm-dd`; mostra "atualizado em" |
| `substack` | não | Endereço da cópia no Substack; mostra "Também no Substack" |
| `capa` | não | Imagem do card e do topo do texto (veja abaixo) |

> **Cuidado com as aspas.** Se o título tiver dois-pontos ou aspas, mantenha o título inteiro entre aspas duplas. Um erro no cabeçalho faz a publicação falhar (a aba *Actions* mostra o arquivo e a linha com problema).

### Escrever (Markdown mínimo)

```md
## Subtítulo
### Sub-subtítulo
Texto com *itálico*, **negrito** e [um link](https://endereco.org).

- item de lista
- outro item

> Citação ou trecho de fonte.
> FONTE: documento, órgão, data de acesso.

---   (linha divisória)
```

Os arquivos `exemplo-*.md` mostram tabelas, listas e imagens funcionando. **Apague-os** quando publicar o primeiro texto real.

### Imagens dentro do texto e capa

1. Coloque o arquivo em `src/assets/textos/` (no GitHub: *Add file → Upload files*). Nome sem acentos nem espaços. JPG, PNG ou WebP.
2. No texto: `![Descrição do que a imagem mostra](../../assets/textos/mapa-exemplo.jpg)`. A descrição é lida por leitores de tela, então escreva-a sempre.
3. Para capa, no cabeçalho: `capa: ../../assets/textos/mapa-exemplo.jpg`.

O site reduz e converte as imagens automaticamente. Mesmo assim, não envie arquivos acima de ~3 MB. Sem `capa`, o card usa o mascote da categoria.

### Republicar no Substack (o site é a versão canônica)

Regra: **o texto nasce no site; o Substack recebe uma cópia**. Assim a versão de referência, o arquivo e a licença ficam com você.

1. Publique primeiro no site e espere a Action ficar verde (✔).
2. Abra o texto publicado, selecione do título até o fim da página do texto e copie (Ctrl+C).
3. No Substack, crie um post novo e cole. Títulos, listas e links são mantidos; as imagens são reenviadas pelo próprio Substack se necessário.
4. O fim do texto já traz a linha **"Publicado originalmente em [endereço]"** e a licença. Mantenha-a: é ela que identifica a versão canônica.
5. Publique/agende o e-mail no Substack.
6. (Opcional) Copie o endereço do post do Substack para o campo `substack:` do texto no site.

**Correções:** edite **sempre o site primeiro**; depois repita a edição no Substack. Nunca corrija só no Substack, senão as versões divergem.

**Lista de assinantes:** exporte-a (CSV) a cada mês e guarde fora do Substack. É o único dado que você não controla.

### Corrigir, atualizar ou apagar

- **Corrigir:** abra o arquivo no GitHub, ícone de lápis, edite, *Commit changes*. Se a mudança for relevante, preencha `atualizado:`.
- **Despublicar sem apagar:** coloque `rascunho: true`.
- **Apagar:** abra o arquivo, ícone de lixeira, *Commit*. O endereço antigo deixará de existir; se já foi compartilhado, prefira despublicar.
- **Desfazer erro:** o GitHub guarda o histórico. Em *History* do arquivo, é possível restaurar a versão anterior.

## 5. Editar o resto do site

### Nome do site, menus, categorias, links

Tudo em `src/config.ts`, com comentários. Principais campos:

- `SITE.projeto`: nome do projeto (**hoje é provisório**). `SITE.nome`: seu nome no cabeçalho.
- `SITE.substack`: endereço do Substack. Preenchido, aparece o botão **Assinar**; vazio, ele some.
- `SITE.apoio`: link de apoio voluntário. Preenchido, aparece **Apoiar** na lateral; vazio, some.
- `SITE.aviso`, `SITE.licenca` e `SITE.licencaCodigo`: textos do rodapé e da página Licenças.
- `NAV`: itens do menu. `CATEGORIAS`: nomes, descrições, cores e mascote de cada tema.

> **Para criar uma categoria nova:** adicione-a em `CATEGORIAS`. Para renomear só o que aparece na tela, mude `rotulo`. **Não mude a chave** (`cartografia`, `tecno`...) sem atualizar o campo `categoria` dos textos já escritos.

### Nomes das seções (fantasia + nome convencional)

O menu mostra o nome de fantasia e, pequeno abaixo, o nome convencional. Tudo em `SECOES`, no `src/config.ts`:

| Fantasia | Convencional | Endereço |
|---|---|---|
| TERMINAL | Início | `/` |
| TRANSMISSÕES | Textos | `/textos/` |
| ARSENAL | Ferramentas | `/ferramentas/` |
| DOSSIÊ | Sobre | `/sobre/` |
| COFRE | Acesso institucional (só no rodapé) | `/institucional/` |
| LICENÇAS | Direitos e uso (rodapé) | `/licencas/` |

Para trocar, por exemplo, DOSSIÊ por MANIFESTO: mude `rotulo: 'DOSSIÊ'` para `rotulo: 'MANIFESTO'`. O endereço (`/sobre/`) é o nome do arquivo e não muda. O título que aparece na própria página Sobre vem do campo `titulo` em `src/content/paginas/sobre.md`.

### Página "Sobre" e outras páginas simples

Edite `src/content/paginas/sobre.md` (Markdown; campos `titulo` e `sub` no cabeçalho). Para uma página nova (ex.: "Contato"), crie `src/content/paginas/contato.md` com `titulo`; ela aparece em `/contato/`. Para ela entrar no menu, adicione um item em `SECOES` e `NAV`, em `src/config.ts`.

### Ferramentas livres

Um arquivo por ferramenta em `src/content/ferramentas/`. Copie `exemplo-ferramenta.md`, renomeie e preencha `nome`, `resumo`, `url`, `tipo`, `licenca`, `versao`. Para retirar uma ferramenta, apague o arquivo ou use `rascunho: true`. O `url` pode ser um link de *Releases* do GitHub (recomendado, pois mantém histórico de versões).

### Acesso institucional (links restritos)

Fica em página separada (`/institucional/`), fora do menu principal e do sitemap, com aviso de que o login é esperado. Um arquivo por item em `src/content/institucional/`: copie `modelo-oculto.md`, preencha e retire `rascunho: true`.

**Cuidados:**

- O repositório é público: **título e descrição de cada item ficam visíveis** a qualquer pessoa. Use descrições genéricas e nunca coloque conteúdo sensível, nomes de documentos classificados ou dados pessoais.
- No SharePoint, gere o link como **"Pessoas da organização"** (não "Qualquer pessoa") e, se possível, com data de validade. O site não protege nada: **quem protege é o login da instituição**.
- Confirme com a chefia/jurídico se a instituição permite divulgar o *endereço* desses links.

### Cores e aparência

No início de `src/styles/global.css`, o bloco `:root` guarda as cores (`--ciano`, `--laranja`, `--vermelho`...). Mudar o valor ali muda o site todo. Mantenha contraste suficiente entre texto e fundo.

### Trocar as imagens fixas

| Arquivo (em `public/`) | Uso | Tamanho sugerido |
|---|---|---|
| `img/hero.webp` | Imagem do destaque na página inicial (a arte fica à direita; o lado esquerdo é espaço livre para o título) | 2400×740, WebP, até ~250 KB |
| `img/og.jpg` | Prévia ao compartilhar o link | 1200×630, JPG |
| `logo.svg` / `favicon.svg` | Selo do cabeçalho e ícone da aba | SVG |
| `mascote/avatar.webp` | Foto da lateral | 512×512, WebP |
| `mascote/mascote-*-400.webp` e `-800.webp` | Poses do mascote (cards, 404, fim de texto) | altura 400 e 800 px |

Basta substituir o arquivo mantendo o **mesmo nome**.

### Licenças adotadas

| Material | Licença |
|---|---|
| Textos, mapas, dados e imagens de conteúdo | CC BY-SA 4.0 |
| Código do site e das ferramentas | GPL-3.0 (AGPL-3.0 se algum dia virar serviço web) |
| Logo, mascote e nome | Todos os direitos reservados |

O resumo aparece no rodapé e a explicação completa em `/licencas/` (arquivo `src/content/paginas/licencas.md`). O texto da GPL está em `LICENSE` e o resumo por pasta em `LICENCAS.md`. Dados de terceiros mantêm a licença da fonte: cite-a ao lado do mapa ou da tabela. As ilustrações foram geradas com auxílio de IA; isso está declarado no rodapé.

## 6. Atualização rotineira, resumo

| Tarefa | Como | Tempo |
|---|---|---|
| Texto novo | Criar `.md` em `textos/` | 5 min + escrita |
| Corrigir texto | Editar o arquivo no GitHub | 2 min |
| Nova ferramenta | Copiar `exemplo-ferramenta.md` | 3 min |
| Republicar no Substack | Copiar do site e colar lá | 5 min |
| Trocar nome/menu | `src/config.ts` | 2 min |
| Conferir se publicou | Aba *Actions* (✔ verde) | 1 min |

## 7. Trabalhar no computador (opcional)

Útil para pré-visualizar antes de publicar.

1. Instale o **Node.js** (versão LTS) em nodejs.org.
2. Na pasta do projeto: `npm install` (uma vez).
3. `npm run dev` abre o site em `http://localhost:4321`, com **rascunhos visíveis** e atualização automática a cada salvamento.
4. `npm run build` gera a versão final em `dist/` (para testar se há erros).
5. Para enviar: use o GitHub Desktop, o Git no terminal ou o upload pelo navegador.

**Manutenção anual (10 minutos):** `npm update`, depois `npm run build`. Se compilar sem erros, envie o `package.json` e o `package-lock.json` atualizados. Se houver erro, desfaça a atualização: o histórico do GitHub permite restaurar os arquivos anteriores.

## 8. Backup e segurança

- O repositório do GitHub **é** o backup. Para uma cópia extra, use *Code → Download ZIP* a cada alguns meses e guarde fora do GitHub (HD externo, Nextcloud).
- Ative a verificação em duas etapas na conta do GitHub.
- Não publique no repositório: senhas, tokens, documentos internos, dados pessoais de terceiros, coordenadas de fiscalização em andamento ou qualquer informação sigilosa de trabalho.

## 9. Problemas comuns

| Sintoma | Causa provável | O que fazer |
|---|---|---|
| Aba *Actions* com ✖ vermelho | Erro no cabeçalho do texto ou imagem inexistente | Abra a execução e leia a mensagem: ela cita o arquivo e o campo |
| Texto não aparece | `rascunho: true`, ou nome do arquivo começa com `_` | Corrija; ou espere 3 min |
| Site sem estilo/imagens | Fonte do Pages não está em GitHub Actions | *Settings → Pages → Source: GitHub Actions* e rode a Action de novo (*Actions → Run workflow*) |
| Erro de categoria inválida | Categoria escrita diferente da chave em `config.ts` | Use exatamente `cartografia`, `tecno`, `cronicas` ou `tecno` |
| Imagem não carrega | Caminho errado ou nome com acento/espaço | Confira `../../assets/textos/` e o nome do arquivo (maiúsculas contam) |
| Prévia de link com imagem antiga | Cache da rede social | Use o depurador de links da própria rede |
| Página 404 no endereço | Primeira publicação ainda não terminou | Aguarde a Action e confira o Pages |

## 10. Checklist antes de divulgar o site

- [ ] Definir o **nome do projeto** (`SITE.projeto`) e conferir `SITE.nome`.
- [ ] Preencher `SITE.substack` e `SITE.apoio` (ou deixar vazios).
- [ ] Reescrever **Sobre** e apagar os `exemplo-*.md` e a ferramenta de exemplo.
- [ ] Conferir o aviso do rodapé e a página **Licenças** (CC BY-SA 4.0 / GPL-3.0 / direitos reservados para identidade).
- [ ] Conferir fontes e números de cada texto (registre fonte, data de acesso e método).
- [ ] Consultar a chefia/Comissão de Ética sobre manifestação pública, uso de farda/insígnias na imagem e divulgação de links institucionais.
- [ ] Confirmar a titularidade de ferramentas desenvolvidas no exercício do cargo antes de publicá-las sob licença livre.
- [ ] Abrir o site no celular e testar os links principais.

## 11. Decisões que ficaram abertas

1. **Nome do projeto** (provisório: "Zona de Embargo"). Alternativas: *Diário de Campo*, *Linha de Base*, *Carta de Campo*, *Território em Disputa*.
2. **Nome da seção restrita** (hoje COFRE). Alternativas: *Acesso Restrito*, *Câmara*, *Intranet*.

Já decididos: licenças (seção 5) e site como versão canônica, com cópia no Substack (seção 4).
