import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { CHAVES } from './config';

// Arquivos cujo nome começa com "_" são ignorados (servem de modelo).
const padrao = '**/[^_]*.md';

const textos = defineCollection({
  loader: glob({ pattern: padrao, base: './src/content/textos' }),
  schema: ({ image }) => z.object({
    titulo: z.string(),
    resumo: z.string(),
    data: z.coerce.date(),
    categoria: z.enum(CHAVES),
    capa: image().optional(),
    atualizado: z.coerce.date().optional(),
    substack: z.string().url().optional(), // endereço da cópia no Substack (opcional)
    rascunho: z.boolean().default(false),
  }),
});

const ferramentas = defineCollection({
  loader: glob({ pattern: padrao, base: './src/content/ferramentas' }),
  schema: z.object({
    nome: z.string(),
    resumo: z.string(),
    url: z.string(),
    tipo: z.string().default('Ferramenta'),
    licenca: z.string().default('Livre'),
    versao: z.string().optional(),
    rascunho: z.boolean().default(false),
  }),
});

const institucional = defineCollection({
  loader: glob({ pattern: padrao, base: './src/content/institucional' }),
  schema: z.object({
    nome: z.string(),
    resumo: z.string(),
    url: z.string(),
    rascunho: z.boolean().default(false),
  }),
});

const paginas = defineCollection({
  loader: glob({ pattern: padrao, base: './src/content/paginas' }),
  schema: z.object({ titulo: z.string(), sub: z.string().optional() }),
});

export const collections = { textos, ferramentas, institucional, paginas };
