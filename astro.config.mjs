// Configuração de publicação. Em geral NÃO precisa editar: o deploy automático
// (GitHub Actions) preenche SITE e BASE sozinho. Detalhes no MANUAL.md.
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';

export default defineConfig({
  site: process.env.SITE || 'http://localhost:4321',
  base: process.env.BASE || '/',
  trailingSlash: 'always',
  // Markdown pelo processador remark/rehype (o mesmo do Obsidian/GFM: tabelas, notas de rodapé).
  // Notas de rodapé ([^1]) com rótulos em português.
  markdown: {
    processor: unified({ remarkRehype: { footnoteLabel: 'Notas', footnoteBackLabel: 'Voltar ao texto' } }),
  },
  integrations: [sitemap({ filter: (pagina) => !pagina.includes('/institucional/') })],
});
