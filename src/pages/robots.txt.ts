import type { APIRoute } from 'astro';
// A página institucional NÃO é bloqueada aqui de propósito: ela usa <meta name="robots" content="noindex">,
// e o buscador só consegue ler esse aviso se puder acessar a página. Ela também fica fora do sitemap.
export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL(`${base}/sitemap-index.xml`, site)}\n`);
};
