// ============================================================
//  CONFIGURAÇÃO DO SITE — edite aqui nomes, menus e categorias.
//  Tudo que aparece em mais de uma página vem deste arquivo.
// ============================================================

export const SITE = {
  nome: 'Gilberto Milhomem',          // aparece no cabeçalho (como na identidade visual)
  projeto: 'Zona de Embargo',         // NOME PROVISÓRIO do site/projeto — troque quando decidir
  slogan: 'Notas de campo sobre território, ambiente e colapso.',
  descricao: 'Textos, mapas e ferramentas livres sobre questões socioambientais no Brasil.',
  substack: '',   // endereço do Substack (https://...). Vazio = o botão "Assinar" some.
  apoio: '',      // link de apoio voluntário. Vazio = o botão "Apoiar" some.
  // Licenças (decisão: conteúdo e dados copyleft; código GPL; identidade reservada)
  licenca: 'CC BY-SA 4.0',
  licencaUrl: 'https://creativecommons.org/licenses/by-sa/4.0/deed.pt-br',
  licencaCodigo: 'GPL-3.0',
  licencaCodigoUrl: 'https://www.gnu.org/licenses/gpl-3.0.html',
  aviso: 'Conteúdo pessoal. As opiniões aqui expressas não representam as de nenhuma instituição.',
  perfil: { foco: 'Socioambiental · Cartografia', base: 'Brasil', acesso: 'Livre' },
  // Apresentação curta da página inicial (1 ou 2 frases). Vazio = o bloco some.
  apresentacao: 'Notas de campo de quem trabalha com território e ambiente: mapas, dados abertos, ferramentas livres e crítica do colapso em curso.',
  // Canais externos (rodapé e página inicial). Deixe a lista vazia para esconder.
  // Exemplo: { nome: 'Mastodon', url: 'https://...' }, { nome: 'GitHub', url: 'https://github.com/...' }
  canais: [] as { nome: string; url: string }[],
};

// Seções do site: NOME DE FANTASIA (rotulo) + nome convencional (sub, aparece pequeno
// abaixo). Para trocar um nome, edite só aqui. href sem barra inicial.
// mascote: pose que identifica a seção (arquivo public/mascote/mascote-<nome>-400.webp).
export const SECOES = {
  inicio:        { rotulo: 'TERMINAL',     sub: 'Início',               href: '',               mascote: 'apresentador' },
  textos:        { rotulo: 'TRANSMISSÕES', sub: 'Textos',               href: 'textos/',        mascote: 'leitor' },
  ferramentas:   { rotulo: 'ARSENAL',      sub: 'Ferramentas',          href: 'ferramentas/',   mascote: 'pesquisador' },
  sobre:         { rotulo: 'DOSSIÊ',       sub: 'Sobre',                href: 'sobre/',         mascote: 'tutor' },
  manifesto:     { rotulo: 'MANIFESTO',    sub: 'Princípios',           href: 'manifesto/',     mascote: 'escritor' },
  busca:         { rotulo: 'VARREDURA',    sub: 'Busca',                href: 'busca/',         mascote: 'pesquisador' },
  institucional: { rotulo: 'COFRE',        sub: 'Acesso institucional', href: 'institucional/', mascote: 'organizador' },
  licencas:      { rotulo: 'LICENÇAS',     sub: 'Direitos e uso',       href: 'licencas/',      mascote: 'tutor' },
} as const;

// Menu principal (ordem de exibição). A seção "institucional" fica só no rodapé.
export const NAV = [SECOES.inicio, SECOES.textos, SECOES.ferramentas, SECOES.sobre];

// Categorias dos textos (as "tags" do sistema). A CHAVE (cartografia, cronicas, tecno)
// é o que se escreve no campo "categoria" do texto. Rótulo, descrição e cor mudam à vontade.
// cor: laranja | ciano | vermelho | oliva     mascote: qualquer chave de MASCOTES (abaixo)
export const CATEGORIAS = {
  cartografia: { rotulo: 'CARTOGRAFIA DO COLAPSO', cor: 'laranja', mascote: 'guia',
    descricao: 'Território, conflitos socioambientais, mapas, dados e fiscalização.' },
  cronicas: { rotulo: 'CRÔNICAS DA EXAUSTÃO', cor: 'vermelho', mascote: 'escritor',
    descricao: 'Política, filosofia e diário de bordo do colapso.' },
  tecno: { rotulo: 'TECNO-RESISTÊNCIA', cor: 'ciano', mascote: 'tira-duvidas',
    descricao: 'Software livre, segurança e tecnologia a serviço do território.' },
} as const;
export type CategoriaChave = keyof typeof CATEGORIAS;
export const CHAVES = Object.keys(CATEGORIAS) as [CategoriaChave, ...CategoriaChave[]];

// Dimensões reais dos mascotes (versão 400). Evitam que a página "pule" ao carregar.
export const MASCOTES = {
  apresentador: [355, 400], escritor: [369, 400], guia: [237, 400], leitor: [371, 400],
  organizador: [267, 400], pesquisador: [304, 400], 'tira-duvidas': [279, 400], tutor: [296, 400],
} as const;
export type Mascote = keyof typeof MASCOTES;

// ---- utilitários (não precisa editar) ----
export const u = (p = '') => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${p.replace(/^\//, '')}`;
export const dataBR = (d: Date) =>
  new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long', timeZone: 'UTC' }).format(d);
// Tag -> trecho de URL ("Software Livre" -> "software-livre")
export const slug = (t: string) => t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
export const minutosLeitura = (texto = '') => Math.max(1, Math.round(texto.split(/\s+/).length / 200));
