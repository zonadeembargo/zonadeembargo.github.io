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
};

// Seções do site: NOME DE FANTASIA (rotulo) + nome convencional (sub, aparece pequeno
// abaixo). Para trocar um nome, edite só aqui. href sem barra inicial.
export const SECOES = {
  inicio:        { rotulo: 'TERMINAL',     sub: 'Início',               href: '' },
  textos:        { rotulo: 'TRANSMISSÕES', sub: 'Textos',               href: 'textos/' },
  ferramentas:   { rotulo: 'ARSENAL',      sub: 'Ferramentas',          href: 'ferramentas/' },
  sobre:         { rotulo: 'DOSSIÊ',       sub: 'Sobre',                href: 'sobre/' },
  institucional: { rotulo: 'COFRE',        sub: 'Acesso institucional', href: 'institucional/' },
  licencas:      { rotulo: 'LICENÇAS',     sub: 'Direitos e uso',       href: 'licencas/' },
} as const;

// Menu principal (ordem de exibição). A seção "institucional" fica só no rodapé.
export const NAV = [SECOES.inicio, SECOES.textos, SECOES.ferramentas, SECOES.sobre];

// Categorias dos textos (as "tags" do sistema). A CHAVE (cartografia, cronicas, tecno)
// é o que se escreve no campo "categoria" do texto. Rótulo, descrição e cor mudam à vontade.
// cor: laranja | ciano | vermelho | oliva     mascote: tutor | guia | escritor | tira-duvidas
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

// ---- utilitários (não precisa editar) ----
export const u = (p = '') => `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${p.replace(/^\//, '')}`;
export const dataBR = (d: Date) =>
  new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long', timeZone: 'UTC' }).format(d);
