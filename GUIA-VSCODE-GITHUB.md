# Guia: ver o site no VS Code e subir para o GitHub

Duas etapas: **(A)** ver o site funcionando no seu computador; **(B)** enviá-lo ao GitHub para que fique na internet. Os comandos abaixo assumem o BigLinux (base Arch/Manjaro); em outra distribuição, só muda o comando de instalação.

## A. Ver o site no VS Code

### A1. Instalar o que falta (uma vez)

No terminal:

```bash
sudo pacman -S nodejs npm git
node -v      # precisa mostrar v22.12 ou superior
git --version
```

O VS Code pode ser instalado pelo gerenciador de programas (Pamac: procure "Visual Studio Code") ou pelo site code.visualstudio.com.

### A2. Abrir o projeto

1. Descompacte `site-pessoal.zip`. Surge a pasta `site`.
2. No VS Code: **File → Open Folder…** e escolha a pasta `site`. Se perguntar "Do you trust the authors?", clique em *Yes*.
3. Extensões recomendadas (ícone de quadradinhos na barra lateral, ou `Ctrl+Shift+X`):
   - **Astro** (publicada por *astro-build*): realça o código do site.
   - **Markdown All in One** (opcional): atalhos e pré-visualização de textos.

### A3. Rodar o site

1. Abra o terminal do VS Code: **Terminal → New Terminal** (`Ctrl+Shift+'`). Ele já abre dentro da pasta do projeto.
2. Instale as dependências (só na primeira vez; leva 1 a 2 minutos):

   ```bash
   npm install
   ```

3. Inicie o site:

   ```bash
   npm run dev
   ```

4. O terminal mostra `http://localhost:4321/`. Segure `Ctrl` e clique no endereço (ou abra-o no navegador).
5. **Teste:** abra `src/config.ts`, troque `projeto: 'Zona de Embargo'` por outro nome e salve (`Ctrl+S`). A página atualiza sozinha.
6. Para parar: clique no terminal e aperte `Ctrl+C`.

No modo `npm run dev`, textos com `rascunho: true` aparecem (com um aviso). No site publicado, não.

### A4. Ver exatamente como será o site publicado (opcional)

```bash
npm run build      # gera a versão final e aponta erros
npm run preview    # mostra essa versão em http://localhost:4321/
```

Se `build` terminar com "Complete!" e sem erros, o GitHub também conseguirá publicar.

## B. Subir para o GitHub

### B1. Antes de subir

- Revise o checklist da seção 10 do `MANUAL.md` (nome do projeto, apagar exemplos, links do Substack e apoio).
- Não deixe no projeto nada que não possa ficar público: o repositório será **público**, porque o GitHub Pages gratuito exige isso.

### B2. Configurar o Git (uma vez)

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu-email@exemplo.org"
git config --global init.defaultBranch main
```

Para não expor o e-mail pessoal nos commits, no GitHub abra *Settings → Emails*, marque *Keep my email addresses private* e use o endereço `...@users.noreply.github.com` que aparece lá.

### B3. Criar a conta e o repositório

1. Crie a conta em github.com e confirme o e-mail. Ative a verificação em duas etapas (*Settings → Password and authentication*).
2. **Caminho adotado: organização `zonadeembargo`** → o site fica em `https://zonadeembargo.github.io/`.
   - Crie a organização (gratuita) em <https://github.com/account/organizations/new?plan=free>: nome `zonadeembargo`, plano *Free*, "pertence à minha conta pessoal".
   - Dentro dela, crie o repositório **`zonadeembargo.github.io`**, público e **vazio** (sem README, sem .gitignore, sem licença).
   - O workflow reconhece esse formato (`DONO.github.io`) e publica na raiz, sem subpasta.
   - Outras possibilidades, se um dia mudar: repositório comum na conta pessoal (`SEU-USUARIO.github.io/nome-do-repo/`) ou domínio próprio (MANUAL, seção 3).

