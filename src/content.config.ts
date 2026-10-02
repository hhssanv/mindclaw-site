import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { principioSchema, projetoSchema, servicoSchema, solucaoSchema, stackSchema } from './lib/schema';

const solucoes = defineCollection({
  loader: glob({ pattern: '*.md', base: './content/solucoes' }),
  schema: solucaoSchema,
});

const projetos = defineCollection({
  loader: file('./content/projetos.json'),
  schema: projetoSchema,
});

const principios = defineCollection({
  loader: file('./content/forma-de-trabalhar.json'),
  schema: principioSchema,
});

const servicos = defineCollection({
  loader: file('./content/servicos.json'),
  schema: servicoSchema,
});

const stack = defineCollection({
  loader: file('./content/stack.json'),
  schema: stackSchema,
});

export const collections = { solucoes, projetos, principios, servicos, stack };
