import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { CHAVES, SITE } from './config';

// Arquivos cujo nome começa com "_" são ignorados (servem de modelo).
const padrao = '**/[^_]*.md';
// Endereço web válido, só http/https (bloqueia javascript:, data: etc.).
const link = () => z.url({ protocol: /^https?$/ });

const textos = defineCollection({
  loader: glob({ pattern: padrao, base: './src/content/textos' }),
  schema: ({ image }) => z.object({
    titulo: z.string(),
    resumo: z.string(),
    data: z.coerce.date(),
    categoria: z.enum(CHAVES),
    autor: z.string().default(SITE.nome),
    tags: z.array(z.string()).default([]),        // ex.: [Amazônia, dados abertos]
    capa: image().optional(),
    capaAlt: z.string().optional(),               // descrição da capa para leitores de tela
    destaque: z.boolean().default(false),         // true = vai para o topo da página inicial
    atualizado: z.coerce.date().optional(),
    substack: link().optional(),        // endereço da cópia no Substack (opcional)
    referencias: z.array(z.object({              // lista de fontes (opcional)
      titulo: z.string(),
      url: link().optional(),
    })).default([]),
    rascunho: z.boolean().default(false),
  }).refine((d) => !d.capa || d.capaAlt, { message: 'Texto com "capa" precisa de "capaAlt" (descrição da imagem).', path: ['capaAlt'] }),
});

const ferramentas = defineCollection({
  loader: glob({ pattern: padrao, base: './src/content/ferramentas' }),
  schema: z.object({
    nome: z.string(),
    resumo: z.string(),
    // Link externo (https://...) OU arquivo local em public/downloads/ (escreva "downloads/arquivo.zip")
    url: z.string().refine((v) => /^https:\/\//.test(v) || v.startsWith('downloads/'), 'Use https://... ou downloads/arquivo'),
    tipo: z.string().default('Ferramenta'),
    licenca: z.string().default('Livre'),
    versao: z.string().optional(),
    acesso: z.enum(['livre', 'login']).default('livre'), // login = precisa de conta no site de destino
    codigo: link().optional(),                 // repositório do código-fonte (opcional)
    rascunho: z.boolean().default(false),
  }),
});

const institucional = defineCollection({
  loader: glob({ pattern: padrao, base: './src/content/institucional' }),
  schema: z.object({
    nome: z.string(),
    resumo: z.string(),
    url: link(), // só o LINK; o documento fica no sistema da instituição
    rascunho: z.boolean().default(false),
  }),
});

const paginas = defineCollection({
  loader: glob({ pattern: padrao, base: './src/content/paginas' }),
  schema: z.object({ titulo: z.string(), sub: z.string().optional(), descricao: z.string().optional() }),
});

export const collections = { textos, ferramentas, institucional, paginas };