### B4. Enviar pelo VS Code (caminho mais simples)

A pasta `site/` **já é um repositório Git**, com o histórico da evolução (veja `git log` ou a aba *Source Control → Graph*). Não clique em *Initialize Repository*.

1. Abra a aba **Source Control** (`Ctrl+Shift+G`).
2. Clique em **Publish Branch** (ou "Publish to GitHub"). O VS Code pede para entrar no GitHub pelo navegador; autorize.
3. Escolha o nome do repositório e **Public**.

**Alternativa por terminal** (depois de criar o repositório **vazio** em github.com → *New*, sem README):

```bash
git remote add origin https://github.com/zonadeembargo/zonadeembargo.github.io.git
git push -u origin main
```

- `git remote add origin URL`: registra o endereço do GitHub com o apelido `origin`. Confira com `git remote -v`.
- `git push -u origin main`: envia o ramo `main` para `origin`; o `-u` memoriza a ligação, e nas próximas vezes basta `git push`.
- Resultado esperado: a página do repositório mostra os arquivos e, em *Commits*, todo o histórico.

> **E-mail nos commits.** Os commits locais foram feitos com o e-mail configurado nesta pasta (`git config user.email`). Se quiser usar o endereço privado `...@users.noreply.github.com` (B2) **antes do primeiro push**, rode `git config user.email "SEU@users.noreply.github.com"` e depois `git rebase --root --exec "git commit --amend --no-edit --reset-author"` para regravar os commits com o novo e-mail.

(O GitHub pede login; use o navegador ou um *Personal Access Token* como senha.)

### B5. Ligar o GitHub Pages

1. No repositório: **Settings → Pages**.
2. Em *Build and deployment → Source*, escolha **GitHub Actions**.
3. Abra a aba **Actions**. Se a execução inicial falhou porque o Pages ainda não estava ligado, clique nela e depois em **Re-run all jobs** (ou *Run workflow*).
4. Aguarde o ✔ verde (1 a 3 minutos). O endereço aparece em *Settings → Pages* e no resumo da Action.

### B6. Conferir

- Abra o endereço. Teste o menu, um texto e o celular.
- Algo quebrado? Veja a seção 9 do `MANUAL.md` (problemas comuns).

## C. Rotina depois da primeira vez

1. Abra a pasta no VS Code e (se quiser ver antes) rode `npm run dev`. Antes de enviar mudanças de código ou configuração, rode `npm run verificar`.
2. Crie ou edite os arquivos (por exemplo, um texto novo em `src/content/textos/`).
3. **Source Control** → escreva uma mensagem curta (ex.: `novo texto sobre X`) → **Commit** → **Sync Changes** (ou *Push*).
4. Em 1 a 3 minutos o site está atualizado. Para republicar no Substack, siga a seção 4 do `MANUAL.md`.

## D. Problemas frequentes

| Sintoma | O que fazer |
|---|---|
| `node: command not found` | Refaça A1; feche e reabra o terminal |
| `npm install` dá erro de permissão (EACCES) | Não use `sudo` com `npm`. Confirme que a pasta é sua e rode de novo |
| "Port 4321 is already in use" | Já há um `npm run dev` aberto em outro terminal; feche-o (`Ctrl+C`) |
| O VS Code não pede login do GitHub | Use a alternativa por terminal (B4) |
| `git push` rejeitado | O repositório do GitHub já tem arquivos (ex.: um README criado lá). Crie-o vazio ou rode `git pull --rebase origin main` e tente de novo |
| Action falha com erro de conteúdo | Leia a mensagem: ela aponta o arquivo e o campo (geralmente o cabeçalho de um texto) |
| Action falha em "link interno quebrado" | O verificador achou um link para página inexistente; a mensagem mostra qual. Nada foi publicado: o site antigo continua no ar |
| Site abre sem estilo ou imagens | Confirme *Source: GitHub Actions* em Settings → Pages e rode a Action de novo |
