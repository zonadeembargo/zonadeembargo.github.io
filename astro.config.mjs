// Configuração de publicação. Em geral NÃO precisa editar: o deploy automático
// (GitHub Actions) preenche SITE e BASE sozinho. Detalhes no MANUAL.md.
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: process.env.SITE || 'http://localhost:4321',
  base: process.env.BASE || '/',
  trailingSlash: 'always',
  integrations: [sitemap({ filter: (pagina) => !pagina.includes('/institucional/') })],
});
