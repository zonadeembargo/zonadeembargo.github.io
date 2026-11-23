import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE, CATEGORIAS } from '../config';

export async function GET(context) {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const textos = (await getCollection('textos', ({ data }) => !data.rascunho))
    .sort((a, b) => b.data.data.valueOf() - a.data.data.valueOf());
  return rss({
    title: SITE.projeto,
    description: SITE.descricao,
    site: context.site,
    items: textos.map((t) => ({
      title: t.data.titulo,
      pubDate: t.data.data,
      description: t.data.resumo,
      link: `${base}/textos/${t.id}/`,
      categories: [CATEGORIAS[t.data.categoria].rotulo, ...t.data.tags],
    })),
    customData: '<language>pt-br</language>',
  });
}
